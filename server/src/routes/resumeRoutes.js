import express from 'express';
import { reviewResume, getResumeHistory, getResumeReviewById } from '../controllers/resumeController.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/review', optionalAuth, reviewResume);
router.get('/history', protect, getResumeHistory);
router.get('/:id', optionalAuth, getResumeReviewById);

export default router;
