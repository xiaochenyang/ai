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
const db_1 = require("../config/db");
const dsl_1 = require("../entities/dsl");
const dslProcessor_1 = require("../services/dslProcessor");
const router = express_1.default.Router();
const dslRepository = db_1.AppDataSource.getRepository(dsl_1.DSL);
// 获取所有DSL
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dsls = yield dslRepository.find();
        res.json(dsls);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// 创建新的DSL
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, dsl } = req.body;
        const naturalLanguage = yield dslProcessor_1.DSLProcessor.generateNaturalLanguage(dsl);
        const newDSL = dslRepository.create({
            name,
            description,
            dsl,
            naturalLanguage
        });
        yield dslRepository.save(newDSL);
        res.status(201).json(newDSL);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// 生成训练数据集
router.post('/generate-training-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingData = yield dslProcessor_1.DSLProcessor.processExistingDSLs();
        res.json({ success: true, data: trainingData });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// 导出训练数据集
router.get('/export-training-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingData = yield dslProcessor_1.DSLProcessor.exportTrainingData();
        res.json(trainingData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// 分析DSL模式
router.get('/analyze-patterns', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dsls = yield dslRepository.find();
        const patterns = dslProcessor_1.DSLProcessor.analyzeCommonPatterns(dsls.map(d => d.dsl));
        res.json(patterns);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// 生成DSL的自然语言描述
router.post('/generate-natural-language', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dsl } = req.body;
        const naturalLanguage = yield dslProcessor_1.DSLProcessor.generateNaturalLanguage(dsl);
        res.json({ naturalLanguage });
    }
    catch (error) {
        console.error('Error generating natural language:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
