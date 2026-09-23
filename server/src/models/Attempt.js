import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['coding', 'mock-interview', 'quiz'],
      default: 'coding',
    },
    language: {
      type: String,
      default: 'javascript',
    },
    code: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['passed', 'failed', 'error'],
      default: 'passed',
    },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    testCasesTotal: {
      type: Number,
      default: 0,
    },
    aiScore: {
      type: Number,
      min: 0,
      max: 10,
    },
    aiFeedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Attempt = mongoose.model('Attempt', attemptSchema);
