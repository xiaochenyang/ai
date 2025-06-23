import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Tabs,
  message,
  Spin,
  Card,
  Tag,
  Divider,
  Space,
  Collapse,
  Tooltip,
} from "antd";
import { LowcodeDslService, ChatMessage } from "../services/lowcodeDslService";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  SendOutlined,
  HistoryOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;

/**
 * 低代码DSL对话组件
 * 允许用户进行多轮对话，在自然语言和低代码DSL之间进行转换，并能修改结果
 */
const LowcodeDslConversation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [naturalLanguage, setNaturalLanguage] = useState<string>("");
  const [dslJson, setDslJson] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedbackInput, setShowFeedbackInput] = useState<boolean>(false);
  const [messageToEdit, setMessageToEdit] = useState<string | null>(null);

  // 初始化时创建新会话
  useEffect(() => {
    createNewConversation();
  }, []);

  // 创建新会话
  const createNewConversation = async () => {
    try {
      setLoading(true);
      const response = await LowcodeDslService.createConversation();
      if (response.success) {
        setSessionId(response.data.sessionId);
        message.success("新会话已创建");
        setMessages([]);
        setNaturalLanguage("");
        setDslJson("");
        setFeedback("");
        setShowFeedbackInput(false);
        setMessageToEdit(null);
      } else {
        message.error(response.error || "创建会话失败");
      }
    } catch (error) {
      message.error("创建会话失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 获取会话消息
  const fetchConversationMessages = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const response = await LowcodeDslService.getConversationMessages(
        sessionId
      );
      if (response.success) {
        setMessages(response.data.messages);
      } else {
        message.error(response.error || "获取会话消息失败");
      }
    } catch (error) {
      message.error("获取会话消息失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 获取示例DSL
  const handleGetExample = async () => {
    try {
      setLoading(true);
      const response = await LowcodeDslService.getExampleDsl();
      if (response.success) {
        setDslJson(JSON.stringify(response.data, null, 2));
        message.success("示例DSL已加载");
      } else {
        message.error(response.error || "获取示例失败");
      }
    } catch (error) {
      message.error("获取示例失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 将自然语言转换为DSL（多轮对话模式）
  const handleGenerateDsl = async () => {
    if (!naturalLanguage.trim()) {
      message.warning("请输入自然语言描述");
      return;
    }

    try {
      setLoading(true);
      await LowcodeDslService.generateDslFromDescriptionWithContext(
        naturalLanguage,
        sessionId || undefined,
        (event, data) => {
          if (event === 'success') {
            setSessionId(data.sessionId);
            setDslJson(JSON.stringify(data.dsl, null, 2));
            setActiveTab("2");
            message.success("DSL生成成功");
            // 获取更新后的会话消息
            fetchConversationMessages();
          } else if (event === 'error') {
            message.error(data.error || "生成DSL失败");
          }
        }
      );
    } catch (error) {
      message.error("生成DSL失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 修改生成的DSL
  const handleReviseDsl = async () => {
    if (!feedback.trim() || !sessionId) {
      message.warning("请输入修改反馈");
      return;
    }

    try {
      setLoading(true);
      const response = await LowcodeDslService.reviseDsl(sessionId, feedback);

      if (response.success) {
        setDslJson(JSON.stringify(response.data.dsl, null, 2));
        setFeedback("");
        setShowFeedbackInput(false);

        // 获取更新后的会话消息
        await fetchConversationMessages();

        message.success("DSL修改成功");
      } else {
        message.error(response.error || "修改DSL失败");
      }
    } catch (error) {
      message.error("修改DSL失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 将DSL转换为自然语言描述（多轮对话模式）
  const handleGenerateDescription = async () => {
    if (!dslJson.trim()) {
      message.warning("请输入DSL JSON");
      return;
    }

    try {
      setLoading(true);
      let dslObject;
      try {
        dslObject = JSON.parse(dslJson);
      } catch (error) {
        message.error("DSL JSON格式不正确");
        setLoading(false);
        return;
      }

      const response =
        await LowcodeDslService.generateDescriptionFromDslWithContext(
          dslObject,
          sessionId || undefined
        );

      if (response.success) {
        setSessionId(response.data.sessionId);
        setNaturalLanguage(response.data.description);
        setActiveTab("1");

        // 获取更新后的会话消息
        await fetchConversationMessages();

        message.success("自然语言描述生成成功");
      } else {
        message.error(response.error || "生成自然语言描述失败");
      }
    } catch (error) {
      message.error("生成自然语言描述失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 修改生成的自然语言描述
  const handleReviseDescription = async () => {
    if (!feedback.trim() || !sessionId) {
      message.warning("请输入修改反馈");
      return;
    }

    try {
      setLoading(true);
      const response = await LowcodeDslService.reviseDescription(
        sessionId,
        feedback
      );

      if (response.success) {
        setNaturalLanguage(response.data.description);
        setFeedback("");
        setShowFeedbackInput(false);

        // 获取更新后的会话消息
        await fetchConversationMessages();

        message.success("自然语言描述修改成功");
      } else {
        message.error(response.error || "修改自然语言描述失败");
      }
    } catch (error) {
      message.error("修改自然语言描述失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 渲染会话消息
  const renderMessages = () => {
    if (!messages || messages.length === 0) return null;

    return (
      <div className="conversation-messages">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, index) => (
            <Card
              key={index}
              className={`message-card ${
                msg.role === "user" ? "user-message" : "assistant-message"
              }`}
              size="small"
              style={{ marginBottom: 10 }}
            >
              <div>
                <Tag color={msg.role === "user" ? "blue" : "green"}>
                  {msg.role === "user" ? "用户" : "助手"}
                </Tag>
                <span className="message-content">{msg.content}</span>
              </div>
            </Card>
          ))}
      </div>
    );
  };

  return (
    <div className="lowcode-dsl-converter">
      <div className="conversation-header">
        <h2>低代码DSL对话生成器</h2>
        <p>支持多轮对话，可以根据反馈修改生成结果</p>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button icon={<HistoryOutlined />} onClick={createNewConversation}>
              新建会话
            </Button>
            <Button icon={<SyncOutlined />} onClick={fetchConversationMessages}>
              刷新会话
            </Button>
          </Space>
        </div>
      </div>

      <Spin spinning={loading}>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="会话历史记录" key="1">
            {renderMessages()}
          </Panel>
        </Collapse>

        <Divider />

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="自然语言" key="1">
            <TextArea
              rows={10}
              value={naturalLanguage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNaturalLanguage(e.target.value)
              }
              placeholder="输入自然语言描述，例如：创建一个登录页面，包含用户名和密码输入框，以及一个提交按钮"
            />
            <div className="action-buttons" style={{ marginTop: "16px" }}>
              <Space>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleGenerateDsl}
                >
                  生成DSL
                </Button>
                <Tooltip title="修改生成的自然语言描述">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setShowFeedbackInput(!showFeedbackInput)}
                    disabled={
                      !sessionId || activeTab !== "1" || !naturalLanguage
                    }
                  >
                    修改描述
                  </Button>
                </Tooltip>
              </Space>
            </div>

            {showFeedbackInput && activeTab === "1" && (
              <div className="feedback-section" style={{ marginTop: "16px" }}>
                <TextArea
                  rows={3}
                  value={feedback}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFeedback(e.target.value)
                  }
                  placeholder="输入修改意见，例如：请添加更多关于按钮功能的描述"
                />
                <Button
                  type="primary"
                  style={{ marginTop: "8px" }}
                  onClick={handleReviseDescription}
                  disabled={!feedback.trim()}
                >
                  提交修改
                </Button>
              </div>
            )}
          </TabPane>

          <TabPane tab="DSL JSON" key="2">
            <TextArea
              rows={15}
              value={dslJson}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDslJson(e.target.value)
              }
              placeholder="输入或生成的DSL JSON将显示在这里"
            />
            <div
              className="action-buttons"
              style={{ marginTop: "16px", display: "flex", gap: "8px" }}
            >
              <Space>
                <Button onClick={handleGetExample}>加载示例</Button>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleGenerateDescription}
                >
                  生成描述
                </Button>
                <Tooltip title="修改生成的DSL">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setShowFeedbackInput(!showFeedbackInput)}
                    disabled={!sessionId || activeTab !== "2" || !dslJson}
                  >
                    修改DSL
                  </Button>
                </Tooltip>
              </Space>
            </div>

            {showFeedbackInput && activeTab === "2" && (
              <div className="feedback-section" style={{ marginTop: "16px" }}>
                <TextArea
                  rows={3}
                  value={feedback}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFeedback(e.target.value)
                  }
                  placeholder="输入修改意见，例如：请添加一个下拉选择框组件"
                />
                <Button
                  type="primary"
                  style={{ marginTop: "8px" }}
                  onClick={handleReviseDsl}
                  disabled={!feedback.trim()}
                >
                  提交修改
                </Button>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Spin>

      {sessionId && (
        <div
          className="session-info"
          style={{ marginTop: "16px", fontSize: "12px", color: "#999" }}
        >
          会话ID: {sessionId}
        </div>
      )}
    </div>
  );
};

export default LowcodeDslConversation;
