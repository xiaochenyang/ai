import express from 'express';
import { AppDataSource } from '../config/db';
import { DSL } from '../entities/dsl';
import { DSLProcessor } from '../services/dslProcessor';

const router = express.Router();
// const dslRepository = AppDataSource.getRepository(DSL);

// 获取所有DSL
router.get('/', async (req, res) => {
  try {
    // const dsls = await dslRepository.find();
    // 返回模拟数据
    const dsls = [
      {
        id: 1,
        name: "登录表单",
        description: "用户登录表单示例",
        dsl: {
          page: {
            parentKey: "-",
            childrenKeys: ["username", "password", "submit"],
            style: {},
            componentProps: {}
          }
        },
        naturalLanguage: "这是一个登录表单，包含用户名和密码输入框",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    res.json(dsls);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 创建新的DSL
router.post('/', async (req, res) => {
  try {
    const { name, description, dsl } = req.body;
    const naturalLanguage = await DSLProcessor.generateNaturalLanguage(dsl);

    // 模拟创建新DSL
    const newDSL = {
      id: Math.floor(Math.random() * 1000),
      name,
      description,
      dsl,
      naturalLanguage,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // const newDSL = dslRepository.create({
    //   name,
    //   description,
    //   dsl,
    //   naturalLanguage
    // });

    // await dslRepository.save(newDSL);
    res.status(201).json(newDSL);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 生成训练数据集
router.post('/generate-training-data', async (req, res) => {
  try {
    const trainingData = await DSLProcessor.processExistingDSLs();
    res.json({ success: true, data: trainingData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 导出训练数据集
router.get('/export-training-data', async (req, res) => {
  try {
    const trainingData = await DSLProcessor.exportTrainingData();
    res.json(trainingData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 分析DSL模式
router.get('/analyze-patterns', async (req, res) => {
  try {
    // const dsls = await dslRepository.find();
    // 模拟数据
    const dsls = [
      {
        dsl: {
          page: {
            parentKey: "-",
            childrenKeys: ["username", "password", "submit"],
            style: {},
            componentProps: {}
          }
        }
      }
    ];
    const patterns = DSLProcessor.analyzeCommonPatterns(dsls.map(d => d.dsl));
    res.json(patterns);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 生成DSL的自然语言描述
router.post('/generate-natural-language', async (req, res) => {
  try {
    const { dsl } = req.body;
    const naturalLanguage = await DSLProcessor.generateNaturalLanguage(dsl);
    res.json({ naturalLanguage });
  } catch (error) {
    console.error('Error generating natural language:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 