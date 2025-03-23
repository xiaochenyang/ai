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
exports.DSLProcessor = void 0;
const dsl_1 = require("../models/dsl");
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY
});
class DSLProcessor {
    // 生成DSL的自然语言描述
    static generateNaturalLanguage(dsl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield openai.chat.completions.create({
                    model: "gpt-4",
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
                });
                return response.choices[0].message.content || '';
            }
            catch (error) {
                console.error('Error generating natural language:', error);
                throw error;
            }
        });
    }
    // 处理所有现有DSL并生成训练数据集
    static processExistingDSLs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 获取所有没有自然语言描述的DSL
                const dsls = yield dsl_1.DSL.find({ naturalLanguage: { $exists: false } });
                const trainingData = [];
                for (const dsl of dsls) {
                    // 生成自然语言描述
                    const naturalLanguage = yield this.generateNaturalLanguage(dsl.dsl);
                    // 更新数据库
                    dsl.naturalLanguage = naturalLanguage;
                    yield dsl.save();
                    // 添加到训练数据集
                    trainingData.push({
                        input: naturalLanguage,
                        output: dsl.dsl
                    });
                }
                return trainingData;
            }
            catch (error) {
                console.error('Error processing DSLs:', error);
                throw error;
            }
        });
    }
    // 导出训练数据集
    static exportTrainingData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dsls = yield dsl_1.DSL.find({ naturalLanguage: { $exists: true } });
                return dsls.map(dsl => ({
                    input: dsl.naturalLanguage,
                    output: dsl.dsl
                }));
            }
            catch (error) {
                console.error('Error exporting training data:', error);
                throw error;
            }
        });
    }
    // 分析DSL结构规律
    static analyzeCommonPatterns(dsls) {
        const patterns = {
            componentTypes: new Set(),
            commonStructures: new Map(),
            propertyPatterns: new Map()
        };
        // 分析DSL结构
        for (const dsl of dsls) {
            this.analyzeDSLStructure(dsl, patterns);
        }
        return {
            componentTypes: Array.from(patterns.componentTypes),
            commonStructures: Object.fromEntries(patterns.commonStructures),
            propertyPatterns: Object.fromEntries(Array.from(patterns.propertyPatterns).map(([key, value]) => [key, Array.from(value)]))
        };
    }
    static analyzeDSLStructure(dsl, patterns) {
        // 分析组件类型
        Object.keys(dsl).forEach(key => {
            const component = dsl[key];
            patterns.componentTypes.add(component.type || 'unknown');
            // 分析组件结构
            const structureKey = `${component.type}-${component.childrenKeys.length}`;
            patterns.commonStructures.set(structureKey, (patterns.commonStructures.get(structureKey) || 0) + 1);
            // 分析属性模式
            if (!patterns.propertyPatterns.has(component.type)) {
                patterns.propertyPatterns.set(component.type, new Set());
            }
            Object.keys(component.componentProps || {}).forEach(prop => {
                patterns.propertyPatterns.get(component.type).add(prop);
            });
        });
    }
}
exports.DSLProcessor = DSLProcessor;
