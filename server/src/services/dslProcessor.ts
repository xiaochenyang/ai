import { AppDataSource } from '../config/db';
import { DSL } from '../entities/dsl';
import OpenAI from 'openai';
import { IsNull, Not } from 'typeorm';

export class DSLProcessor {
  private static dslRepository = AppDataSource.getRepository(DSL);

  private static getOpenAIClient() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://api.deepseek.com/v1'
    });
  }

  // 生成DSL的自然语言描述
  static async generateNaturalLanguage(dsl: Record<string, any>): Promise<string> {
    try {
      console.log('Generating natural language for DSL:', JSON.stringify(dsl, null, 2));
      const openai = this.getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是一个专门用于将低代码平台的DSL描述转换为自然语言的助手。请分析给定的DSL结构，生成一段清晰的自然语言描述，说明这个DSL定义的页面包含哪些组件、它们的布局结构和主要属性。"
          },
          {
            role: "user",
            content: `请将以下DSL结构转换为自然语言描述：${JSON.stringify(dsl, null, 2)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      console.log('API Response:', JSON.stringify(response, null, 2));
      const result = response.choices[0]?.message?.content || '';
      console.log('Generated natural language:', result);
      return result;
    } catch (error) {
      console.error('Error generating natural language:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }

  // 处理所有现有DSL并生成训练数据集
  static async processExistingDSLs(): Promise<Array<{ input: string, output: Record<string, any>; }>> {
    try {
      // 获取所有没有自然语言描述的DSL
      const dsls = await this.dslRepository.find({
        where: {
          naturalLanguage: IsNull()
        }
      });

      const trainingData = [];

      for (const dsl of dsls) {
        // 生成自然语言描述
        const naturalLanguage = await this.generateNaturalLanguage(dsl.dsl);

        // 更新数据库
        dsl.naturalLanguage = naturalLanguage;
        await this.dslRepository.save(dsl);

        // 添加到训练数据集
        trainingData.push({
          input: naturalLanguage,
          output: dsl.dsl
        });
      }

      return trainingData;
    } catch (error) {
      console.error('Error processing DSLs:', error);
      throw error;
    }
  }

  // 导出训练数据集
  static async exportTrainingData(): Promise<Array<{ input: string, output: Record<string, any>; }>> {
    try {
      const dsls = await this.dslRepository.find({
        where: {
          naturalLanguage: Not(IsNull())
        }
      });

      return dsls.map(dsl => ({
        input: dsl.naturalLanguage!,
        output: dsl.dsl
      }));
    } catch (error) {
      console.error('Error exporting training data:', error);
      throw error;
    }
  }

  // 分析DSL结构规律
  static analyzeCommonPatterns(dsls: Array<Record<string, any>>): Record<string, any> {
    const patterns = {
      componentTypes: new Set<string>(),
      commonStructures: new Map<string, number>(),
      propertyPatterns: new Map<string, Set<string>>()
    };

    // 分析DSL结构
    for (const dsl of dsls) {
      this.analyzeDSLStructure(dsl, patterns);
    }

    return {
      componentTypes: Array.from(patterns.componentTypes),
      commonStructures: Object.fromEntries(patterns.commonStructures),
      propertyPatterns: Object.fromEntries(
        Array.from(patterns.propertyPatterns).map(([key, value]) => [key, Array.from(value)])
      )
    };
  }

  private static analyzeDSLStructure(
    dsl: Record<string, any>,
    patterns: {
      componentTypes: Set<string>,
      commonStructures: Map<string, number>,
      propertyPatterns: Map<string, Set<string>>;
    }
  ) {
    // 分析组件类型
    Object.keys(dsl).forEach(key => {
      const component = dsl[key];
      patterns.componentTypes.add(component.type || 'unknown');

      // 分析组件结构
      const structureKey = `${component.type}-${component.childrenKeys.length}`;
      patterns.commonStructures.set(
        structureKey,
        (patterns.commonStructures.get(structureKey) || 0) + 1
      );

      // 分析属性模式
      if (!patterns.propertyPatterns.has(component.type)) {
        patterns.propertyPatterns.set(component.type, new Set());
      }
      Object.keys(component.componentProps || {}).forEach(prop => {
        patterns.propertyPatterns.get(component.type)!.add(prop);
      });
    });
  }
} 