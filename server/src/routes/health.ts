import express from 'express';

const router = express.Router();

/**
 * 健康检查路由
 * GET /api/health
 */
router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default router; 