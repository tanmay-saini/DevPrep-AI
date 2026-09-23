import mongoose from 'mongoose';

const turnSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    questionTitle: {
      type: String,
      required: true,
    },
    questionPrompt: {
      type: String,
      required: true,
    },
    userAnswer: {
      type: String,
      required: true,
    },
    aiScore: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    whatWasGood: {
      type: [String],
      default: [],
    },
    whatWasMissing: {
      type: [String],
      default: [],
    },
    modelAnswer: {
      type: String,
      default: '',
    },
    actionableTip: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    track: {
      type: String,
      required: true,
      enum: [
        'DSA',
        'OOPs',
        'DBMS',
        'OS',
        'Computer Networks',
        'System Design',
        'HR/Behavioral',
        'Full Stack General',
      ],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Mixed'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
      index: true,
    },
    turns: [turnSchema],
    overallScore: {
      type: Number,
      default: 0,
    },
    overallFeedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);
