import { ResumeReview } from '../models/ResumeReview.js';
import { User } from '../models/User.js';
import { evaluateResume } from '../services/geminiService.js';

export const reviewResume = async (req, res, next) => {
  try {
    const { resumeText, targetRole = 'Full Stack Web Developer / SDE' } = req.body;

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 40) {
      return res.status(400).json({
        success: false,
        message: 'Please provide substantive resume text (at least 40 characters).',
      });
    }

    // Check daily rate limit if user is authenticated
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        const quotaCheck = await user.checkAndIncrementAiUsage(10);
        if (!quotaCheck.allowed) {
          return res.status(429).json({
            success: false,
            message: `Daily AI quota reached (${quotaCheck.limit} requests/day on free tier). Resets at midnight UTC.`,
            quota: quotaCheck,
          });
        }
      }
    }

    // Call Gemini AI evaluation
    const evaluation = await evaluateResume({
      resumeText: resumeText.trim(),
      targetRole,
    });

    const review = await ResumeReview.create({
      userId: req.user ? req.user._id : undefined,
      targetRole,
      resumeText: resumeText.trim(),
      atsScore: evaluation.atsScore,
      summary: evaluation.summary,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      missingKeywords: evaluation.missingKeywords,
      sectionFeedback: evaluation.sectionFeedback,
      bulletImprovements: evaluation.bulletImprovements,
    });

    // Update user's latest resumeText if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $set: { resumeText: resumeText.trim() },
      });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeHistory = async (req, res, next) => {
  try {
    const reviews = await ResumeReview.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await ResumeReview.findById(id).lean();

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};
