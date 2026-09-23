import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resumeText: {
      type: String,
      default: '',
    },
    // Daily AI usage tracking to strictly adhere to free-tier quotas
    dailyAiUsage: {
      count: {
        type: Number,
        default: 0,
      },
      lastResetDate: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      },
    },
    savedQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to verify password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Method to check and increment daily AI usage (e.g. limit 10 AI sessions per day for free tier)
userSchema.methods.checkAndIncrementAiUsage = async function (dailyLimit = 10) {
  const today = new Date().toISOString().slice(0, 10);
  if (this.dailyAiUsage.lastResetDate !== today) {
    this.dailyAiUsage.count = 0;
    this.dailyAiUsage.lastResetDate = today;
  }

  if (this.dailyAiUsage.count >= dailyLimit) {
    return {
      allowed: false,
      remaining: 0,
      limit: dailyLimit,
    };
  }

  this.dailyAiUsage.count += 1;
  await this.save();

  return {
    allowed: true,
    remaining: dailyLimit - this.dailyAiUsage.count,
    limit: dailyLimit,
  };
};

export const User = mongoose.model('User', userSchema);
