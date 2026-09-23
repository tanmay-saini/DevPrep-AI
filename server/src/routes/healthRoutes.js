import express from 'express';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

router.get('/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AI Interview Prep Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
  });
});

export default router;
