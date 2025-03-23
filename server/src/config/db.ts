import { DataSource } from 'typeorm';
import { DSL } from '../entities/dsl';

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