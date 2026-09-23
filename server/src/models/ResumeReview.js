import mongoose from 'mongoose';

const bulletImprovementSchema = new mongoose.Schema(
  {
    original: { type: String, required: true },
    improved: { type: String, required: true },
    reason: { type: String, default: '' },
  },
  { _id: false }
);

const resumeReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    targetRole: {
      type: String,
      default: 'Full Stack Web Developer / SDE',
    },
    resumeText: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    summary: {
      type: String,
      default: '',
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    sectionFeedback: {
      contact: { score: Number, feedback: String },
      skills: { score: Number, feedback: String },
      experience: { score: Number, feedback: String },
      projects: { score: Number, feedback: String },
      education: { score: Number, feedback: String },
    },
    bulletImprovements: [bulletImprovementSchema],
  },
  {
    timestamps: true,
  }
);

export const ResumeReview = mongoose.model('ResumeReview', resumeReviewSchema);
