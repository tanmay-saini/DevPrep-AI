import { Question } from '../models/Question.js';
import { User } from '../models/User.js';

export const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty, company, tag, search, isCodingProblem, page = 1, limit = 50 } = req.query;

    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }

    if (company && company !== 'All') {
      filter.companyTags = { $in: [new RegExp(`^${company}$`, 'i')] };
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    if (typeof isCodingProblem !== 'undefined') {
      filter.isCodingProblem = isCodingProblem === 'true';
    }

    if (search && search.trim().length > 0) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { tags: searchRegex },
        { companyTags: searchRegex },
        { sampleAnswer: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const [questions, total] = await Promise.all([
      Question.find(filter)
        .sort({ difficulty: 1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Question.countDocuments(filter),
    ]);

    // If user is authenticated, check if questions are bookmarked
    let userSavedSet = new Set();
    if (req.user) {
      const user = await User.findById(req.user._id).select('savedQuestions');
      if (user?.savedQuestions) {
        userSavedSet = new Set(user.savedQuestions.map((id) => id.toString()));
      }
    }

    const formattedQuestions = questions.map((q) => ({
      ...q,
      isSaved: userSavedSet.has(q._id.toString()),
    }));

    res.status(200).json({
      success: true,
      count: formattedQuestions.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      questions: formattedQuestions,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found.',
      });
    }

    let isSaved = false;
    if (req.user) {
      const user = await User.findById(req.user._id).select('savedQuestions');
      isSaved = user?.savedQuestions?.some((qid) => qid.toString() === id.toString()) || false;
    }

    res.status(200).json({
      success: true,
      question: {
        ...question,
        isSaved,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionCategories = async (req, res, next) => {
  try {
    const categories = await Question.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id',
          count: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    const total = await Question.countDocuments();

    res.status(200).json({
      success: true,
      categories: [{ name: 'All', count: total }, ...categories],
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyTags = async (req, res, next) => {
  try {
    const companies = await Question.aggregate([
      { $unwind: '$companyTags' },
      {
        $group: {
          _id: '$companyTags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id',
          count: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const index = user.savedQuestions.findIndex((qid) => qid.toString() === id);
    let isSaved = false;

    if (index > -1) {
      user.savedQuestions.splice(index, 1);
      isSaved = false;
    } else {
      user.savedQuestions.push(id);
      isSaved = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      isSaved,
      message: isSaved ? 'Question added to bookmarks' : 'Question removed from bookmarks',
    });
  } catch (error) {
    next(error);
  }
};
