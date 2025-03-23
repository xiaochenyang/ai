import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { AppDataSource } from './config/db';
import dslRoutes from './routes/dsl';

// 加载环境变量
config();

// 调试输出
console.log('Environment variables:', {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST
});

const app = express();
const port = process.env.PORT || 3001;

// 初始化数据库连接
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// 路由
app.use('/api/dsl', dslRoutes);

// 健康检查
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// DSL生成接口
app.post('/api/generate-dsl', async (req: Request, res: Response) => {
  try {
    const { naturalLanguage } = req.body;
    // TODO: 实现DSL生成逻辑
    res.json({
      success: true,
      data: {
        // 示例DSL结构
        page: {
          parentKey: "-",
          childrenKeys: [],
          style: {},
          componentProps: {}
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 