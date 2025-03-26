"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dsl_1 = require("../entities/dsl");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ai_lowcode',
    synchronize: true, // 开发环境使用，生产环境请设置为false
    logging: true,
    entities: [dsl_1.DSL],
    subscribers: [],
    migrations: [],
});
