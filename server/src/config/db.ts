import { DataSource } from 'typeorm';
import { DSL } from '../entities/dsl';

// 原始数据库连接配置（暂时注释掉）
/*
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ai_lowcode',
  synchronize: true, // 开发环境使用，生产环境请设置为false
  logging: true,
  entities: [DSL],
  subscribers: [],
  migrations: [],
});
*/

// 创建一个模拟的数据源对象，暂时不连接真实数据库
export const AppDataSource = {
  initialize: () => Promise.resolve(),
  isInitialized: true,
  getRepository: (entity: any) => {
    // 返回一个模拟的repository对象，包含必要的方法
    return {
      find: (options?: any) => Promise.resolve([]),
      findOne: (options?: any) => Promise.resolve(null),
      save: (entity: any) => Promise.resolve(entity),
      create: (data: any) => data
    };
  }
} as any; // 类型断言为any，避免类型错误 