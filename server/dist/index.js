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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const db_1 = require("./config/db");
const dsl_1 = __importDefault(require("./routes/dsl"));
// 加载环境变量
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// 连接数据库
(0, db_1.connectDB)();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
