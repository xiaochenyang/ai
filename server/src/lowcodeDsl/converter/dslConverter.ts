import { LowCodeSchema, ComponentTree, ComponentMapItem } from '../types/schema';
import OpenAI from 'openai';
import { lowcodeDsl } from './dsl';
import { SessionManager, ChatMessage } from '../services/sessionManager';
/**
 * 低代码DSL转换器 - 负责在自然语言和LowCode DSL之间互相转换
 */
export class DslConverter {

  private openai: OpenAI;
  private sessionManager: SessionManager;

  constructor() {
    this.sessionManager = new SessionManager();
  }

  static getOpenAIClient() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://api.deepseek.com/v1'
    });
  }

  /**
   * 创建新的对话会话
   * @param systemMessage 系统消息
   * @returns 会话ID
   */
  public createConversation(systemMessage?: string): string {
    const defaultSystemMessage = "你是一个专业的低代码平台开发工程师，精通阿里巴巴低代码引擎规范，能够基于已有DSL结构灵活扩展，同时确保生成的DSL符合低代码引擎的规范且能实现用户需求。";
    return this.sessionManager.createSession(systemMessage || defaultSystemMessage);
  }

  /**
   * 获取会话的所有消息
   * @param sessionId 会话ID
   * @returns 会话中的所有消息
   */
  public getConversationMessages(sessionId: string): ChatMessage[] | undefined {
    return this.sessionManager.getMessages(sessionId);
  }

  /**
   * 删除会话
   * @param sessionId 会话ID
   * @returns 是否删除成功
   */
  public deleteConversation(sessionId: string): boolean {
    return this.sessionManager.deleteSession(sessionId);
  }

  /**
   * 将自然语言描述转换为低代码DSL（多轮对话模式）
   * @param sessionId 会话ID
   * @param naturalLanguage 自然语言描述
   * @returns 低代码DSL对象和会话ID
   */
  public async convertNaturalLanguageToDslWithContext(
    sessionId: string | null,
    naturalLanguage: string
  ): Promise<{ dsl: LowCodeSchema; sessionId: string }> {
    try {
      // 如果没有提供会话ID，创建新会话
      if (!sessionId) {
        sessionId = this.createConversation();
      }

      // 添加用户消息到会话
      this.sessionManager.addUserMessage(sessionId, naturalLanguage);

      // 构建结构化提示信息
      const dslReferencePrompt = `
你是一个专业的低代码平台开发工程师，精通阿里巴巴低代码引擎规范。请按照以下精简DSL格式示例生成符合规范的DSL结构：

${JSON.stringify(lowcodeDsl, null, 2)}

生成DSL时，请遵循以下规则：
1. 返回纯JSON格式，不要有额外的文字说明
2. 确保包含version、componentsMap和componentsTree三个顶层字段
3. 每个组件必须包含id和docId属性（id格式为"node_"加随机字符，docId格式为"doc"加对应node_id后的部分）
4. 每个组件的props中应包含uniqueKey属性（值与id相同）
5. 所有使用的组件必须在componentsMap中定义
6. 最外层组件必须是Page，且fileName为home
7. 生成的每个组件ID必须唯一
8. package字段来自 @apaas-core/materials-base
9. 没有Form组件，也没有Form.Item组件

常用组件参考：
- Page: 页面容器组件（必须作为最外层组件）
- Row/Col: 用于行列布局
- Input: 用于文本输入框
- Button: 用于按钮
- Select: 用于下拉选择
- Detail: 用于明细表格
- Title: 用于标题
- DatePicker: 用于日期选择
- Radio/Checkbox: 用于单/多选
- Detail: 用于表格展示

请直接返回完整的JSON格式DSL，不要包含任何额外解释。`;

      // 获取会话消息
      const messages = this.sessionManager.getMessages(sessionId);

      // 如果会话不存在，抛出错误
      if (!messages) {
        throw new Error('会话不存在');
      }

      // 构建提示消息数组，在用户最新消息后添加格式指南
      let promptMessages = [...messages]; // 复制所有历史消息

      // 检查是否已经有dslReferencePrompt
      let hasDslPrompt = false;
      for (const msg of promptMessages) {
        if (msg.role === 'system' && msg.content.includes('生成DSL时，请遵循以下规则')) {
          hasDslPrompt = true;
          break;
        }
      }

      // 如果没有DSL参考提示，添加为当前消息的上下文提示
      if (!hasDslPrompt) {
        // 添加在用户最新消息之前
        const userIndex = promptMessages.findIndex(msg =>
          msg.role === 'user' && msg.content === naturalLanguage);

        if (userIndex > 0) {
          // 在用户消息前插入格式提示
          promptMessages.splice(userIndex, 0, {
            role: 'system',
            content: dslReferencePrompt
          });
        } else {
          // 找不到位置就添加到最前面(在初始系统消息后)
          promptMessages.splice(1, 0, {
            role: 'system',
            content: dslReferencePrompt
          });
        }
      }

      this.openai = DslConverter.getOpenAIClient();

      const response = await this.openai.chat.completions.create({
        model: "deepseek-chat",
        messages: promptMessages as any[],
        temperature: 0.2,  // 降低温度，增加结果确定性
        max_tokens: 4000,  // 增加token上限，确保完整输出
      });

      // 获取响应内容
      const content = response.choices[0]?.message?.content || '';

      // 添加助手消息到会话
      this.sessionManager.addAssistantMessage(sessionId, content);

      // 尝试从回复中提取JSON
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
        content.match(/```\s*([\s\S]*?)\s*```/) ||
        [null, content];

      const jsonStr = jsonMatch[1].trim();
      let dsl: LowCodeSchema;

      try {
        dsl = JSON.parse(jsonStr) as LowCodeSchema;
      } catch (error) {
        // 如果解析失败，则尝试再次询问以获取正确的JSON格式
        const retryMessage = "请仅返回一个完整的低代码DSL JSON格式，不要包含任何额外的解释文本或代码块标记。";
        this.sessionManager.addUserMessage(sessionId, retryMessage);

        const retryResponse = await this.openai.chat.completions.create({
          model: "deepseek-chat",
          messages: this.sessionManager.getMessages(sessionId) as any[],
          temperature: 0.1,  // 进一步降低温度
          max_tokens: 4000
        });

        const retryContent = retryResponse.choices[0]?.message?.content || '';
        this.sessionManager.addAssistantMessage(sessionId, retryContent);

        // 再次尝试提取JSON
        const retryJsonMatch = retryContent.match(/```json\s*([\s\S]*?)\s*```/) ||
          retryContent.match(/```\s*([\s\S]*?)\s*```/) ||
          [null, retryContent];

        const retryJsonStr = retryJsonMatch[1].trim();
        dsl = JSON.parse(retryJsonStr) as LowCodeSchema;
      }

      // 确保DSL中包含必要的字段
      this.validateAndFixDsl(dsl);

      return { dsl, sessionId };
    } catch (error) {
      console.error('Error converting natural language to DSL:', error);
      throw new Error('Failed to convert natural language to DSL');
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
      if (!this.sessionManager.getSession(sessionId)) {
        throw new Error('会话不存在');
      }

      // 添加用户的修改反馈
      this.sessionManager.addUserMessage(sessionId, `请根据以下反馈修改DSL：${userFeedback}`);

      // 构建结构化DSL格式提示
      const dslFormatPrompt = `
请根据用户反馈修改DSL，同时确保返回符合以下格式的完整DSL：

{
  "version": "1.0.0",
  "componentsMap": [
    {
      "componentName": "组件名",
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "组件名",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": ""
    }
  ],
  "componentsTree": [
    {
      "componentName": "Page",
      "id": "node_id",
      "docId": "doc_id",
      "fileName": "home",
      "props": {},
      "children": []
    }
  ]
}

请遵循以下规则：
1. 返回纯JSON格式，不要有额外的文字说明
2. 修改后的DSL必须包含完整的结构，而不只是修改的部分
3. 确保所有ID格式正确，所有使用的组件都在componentsMap中定义
4. 请直接返回完整的JSON格式DSL，不要包含任何额外解释。`;

      this.openai = DslConverter.getOpenAIClient();

      // 获取会话消息
      const messages = this.sessionManager.getMessages(sessionId);

      // 如果会话不存在，抛出错误
      if (!messages) {
        throw new Error('会话不存在');
      }

      // 构建提示消息数组，在用户最新消息后添加格式指南
      let promptMessages = [...messages]; // 复制所有历史消息

      // 检查是否已经有格式提示
      let hasFormatPrompt = false;
      for (const msg of promptMessages.slice(-3)) { // 只检查最近几条消息
        if (msg.role === 'system' && msg.content.includes('请根据用户反馈修改DSL')) {
          hasFormatPrompt = true;
          break;
        }
      }

      // 如果没有格式提示，在用户最新消息后添加
      if (!hasFormatPrompt) {
        // 找到最新的用户反馈消息
        const userIndex = promptMessages.findIndex(msg =>
          msg.role === 'user' && msg.content.includes('请根据以下反馈修改DSL'));

        if (userIndex > 0) {
          // 在用户消息后插入格式提示
          promptMessages.splice(userIndex + 1, 0, {
            role: 'system',
            content: dslFormatPrompt
          });
        }
      }

      const response = await this.openai.chat.completions.create({
        model: "deepseek-chat",
        messages: promptMessages as any[],
        temperature: 0.2,  // 降低温度，增加结果确定性
        max_tokens: 4000    // 增加token上限，确保完整输出
      });

      // 获取响应内容
      const content = response.choices[0]?.message?.content || '';

      // 添加助手消息到会话
      this.sessionManager.addAssistantMessage(sessionId, content);

      // 尝试从回复中提取JSON
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
        content.match(/```\s*([\s\S]*?)\s*```/) ||
        [null, content];

      const jsonStr = jsonMatch[1].trim();
      let dsl: LowCodeSchema;

      try {
        dsl = JSON.parse(jsonStr) as LowCodeSchema;
      } catch (error) {
        // 如果解析失败，则尝试再次询问以获取正确的JSON格式
        const retryMessage = "请仅返回一个完整的低代码DSL JSON格式，不要包含任何额外的解释文本或代码块标记。";
        this.sessionManager.addUserMessage(sessionId, retryMessage);

        const retryResponse = await this.openai.chat.completions.create({
          model: "deepseek-chat",
          messages: this.sessionManager.getMessages(sessionId) as any[],
          temperature: 0.1,  // 进一步降低温度
          max_tokens: 4000
        });

        const retryContent = retryResponse.choices[0]?.message?.content || '';
        this.sessionManager.addAssistantMessage(sessionId, retryContent);

        // 再次尝试提取JSON
        const retryJsonMatch = retryContent.match(/```json\s*([\s\S]*?)\s*```/) ||
          retryContent.match(/```\s*([\s\S]*?)\s*```/) ||
          [null, retryContent];

        const retryJsonStr = retryJsonMatch[1].trim();
        dsl = JSON.parse(retryJsonStr) as LowCodeSchema;
      }

      // 确保DSL中包含必要的字段
      this.validateAndFixDsl(dsl);

      return dsl;
    } catch (error) {
      console.error('Error revising DSL:', error);
      throw new Error('Failed to revise DSL');
    }
  }

  /**
   * 将低代码DSL转换为自然语言描述（多轮对话模式）
   * @param sessionId 会话ID
   * @param dsl 低代码DSL对象
   * @returns 自然语言描述和会话ID
   */
  public async convertDslToNaturalLanguageWithContext(
    sessionId: string | null,
    dsl: LowCodeSchema
  ): Promise<{ description: string; sessionId: string }> {
    try {
      // 如果没有提供会话ID，创建新会话
      if (!sessionId) {
        sessionId = this.createConversation();
      }

      // 添加用户消息到会话
      const userMessage = `请将以下低代码DSL结构转换为自然语言描述:\n${JSON.stringify(dsl, null, 2)}`;
      this.sessionManager.addUserMessage(sessionId, userMessage);

      this.openai = DslConverter.getOpenAIClient();

      const response = await this.openai.chat.completions.create({
        model: "deepseek-chat",
        messages: this.sessionManager.getMessages(sessionId) as any[],
        temperature: 0.7,
        max_tokens: 2000
      });

      // 获取响应内容
      const description = response.choices[0]?.message?.content || '';

      // 添加助手消息到会话
      this.sessionManager.addAssistantMessage(sessionId, description);

      return { description, sessionId };
    } catch (error) {
      console.error('Error converting DSL to natural language:', error);
      throw new Error('Failed to convert DSL to natural language');
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
      if (!this.sessionManager.getSession(sessionId)) {
        throw new Error('会话不存在');
      }

      // 添加用户的修改反馈
      this.sessionManager.addUserMessage(sessionId, `请根据以下反馈修改描述：${userFeedback}`);

      this.openai = DslConverter.getOpenAIClient();

      const response = await this.openai.chat.completions.create({
        model: "deepseek-chat",
        messages: this.sessionManager.getMessages(sessionId) as any[],
        temperature: 0.7,
        max_tokens: 2000
      });

      // 获取响应内容
      const description = response.choices[0]?.message?.content || '';

      // 添加助手消息到会话
      this.sessionManager.addAssistantMessage(sessionId, description);

      return description;
    } catch (error) {
      console.error('Error revising description:', error);
      throw new Error('Failed to revise description');
    }
  }

  /**
   * 将自然语言描述转换为低代码DSL (保留原方法以兼容现有代码)
   */
  public async convertNaturalLanguageToDsl(naturalLanguage: string): Promise<LowCodeSchema> {
    const { dsl } = await this.convertNaturalLanguageToDslWithContext(null, naturalLanguage);
    return dsl;
  }

  /**
   * 将低代码DSL转换为自然语言描述 (保留原方法以兼容现有代码)
   */
  public async convertDslToNaturalLanguage(dsl: LowCodeSchema): Promise<string> {
    const { description } = await this.convertDslToNaturalLanguageWithContext(null, dsl);
    return description;
  }

  /**
   * 验证并修复DSL结构，确保包含必要的字段
   * @param dsl 需要验证的DSL对象
   */
  private validateAndFixDsl(dsl: LowCodeSchema): void {
    // 确保版本号存在
    if (!dsl.version) {
      dsl.version = '1.0.0';
    }

    // 确保componentsMap存在
    if (!dsl.componentsMap) {
      dsl.componentsMap = [];
    }

    // 确保componentsTree存在
    if (!dsl.componentsTree) {
      dsl.componentsTree = [{
        componentName: 'Page',
        props: {
          __style__: {
            padding: '16px'
          }
        },
        children: []
      }];
    }

    // 确保至少有一个组件树
    if (dsl.componentsTree.length === 0) {
      dsl.componentsTree.push({
        componentName: 'Page',
        props: {
          __style__: {
            padding: '16px'
          }
        },
        children: []
      });
    }

    // 确保根组件是Page且具有fileName属性
    dsl.componentsTree.forEach(tree => {
      if (tree.componentName !== 'Page') {
        console.warn('Root component is not Page, changing to Page');
        tree.componentName = 'Page';
      }
      if (!tree.fileName) {
        tree.fileName = 'home';
      }
    });

    // 如果没有指定ID或docId，为组件树中的节点生成随机ID
    this.ensureComponentIds(dsl.componentsTree);

    // 收集所有用到的组件名称
    const componentNames = this.collectComponentNames(dsl.componentsTree);

    // 确保componentsMap中包含所有使用的组件
    this.ensureComponentsMapComplete(dsl, componentNames);

    // 确保i18n字段存在
    if (!dsl.i18n) {
      dsl.i18n = {};
    }
  }

  /**
   * 确保组件树中的每个组件都有id和docId
   * @param trees 组件树
   */
  private ensureComponentIds(trees: ComponentTree[]): void {
    const generateRandomId = () => {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 8);
      return `node_${timestamp}${randomStr}`;
    };

    const traverse = (tree: ComponentTree) => {
      // 为组件生成ID和docId（如果不存在）
      if (!tree.id) {
        tree.id = generateRandomId();
      } else if (!tree.id.startsWith('node_')) {
        // 确保ID格式正确
        tree.id = `node_${tree.id}`;
      }

      if (!tree.docId) {
        // 从node_xxx提取xxx部分作为docId
        const idParts = tree.id.match(/^node_(.*)$/);
        tree.docId = idParts ? `doc${idParts[1]}` : `doc${Math.random().toString(36).substring(2, 8)}`;
      }

      // 确保props存在
      if (!tree.props) {
        tree.props = {};
      }

      // 确保uniqueKey在props中（与id相同）
      if (tree.props && !tree.props.uniqueKey) {
        tree.props.uniqueKey = tree.id;
      }

      // 递归处理子组件
      if (tree.children && Array.isArray(tree.children)) {
        tree.children.forEach(child => {
          if (typeof child !== 'string') {
            traverse(child);
          }
        });
      }
    };

    trees.forEach(tree => traverse(tree));
  }

  /**
   * 从组件树中收集所有组件名称
   * @param trees 组件树
   * @returns 组件名称集合
   */
  private collectComponentNames(trees: ComponentTree[]): Set<string> {
    const componentNames = new Set<string>();

    const traverse = (tree: ComponentTree) => {
      componentNames.add(tree.componentName);

      if (tree.children && Array.isArray(tree.children)) {
        tree.children.forEach(child => {
          if (typeof child !== 'string') {
            traverse(child);
          }
        });
      }
    };

    trees.forEach(tree => traverse(tree));
    return componentNames;
  }

  /**
   * 确保组件映射表中包含所有使用的组件
   * @param dsl DSL对象
   * @param componentNames 组件名称集合
   */
  private ensureComponentsMapComplete(dsl: LowCodeSchema, componentNames: Set<string>): void {
    // 创建现有组件映射的索引
    const existingComponentsMap = new Map<string, ComponentMapItem>();
    dsl.componentsMap.forEach(item => {
      existingComponentsMap.set(item.componentName, item);
    });

    // 确保所有使用的组件都在组件映射中
    for (const componentName of componentNames) {
      if (!existingComponentsMap.has(componentName)) {
        // 为缺失的组件添加一个更完整的映射
        dsl.componentsMap.push({
          componentName,
          package: '@apaas-core/materials-base',
          version: '3.9.0-beta.21',
          exportName: componentName,
          main: 'src/index.tsx',
          destructuring: true,
          subName: ''
        });
      }
    }

    // 确保常用的基础组件映射存在
    const ensureBasicComponent = (componentName: string) => {
      if (!existingComponentsMap.has(componentName) && !componentNames.has(componentName)) {
        dsl.componentsMap.push({
          componentName,
          package: '@apaas-core/materials-base',
          version: '3.9.0-beta.21',
          exportName: componentName,
          main: 'src/index.tsx',
          destructuring: true,
          subName: ''
        });
      }
    };

    // 添加一些可能用到的常用组件
    const commonComponents = ['Button', 'Select', 'Form', 'Table', 'Tabs', 'Modal', 'Card'];
    commonComponents.forEach(ensureBasicComponent);
  }
} 