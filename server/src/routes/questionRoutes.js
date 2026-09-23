import express from 'express';
import {
  getQuestions,
  getQuestionById,
  getQuestionCategories,
  getCompanyTags,
  toggleBookmark,
} from '../controllers/questionController.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/categories', getQuestionCategories);
router.get('/companies', getCompanyTags);
router.get('/', optionalAuth, getQuestions);
router.get('/:id', optionalAuth, getQuestionById);
router.post('/:id/bookmark', protect, toggleBookmark);

export default router;
