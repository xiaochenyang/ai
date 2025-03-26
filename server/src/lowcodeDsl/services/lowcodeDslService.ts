import { lowcodeDsl } from '../converter/dsl';
import { DslConverter } from '../converter/dslConverter';
import { LowCodeSchema } from '../types/schema';
import { ChatMessage } from './sessionManager';

/**
 * 低代码DSL服务 - 处理自然语言与低代码DSL之间的转换
 */
export class LowcodeDslService {
  private dslConverter: DslConverter;

  constructor() {
    this.dslConverter = new DslConverter();
  }

  /**
   * 创建新的对话会话
   * @param systemMessage 可选的自定义系统消息
   * @returns 会话ID
   */
  public createConversation(systemMessage?: string): string {
    return this.dslConverter.createConversation(systemMessage);
  }

  /**
   * 获取会话的所有消息
   * @param sessionId 会话ID
   * @returns 会话中的所有消息
   */
  public getConversationMessages(sessionId: string): ChatMessage[] | undefined {
    return this.dslConverter.getConversationMessages(sessionId);
  }

  /**
   * 删除会话
   * @param sessionId 会话ID
   * @returns 是否删除成功
   */
  public deleteConversation(sessionId: string): boolean {
    return this.dslConverter.deleteConversation(sessionId);
  }

  /**
   * 将自然语言描述转换为低代码DSL（支持多轮对话）
   * @param naturalLanguage 自然语言描述
   * @param sessionId 可选的会话ID
   * @returns 低代码DSL对象和会话ID
   */
  public async generateDslFromDescriptionWithContext(
    naturalLanguage: string,
    sessionId?: string
  ): Promise<{ dsl: LowCodeSchema; sessionId: string }> {
    try {
      return await this.dslConverter.convertNaturalLanguageToDslWithContext(sessionId || null, naturalLanguage);
    } catch (error) {
      console.error('Error generating DSL from description:', error);
      throw new Error('Failed to generate DSL from description');
    }
  }

  /**
   * 修改生成的DSL结果
   * @param sessionId 会话ID
   * @param userFeedback 用户反馈
   * @returns 修改后的DSL对象
   */
  public async reviseDsl(
    sessionId: string,
    userFeedback: string
  ): Promise<LowCodeSchema> {
    try {
      return await this.dslConverter.reviseDsl(sessionId, userFeedback);
    } catch (error) {
      console.error('Error revising DSL:', error);
      throw new Error('Failed to revise DSL');
    }
  }

  /**
   * 将低代码DSL转换为自然语言描述（支持多轮对话）
   * @param dsl 低代码DSL对象
   * @param sessionId 可选的会话ID
   * @returns 自然语言描述和会话ID
   */
  public async generateDescriptionFromDslWithContext(
    dsl: LowCodeSchema,
    sessionId?: string
  ): Promise<{ description: string; sessionId: string }> {
    try {
      return await this.dslConverter.convertDslToNaturalLanguageWithContext(sessionId || null, dsl);
    } catch (error) {
      console.error('Error generating description from DSL:', error);
      throw new Error('Failed to generate description from DSL');
    }
  }

  /**
   * 修改生成的自然语言描述
   * @param sessionId 会话ID
   * @param userFeedback 用户反馈
   * @returns 修改后的自然语言描述
   */
  public async reviseDescription(
    sessionId: string,
    userFeedback: string
  ): Promise<string> {
    try {
      return await this.dslConverter.reviseDescription(sessionId, userFeedback);
    } catch (error) {
      console.error('Error revising description:', error);
      throw new Error('Failed to revise description');
    }
  }

  /**
   * 将自然语言描述转换为低代码DSL (保留原方法以兼容现有代码)
   * @param naturalLanguage 自然语言描述
   * @returns 低代码DSL对象
   */
  public async generateDslFromDescription(naturalLanguage: string): Promise<LowCodeSchema> {
    try {
      return await this.dslConverter.convertNaturalLanguageToDsl(naturalLanguage);
    } catch (error) {
      console.error('Error generating DSL from description:', error);
      throw new Error('Failed to generate DSL from description');
    }
  }

  /**
   * 将低代码DSL转换为自然语言描述 (保留原方法以兼容现有代码)
   * @param dsl 低代码DSL对象
   * @returns 自然语言描述
   */
  public async generateDescriptionFromDsl(dsl: LowCodeSchema): Promise<string> {
    try {
      return await this.dslConverter.convertDslToNaturalLanguage(dsl);
    } catch (error) {
      console.error('Error generating description from DSL:', error);
      throw new Error('Failed to generate description from DSL');
    }
  }

  /**
   * 获取示例DSL结构
   * 用于测试或展示目的
   * @returns 示例DSL对象
   */
  public getExampleDsl(): LowCodeSchema {
    return lowcodeDsl as LowCodeSchema;
  }
} 