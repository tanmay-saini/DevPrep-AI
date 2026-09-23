import express from 'express';
import {
  startInterviewSession,
  submitInterviewAnswer,
  finishInterviewSession,
  getInterviewHistory,
  getInterviewSessionById,
} from '../controllers/interviewController.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/start', optionalAuth, startInterviewSession);
router.post('/answer', optionalAuth, submitInterviewAnswer);
router.post('/:id/finish', optionalAuth, finishInterviewSession);
router.get('/history', protect, getInterviewHistory);
router.get('/:id', optionalAuth, getInterviewSessionById);

export default router;
