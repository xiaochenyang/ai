import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { AppDataSource } from './config/db';
import dslRoutes from './routes/dsl';
import { DSLProcessor } from './services/dslProcessor';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import healthRoutes from './routes/health';
import lowcodeDslRoutes from './lowcodeDsl/routes/lowcodeDsl';

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
    console.log('Data Source has been initialized! (模拟模式)');
  })
  .catch((error: Error) => {
    // 不要崩溃，只记录错误
    console.error('Error during Data Source initialization (忽略此错误):', error);
    // process.exit(1); // 注释掉退出程序的代码
  });

app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/dsl', dslRoutes);
app.use('/api/user', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/lowcode-dsl', lowcodeDslRoutes);

// DSL生成接口
app.post('/api/generate-dsl', async (req: Request, res: Response) => {
  try {
    const { naturalLanguage } = req.body;

    if (!naturalLanguage) {
      return res.status(400).json({
        success: false,
        error: '自然语言描述不能为空'
      });
    }

    console.log('Generating DSL from natural language:', naturalLanguage);

    // 调用OpenAI API生成DSL
    const openai = DSLProcessor.getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "你是一个专门用于将自然语言描述转换为低代码平台DSL的助手。请根据用户输入的自然语言描述，生成符合给定结构的DSL JSON。DSL的格式应该是一个对象，每个键是组件的ID，对应的值包含parentKey、childrenKeys、style和componentProps等属性。"
        },
        {
          role: "user",
          content: `请将以下自然语言描述转换为DSL结构：${naturalLanguage}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const result = response.choices[0]?.message?.content || '';
    console.log('Generated DSL string:', result);

    // 解析JSON字符串为对象
    let dslObject;
    try {
      // 尝试从结果中提取JSON部分
      const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/) ||
        result.match(/```\s*([\s\S]*?)\s*```/) ||
        [null, result];
      const jsonString = jsonMatch[1];
      dslObject = JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing DSL JSON:', error);
      return res.status(500).json({
        success: false,
        error: '生成的DSL格式不正确'
      });
    }

    res.json({
      success: true,
      data: dslObject
    });
  } catch (error) {
    console.error('Error generating DSL:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// 自然语言描述生成接口
app.post('/api/generate-description', async (req: Request, res: Response) => {
  try {
    const { dsl } = req.body;

    if (!dsl) {
      return res.status(400).json({
        success: false,
        error: 'DSL不能为空'
      });
    }

    console.log('Generating description from DSL');
    const description = await DSLProcessor.generateNaturalLanguage(dsl);

    res.json({
      success: true,
      data: {
        description
      }
    });
  } catch (error) {
    console.error('Error generating description:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 