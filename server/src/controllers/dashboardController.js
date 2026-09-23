import mongoose from 'mongoose';
import { InterviewSession } from '../models/InterviewSession.js';
import { Attempt } from '../models/Attempt.js';
import { Question } from '../models/Question.js';
import { ResumeReview } from '../models/ResumeReview.js';
import { User } from '../models/User.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;

    const allCategories = [
      'DSA',
      'System Design',
      'DBMS',
      'OOPs',
      'OS',
      'Computer Networks',
      'HR/Behavioral',
    ];

    let userSessions = [];
    let userAttempts = [];
    let resumeReviews = [];
    let savedQuestionsCount = 0;
    let dailyQuota = { used: 0, limit: 10, remaining: 10 };

    if (userId) {
      const [sessions, attempts, reviews, userDoc] = await Promise.all([
        InterviewSession.find({ userId }).sort({ createdAt: -1 }).limit(20).lean(),
        Attempt.find({ userId }).sort({ createdAt: -1 }).limit(50).populate('questionId', 'title category difficulty').lean(),
        ResumeReview.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
        User.findById(userId).select('savedQuestions dailyAiUsage').lean(),
      ]);

      userSessions = sessions;
      userAttempts = attempts;
      resumeReviews = reviews;
      savedQuestionsCount = userDoc?.savedQuestions?.length || 0;

      const today = new Date().toISOString().slice(0, 10);
      const used = userDoc?.dailyAiUsage?.lastResetDate === today ? userDoc.dailyAiUsage.count : 0;
      dailyQuota = {
        used,
        limit: 10,
        remaining: Math.max(0, 10 - used),
      };
    }

    const totalQuestionsInDB = await Question.countDocuments();

    // Calculate category performance from real user sessions only
    const categoryStats = {};
    allCategories.forEach((cat) => {
      categoryStats[cat] = { totalAttempts: 0, totalScore: 0, scoresCount: 0 };
    });

    userSessions.forEach((s) => {
      s.turns.forEach((t) => {
        const cat = s.track === 'Full Stack General' ? 'DSA' : s.track;
        if (categoryStats[cat]) {
          categoryStats[cat].totalScore += t.aiScore;
          categoryStats[cat].scoresCount += 1;
        }
      });
    });

    const competenceData = allCategories.map((cat) => {
      const stat = categoryStats[cat];
      const avg = stat.scoresCount > 0
        ? parseFloat((stat.totalScore / stat.scoresCount).toFixed(1))
        : 0; // 0 for unattempted tracks
      return {
        subject: cat,
        score: avg,
        fullMark: 10,
        attemptsCount: stat.scoresCount,
      };
    });

    // Compute overall mock interview average from real turns
    const totalInterviewTurns = userSessions.reduce((acc, s) => acc + s.turns.length, 0);
    const totalInterviewScoreSum = userSessions.reduce(
      (acc, s) => acc + s.turns.reduce((tAcc, t) => tAcc + t.aiScore, 0),
      0
    );
    const averageAiScore = totalInterviewTurns > 0
      ? parseFloat((totalInterviewScoreSum / totalInterviewTurns).toFixed(1))
      : 0;

    // Real coding stats
    const codeAttempts = userAttempts.filter((a) => a.type === 'coding');
    const codePassedCount = codeAttempts.filter((a) => a.status === 'passed').length;
    const codingPassRate = codeAttempts.length > 0
      ? Math.round((codePassedCount / codeAttempts.length) * 100)
      : 0;

    // Distinct questions attempted
    const uniqueAttemptedQuestionIds = new Set([
      ...userAttempts.map((a) => a.questionId?._id?.toString() || a.questionId?.toString()).filter(Boolean),
      ...userSessions.flatMap((s) => s.turns.map((t) => t.questionId?.toString()).filter(Boolean)),
    ]);
    const questionsAttemptedCount = uniqueAttemptedQuestionIds.size;

    // Detect weak areas based on actual attempts (< 7.0 score)
    const attemptedCategories = competenceData.filter((c) => c.attemptsCount > 0);
    let weakAreas = [];

    if (attemptedCategories.length > 0) {
      weakAreas = attemptedCategories
        .filter((c) => c.score < 7.5)
        .map((c) => ({
          track: c.subject,
          score: c.score,
          recommendation: `Your average score is ${c.score}/10. Practice 3 more questions in ${c.subject} to boost placement readiness.`,
        }));
    }

    // Recent activity feed from real user data
    const activityFeed = [];

    userSessions.forEach((s) => {
      activityFeed.push({
        id: s._id,
        type: 'interview',
        title: `Mock Interview: ${s.track}`,
        subtitle: `${s.turns.length} questions completed • Score: ${s.overallScore}/10`,
        score: s.overallScore,
        createdAt: s.createdAt,
      });
    });

    userAttempts.forEach((a) => {
      activityFeed.push({
        id: a._id,
        type: 'code',
        title: `Code Practice: ${a.questionId?.title || 'DSA Challenge'}`,
        subtitle: `${(a.language || 'JS').toUpperCase()} • ${a.status === 'passed' ? 'All Test Cases Passed' : 'Test Cases Failed'}`,
        status: a.status,
        createdAt: a.createdAt,
      });
    });

    resumeReviews.forEach((r) => {
      activityFeed.push({
        id: r._id,
        type: 'resume',
        title: `ATS Resume Audit (${r.targetRole})`,
        subtitle: `ATS Score: ${r.atsScore}/100`,
        score: r.atsScore,
        createdAt: r.createdAt,
      });
    });

    activityFeed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      stats: {
        totalQuestionsInDB,
        questionsAttempted: questionsAttemptedCount,
        mockSessionsCompleted: userSessions.length,
        averageAiScore,
        codingPassRate,
        savedQuestionsCount,
        dailyQuota,
        competenceData,
        hasActivity: userSessions.length > 0 || userAttempts.length > 0 || resumeReviews.length > 0,
        weakAreas,
        recentActivity: activityFeed.slice(0, 8),
      },
    });
  } catch (error) {
    next(error);
  }
};
