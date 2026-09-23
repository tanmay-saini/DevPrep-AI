import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question title is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'DSA',
        'OOPs',
        'DBMS',
        'OS',
        'Computer Networks',
        'System Design',
        'HR/Behavioral',
      ],
      index: true,
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    companyTags: {
      type: [String],
      default: [],
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    sampleAnswer: {
      type: String,
      required: [true, 'Sample answer or solution explanation is required'],
    },
    hints: {
      type: [String],
      default: [],
    },
    isCodingProblem: {
      type: Boolean,
      default: false,
    },
    // Starter code templates by language for coding practice
    starterCode: {
      javascript: { type: String, default: '' },
      python: { type: String, default: '' },
      cpp: { type: String, default: '' },
      java: { type: String, default: '' },
    },
    testCases: {
      type: [testCaseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Full-text search index on title, tags, and sampleAnswer
questionSchema.index({ title: 'text', sampleAnswer: 'text', tags: 'text' });

export const Question = mongoose.model('Question', questionSchema);
