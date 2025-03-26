import express from 'express';

const router = express.Router();

/**
 * 用户登录
 * POST /api/auth/login
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 实际项目中，这里需要验证用户身份并生成JWT
  // 目前仅返回模拟数据
  if (username && password) {
    res.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          username,
          role: 'user'
        }
      }
    });
  } else {
    res.status(400).json({
      success: false,
      error: '用户名和密码不能为空'
    });
  }
});

/**
 * 用户注册
 * POST /api/auth/register
 */
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // 实际项目中，这里需要创建用户并存储到数据库
  // 目前仅返回模拟数据
  if (username && password && email) {
    res.json({
      success: true,
      data: {
        message: '注册成功',
        user: {
          id: Math.floor(Math.random() * 1000).toString(),
          username,
          email
        }
      }
    });
  } else {
    res.status(400).json({
      success: false,
      error: '用户名、密码和邮箱不能为空'
    });
  }
});

export default router; 