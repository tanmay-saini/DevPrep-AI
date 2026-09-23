import { InterviewSession } from '../models/InterviewSession.js';
import { Question } from '../models/Question.js';
import { User } from '../models/User.js';
import { evaluateInterviewAnswer, generateInterviewDebrief } from '../services/geminiService.js';

export const startInterviewSession = async (req, res, next) => {
  try {
    const { track = 'DSA', difficulty = 'Medium', questionId, questionCount = 3 } = req.body;

    // Check daily rate limit if user is authenticated
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        const quotaCheck = await user.checkAndIncrementAiUsage(10);
        if (!quotaCheck.allowed) {
          return res.status(429).json({
            success: false,
            message: `Daily AI Mock Interview limit reached (${quotaCheck.limit} sessions/day on free tier). Quota resets at midnight UTC.`,
            quota: quotaCheck,
          });
        }
      }
    }

    let questions = [];

    if (questionId) {
      const specificQ = await Question.findById(questionId);
      if (specificQ) {
        questions = [specificQ];
      }
    }

    if (questions.length === 0) {
      const filter = {};
      if (track !== 'Full Stack General') {
        filter.category = track;
      }
      if (difficulty !== 'Mixed') {
        filter.difficulty = difficulty;
      }

      questions = await Question.aggregate([
        { $match: filter },
        { $sample: { size: Math.min(10, parseInt(questionCount, 10) || 3) } },
      ]);

      // If sample returned empty (e.g. strict filter), fallback to any question in track
      if (questions.length === 0) {
        questions = await Question.aggregate([
          { $match: track !== 'Full Stack General' ? { category: track } : {} },
          { $sample: { size: 3 } },
        ]);
      }
    }

    const session = await InterviewSession.create({
      userId: req.user ? req.user._id : undefined,
      track,
      difficulty,
      status: 'in-progress',
      turns: [],
    });

    res.status(201).json({
      success: true,
      sessionId: session._id,
      track,
      difficulty,
      totalQuestions: questions.length,
      questions: questions.map((q) => ({
        id: q._id,
        title: q.title,
        category: q.category,
        difficulty: q.difficulty,
        tags: q.tags,
        companyTags: q.companyTags,
        hints: q.hints,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const submitInterviewAnswer = async (req, res, next) => {
  try {
    const { sessionId, questionId, questionTitle, questionPrompt, userAnswer, track = 'DSA', difficulty = 'Medium' } = req.body;

    if (!userAnswer || userAnswer.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a substantive answer (at least 5 characters).',
      });
    }

    let sampleAnswer = '';
    let resolvedTitle = questionTitle;
    let resolvedPrompt = questionPrompt;

    if (questionId) {
      const q = await Question.findById(questionId);
      if (q) {
        sampleAnswer = q.sampleAnswer || '';
        if (!resolvedTitle) resolvedTitle = q.title;
        if (!resolvedPrompt) resolvedPrompt = q.title;
      }
    }

    resolvedTitle = resolvedTitle || 'Technical Interview Question';
    resolvedPrompt = resolvedPrompt || resolvedTitle;

    // Call Gemini Evaluation
    const evaluation = await evaluateInterviewAnswer({
      questionTitle: resolvedTitle,
      questionPrompt: resolvedPrompt,
      sampleAnswer,
      userAnswer: userAnswer.trim(),
      track,
      difficulty,
    });

    let session = null;
    if (sessionId) {
      session = await InterviewSession.findById(sessionId);
      if (session) {
        session.turns.push({
          questionId: questionId || undefined,
          questionTitle: resolvedTitle,
          questionPrompt: resolvedPrompt,
          userAnswer: userAnswer.trim(),
          aiScore: evaluation.score,
          whatWasGood: evaluation.whatWasGood,
          whatWasMissing: evaluation.whatWasMissing,
          modelAnswer: evaluation.modelAnswer,
          actionableTip: evaluation.actionableTip,
          timestamp: new Date(),
        });

        // Compute running average score
        const totalScore = session.turns.reduce((acc, t) => acc + t.aiScore, 0);
        session.overallScore = parseFloat((totalScore / session.turns.length).toFixed(1));
        await session.save();
      }
    }

    res.status(200).json({
      success: true,
      evaluation,
      session: session
        ? {
            id: session._id,
            turnsCount: session.turns.length,
            overallScore: session.overallScore,
          }
        : null,
    });
  } catch (error) {
    next(error);
  }
};

export const finishInterviewSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = await InterviewSession.findById(id);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    if (session.turns.length > 0) {
      const debrief = await generateInterviewDebrief({
        track: session.track,
        turns: session.turns,
      });
      session.overallFeedback = debrief.summaryText || 'Session completed successfully.';
      session.status = 'completed';
      await session.save();
    } else {
      session.status = 'completed';
      await session.save();
    }

    res.status(200).json({
      success: true,
      message: 'Interview session finished successfully.',
      session,
    });
  } catch (error) {
    next(error);
  }
};

export const getInterviewHistory = async (req, res, next) => {
  try {
    const sessions = await InterviewSession.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    next(error);
  }
};

export const getInterviewSessionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = await InterviewSession.findById(id).populate('turns.questionId').lean();

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    next(error);
  }
};
