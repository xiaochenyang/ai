import { v4 as uuidv4 } from 'uuid';

/**
 * 对话消息接口
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * 会话接口
 */
export interface Session {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 会话管理器 - 管理多轮对话的历史记录
 */
export class SessionManager {
  private sessions: Map<string, Session> = new Map();

  /**
   * 创建新会话
   * @param systemMessage 系统消息
   * @returns 会话ID
   */
  public createSession(systemMessage: string): string {
    const sessionId = uuidv4();
    const session: Session = {
      id: sessionId,
      messages: [
        { role: 'system', content: systemMessage }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  /**
   * 获取会话
   * @param sessionId 会话ID
   * @returns 会话对象
   */
  public getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * 添加用户消息
   * @param sessionId 会话ID
   * @param message 用户消息
   * @returns 更新后的会话
   */
  public addUserMessage(sessionId: string, message: string): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    session.messages.push({ role: 'user', content: message });
    session.updatedAt = new Date();
    return session;
  }

  /**
   * 添加助手消息
   * @param sessionId 会话ID
   * @param message 助手消息
   * @returns 更新后的会话
   */
  public addAssistantMessage(sessionId: string, message: string): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    session.messages.push({ role: 'assistant', content: message });
    session.updatedAt = new Date();
    return session;
  }

  /**
   * 修改最后一条助手消息
   * @param sessionId 会话ID
   * @param newMessage 新的助手消息
   * @returns 更新后的会话
   */
  public updateLastAssistantMessage(sessionId: string, newMessage: string): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    for (let i = session.messages.length - 1; i >= 0; i--) {
      if (session.messages[i].role === 'assistant') {
        session.messages[i].content = newMessage;
        session.updatedAt = new Date();
        return session;
      }
    }

    return session;
  }

  /**
   * 获取所有消息
   * @param sessionId 会话ID
   * @returns 会话中的所有消息
   */
  public getMessages(sessionId: string): ChatMessage[] | undefined {
    const session = this.sessions.get(sessionId);
    return session?.messages;
  }

  /**
   * 删除会话
   * @param sessionId 会话ID
   * @returns 是否删除成功
   */
  public deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * 清理过期会话 (24小时前创建的)
   */
  public cleanupOldSessions(): void {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now);
    twentyFourHoursAgo.setHours(now.getHours() - 24);

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.updatedAt < twentyFourHoursAgo) {
        this.sessions.delete(sessionId);
      }
    }
  }
} 