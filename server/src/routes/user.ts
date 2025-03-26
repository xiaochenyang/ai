import express from 'express';

const router = express.Router();

/**
 * 获取用户信息
 * GET /api/user/profile
 */
router.get('/profile', (req, res) => {
  // 实际项目中，这里需要验证用户身份并从数据库获取用户信息
  // 目前仅返回模拟数据
  res.json({
    success: true,
    data: {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      role: 'user'
    }
  });
});

export default router; 