"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const db_1 = require("./config/db");
const dsl_1 = __importDefault(require("./routes/dsl"));
const dslProcessor_1 = require("./services/dslProcessor");
// 加载环境变量
(0, dotenv_1.config)();
// 调试输出
console.log('Environment variables:', {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// 初始化数据库连接
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 路由
app.use('/api/dsl', dsl_1.default);
// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
// DSL生成接口
app.post('/api/generate-dsl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
        const openai = dslProcessor_1.DSLProcessor.getOpenAIClient();
        const response = yield openai.chat.completions.create({
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
        const result = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '';
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
        }
        catch (error) {
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
    }
    catch (error) {
        console.error('Error generating DSL:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}));
// 自然语言描述生成接口
app.post('/api/generate-description', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dsl } = req.body;
        if (!dsl) {
            return res.status(400).json({
                success: false,
                error: 'DSL不能为空'
            });
        }
        console.log('Generating description from DSL');
        const description = yield dslProcessor_1.DSLProcessor.generateNaturalLanguage(dsl);
        res.json({
            success: true,
            data: {
                description
            }
        });
    }
    catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
