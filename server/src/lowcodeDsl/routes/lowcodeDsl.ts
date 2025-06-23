import express from 'express';
import { LowcodeDslService } from '../services/lowcodeDslService';

const router = express.Router();
const lowcodeDslService = new LowcodeDslService();

/**
 * 获取示例DSL
 * GET /api/lowcode-dsl/example
 */
router.get('/example', async (req, res) => {
  try {
    const exampleDsl = lowcodeDslService.getExampleDsl();
    res.json({
      success: true,
      data: exampleDsl
    });
  } catch (error) {
    console.error('Error getting example DSL:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get example DSL'
    });
  }
});

/**
 * 创建新的对话会话
 * POST /api/lowcode-dsl/conversation
 *
 * 请求体:
 * {
 *   "systemMessage": "可选的系统消息"
 * }
 */
router.post('/conversation', async (req, res) => {
  try {
    const { systemMessage } = req.body;
    const sessionId = lowcodeDslService.createConversation(systemMessage);

    res.json({
      success: true,
      data: { sessionId }
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create conversation'
    });
  }
});

/**
 * 获取会话的所有消息
 * GET /api/lowcode-dsl/conversation/:sessionId
 */
router.get('/conversation/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = lowcodeDslService.getConversationMessages(sessionId);

    if (!messages) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      data: { messages }
    });
  } catch (error) {
    console.error('Error getting conversation messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get conversation messages'
    });
  }
});

/**
 * 删除会话
 * DELETE /api/lowcode-dsl/conversation/:sessionId
 */
router.delete('/conversation/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const success = lowcodeDslService.deleteConversation(sessionId);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      data: { message: 'Conversation deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete conversation'
    });
  }
});

/**
 * 将自然语言描述转换为低代码DSL（支持多轮对话）
 * POST /api/lowcode-dsl/generate-dsl-with-context
 * 
 * 请求体:
 * {
 *   "description": "一个包含登录表单的页面，有用户名和密码输入框，以及一个提交按钮",
 *   "sessionId": "可选的会话ID，如果提供则继续该会话，否则创建新会话"
 * }
 */
router.post('/generate-dsl-with-context', async (req, res) => {
  try {
    const { description, sessionId } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      });
    }

    // 设置响应头，表明这是一个流式响应
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 创建一个函数来发送SSE消息
    const sendSSE = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
      // 开始生成DSL
      const result = await lowcodeDslService.generateDslFromDescriptionWithContext(description, sessionId);
      
      // 发送成功消息
      sendSSE('success', {
        dsl: result.dsl,
        sessionId: result.sessionId
      });
    } catch (error) {
      // 发送错误消息
      sendSSE('error', {
        error: 'Failed to generate DSL from description'
      });
    } finally {
      // 结束流
      res.end();
    }
  } catch (error) {
    console.error('Error generating DSL from description:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate DSL from description'
    });
  }
});

/**
 * 修改生成的DSL结果
 * POST /api/lowcode-dsl/revise-dsl
 * 
 * 请求体:
 * {
 *   "sessionId": "会话ID",
 *   "feedback": "添加一个下拉菜单选择框"
 * }
 */
router.post('/revise-dsl', async (req, res) => {
  try {
    const { sessionId, feedback } = req.body;

    if (!sessionId || !feedback) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and feedback are required'
      });
    }

    const dsl = await lowcodeDslService.reviseDsl(sessionId, feedback);

    res.json({
      success: true,
      data: { dsl }
    });
  } catch (error) {
    console.error('Error revising DSL:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to revise DSL'
    });
  }
});

/**
 * 将低代码DSL转换为自然语言描述（支持多轮对话）
 * POST /api/lowcode-dsl/generate-description-with-context
 * 
 * 请求体:
 * {
 *   "dsl": {...}, // 低代码DSL对象
 *   "sessionId": "可选的会话ID，如果提供则继续该会话，否则创建新会话"
 * }
 */
router.post('/generate-description-with-context', async (req, res) => {
  try {
    const { dsl, sessionId } = req.body;

    if (!dsl) {
      return res.status(400).json({
        success: false,
        error: 'DSL is required'
      });
    }

    const result = await lowcodeDslService.generateDescriptionFromDslWithContext(dsl, sessionId);

    res.json({
      success: true,
      data: {
        description: result.description,
        sessionId: result.sessionId
      }
    });
  } catch (error) {
    console.error('Error generating description from DSL:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate description from DSL'
    });
  }
});

/**
 * 修改生成的自然语言描述
 * POST /api/lowcode-dsl/revise-description
 * 
 * 请求体:
 * {
 *   "sessionId": "会话ID",
 *   "feedback": "添加关于按钮功能的更多详细信息"
 * }
 */
router.post('/revise-description', async (req, res) => {
  try {
    const { sessionId, feedback } = req.body;

    if (!sessionId || !feedback) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and feedback are required'
      });
    }

    const description = await lowcodeDslService.reviseDescription(sessionId, feedback);

    res.json({
      success: true,
      data: { description }
    });
  } catch (error) {
    console.error('Error revising description:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to revise description'
    });
  }
});

/**
 * 将自然语言描述转换为低代码DSL (保留原接口以兼容现有代码)
 * POST /api/lowcode-dsl/generate-dsl
 */
router.post('/generate-dsl', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      });
    }

    const dsl = await lowcodeDslService.generateDslFromDescription(description);

    res.json({
      success: true,
      data: dsl
    });
  } catch (error) {
    console.error('Error generating DSL from description:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate DSL from description'
    });
  }
});

/**
 * 将低代码DSL转换为自然语言描述 (保留原接口以兼容现有代码)
 * POST /api/lowcode-dsl/generate-description
 */
router.post('/generate-description', async (req, res) => {
  try {
    const { dsl } = req.body;

    if (!dsl) {
      return res.status(400).json({
        success: false,
        error: 'DSL is required'
      });
    }

    const description = await lowcodeDslService.generateDescriptionFromDsl(dsl);

    res.json({
      success: true,
      data: {
        description
      }
    });
  } catch (error) {
    console.error('Error generating description from DSL:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate description from DSL'
    });
  }
});

export default router; 