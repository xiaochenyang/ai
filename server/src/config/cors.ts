import cors from 'cors';

// CORS 配置选项
export const corsOptions = {
  origin: '*', // 允许所有来源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // 允许的 HTTP 方法
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'], // 允许的请求头
  exposedHeaders: ['Content-Range', 'X-Content-Range'], // 允许浏览器访问的响应头
  credentials: true, // 允许发送认证信息（cookies）
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // 预检请求结果的缓存时间，单位为秒
};

// 导出配置好的 CORS 中间件
export const corsMiddleware = cors(corsOptions);

// 导出预检请求处理中间件
export const corsPreflightMiddleware = (req: any, res: any, next: any) => {
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.sendStatus(204);
  } else {
    next();
  }
}; 