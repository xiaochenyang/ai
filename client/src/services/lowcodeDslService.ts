import axios from 'axios';
import { API_BASE_URL } from '../config';

/**
 * 聊天消息类型
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * 低代码DSL服务 - 客户端
 */
export class LowcodeDslService {
  /**
   * 创建新的对话会话
   * @param systemMessage 可选的系统消息
   * @returns 会话ID
   */
  static async createConversation(systemMessage?: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/lowcode-dsl/conversation`, {
        systemMessage
      });
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  /**
   * 获取会话的所有消息
   * @param sessionId 会话ID
   * @returns 会话中的所有消息
   */
  static async getConversationMessages(sessionId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/lowcode-dsl/conversation/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting conversation messages:', error);
      throw error;
    }
  }

  /**
   * 删除会话
   * @param sessionId 会话ID
   * @returns 操作结果
   */
  static async deleteConversation(sessionId: string) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/lowcode-dsl/conversation/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  }

  /**
   * 获取示例DSL
   * @returns 示例DSL对象
   */
  static async getExampleDsl() {
    try {
      const response = await axios.get(`${API_BASE_URL}/lowcode-dsl/example`);
      return response.data;
    } catch (error) {
      console.error('Error getting example DSL:', error);
      throw error;
    }
  }

  /**
   * 将自然语言描述转换为低代码DSL（支持多轮对话）
   * @param description 自然语言描述
   * @param sessionId 可选的会话ID
   * @param onMessage 流式消息回调函数
   * @returns 转换结果，包含DSL对象和会话ID
   */
  static async generateDslFromDescriptionWithContext(
    description: string, 
    sessionId?: string,
    onMessage?: (event: string, data: any) => void
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/lowcode-dsl/generate-dsl-with-context`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            const event = line.slice(7);
            const dataLine = lines[lines.indexOf(line) + 1];
            if (dataLine?.startsWith('data: ')) {
              const data = JSON.parse(dataLine.slice(6));
              onMessage?.(event, data);
            }
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Error generating DSL from description with context:', error);
      throw error;
    }
  }

  /**
   * 修改生成的DSL结果
   * @param sessionId 会话ID
   * @param feedback 用户反馈
   * @returns 修改后的DSL对象
   */
  static async reviseDsl(sessionId: string, feedback: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/lowcode-dsl/revise-dsl`, {
        sessionId,
        feedback
      });
      return response.data;
    } catch (error) {
      console.error('Error revising DSL:', error);
      throw error;
    }
  }

  /**
   * 将低代码DSL转换为自然语言描述（支持多轮对话）
   * @param dsl 低代码DSL对象
   * @param sessionId 可选的会话ID
   * @returns 转换结果，包含自然语言描述和会话ID
   */
  static async generateDescriptionFromDslWithContext(dsl: any, sessionId?: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/lowcode-dsl/generate-description-with-context`, {
        dsl,
        sessionId
      });
      return response.data;
    } catch (error) {
      console.error('Error generating description from DSL with context:', error);
      throw error;
    }
  }

  /**
   * 修改生成的自然语言描述
   * @param sessionId 会话ID
   * @param feedback 用户反馈
   * @returns 修改后的自然语言描述
   */
  static async reviseDescription(sessionId: string, feedback: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/lowcode-dsl/revise-description`, {
        sessionId,
        feedback
      });
      return response.data;
    } catch (error) {
      console.error('Error revising description:', error);
      throw error;
    }
  }

  /**
   * 将自然语言描述转换为低代码DSL (保留原方法以兼容现有代码)
   * @param description 自然语言描述
   * @returns 低代码DSL对象
   */
  static async generateDslFromDescription(description: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/lowcode-dsl/generate-dsl`, {
        description
      });
      return response.data;
    } catch (error) {
      console.error('Error generating DSL from description:', error);
      throw error;
    }
  }

  /**
   * 将低代码DSL转换为自然语言描述 (保留原方法以兼容现有代码)
   * @param dsl 低代码DSL对象
   * @returns 自然语言描述
   */
  static async generateDescriptionFromDsl(dsl: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/lowcode-dsl/generate-description`, {
        dsl
      });
      return response.data;
    } catch (error) {
      console.error('Error generating description from DSL:', error);
      throw error;
    }
  }
} 