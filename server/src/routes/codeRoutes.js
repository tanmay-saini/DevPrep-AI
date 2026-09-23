import express from 'express';
import { runCode } from '../controllers/codeController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/run', optionalAuth, runCode);

export default router;
