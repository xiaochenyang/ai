import React, { useState } from "react";
import { Button, Input, Tabs, message, Spin } from "antd";
import { LowcodeDslService } from "../services/lowcodeDslService";

const { TextArea } = Input;
const { TabPane } = Tabs;

/**
 * 低代码DSL转换组件
 * 允许用户在自然语言和低代码DSL之间进行转换
 */
const LowcodeDslConverter: React.FC = () => {
  const [naturalLanguage, setNaturalLanguage] = useState<string>("");
  const [dslJson, setDslJson] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");

  /**
   * 获取示例DSL
   */
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

  /**
   * 将自然语言转换为DSL
   */
  const handleGenerateDsl = async () => {
    if (!naturalLanguage.trim()) {
      message.warning("请输入自然语言描述");
      return;
    }

    try {
      setLoading(true);
      const response = await LowcodeDslService.generateDslFromDescription(
        naturalLanguage
      );
      if (response.success) {
        setDslJson(JSON.stringify(response.data, null, 2));
        setActiveTab("2");
        message.success("DSL生成成功");
      } else {
        message.error(response.error || "生成DSL失败");
      }
    } catch (error) {
      message.error("生成DSL失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 将DSL转换为自然语言
   */
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
        return;
      }

      const response = await LowcodeDslService.generateDescriptionFromDsl(
        dslObject
      );
      if (response.success) {
        setNaturalLanguage(response.data.description);
        setActiveTab("1");
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

  return (
    <div className="lowcode-dsl-converter">
      <h2>低代码DSL转换器</h2>
      <p>在自然语言描述和低代码DSL之间进行转换</p>

      <Spin spinning={loading}>
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
              <Button type="primary" onClick={handleGenerateDsl}>
                生成DSL
              </Button>
            </div>
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
              <Button onClick={handleGetExample}>加载示例</Button>
              <Button type="primary" onClick={handleGenerateDescription}>
                生成描述
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default LowcodeDslConverter;
