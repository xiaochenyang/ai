import { useState } from "react";
import React from "react";
import LowcodeDslConverter from "./components/LowcodeDslConverter";
import LowcodeDslConversation from "./components/LowcodeDslConversation";

// 定义DSL类型接口
interface DSLComponent {
  parentKey: string;
  childrenKeys: string[];
  style: Record<string, unknown>;
  componentProps: Record<string, unknown>;
  type: string;
}

interface DSLStructure {
  [key: string]: DSLComponent;
}

// Mock DSL 数据示例
const mockDSL: DSLStructure = {
  page: {
    parentKey: "-",
    type: "page",
    childrenKeys: ["Input1", "Row1", "Detail"],
    style: {
      padding: "16px",
      background: "#f5f5f5",
    },
    componentProps: {
      title: "表单页面",
    },
  },
  Input1: {
    parentKey: "page",
    type: "input",
    childrenKeys: [],
    style: {
      width: "100%",
      marginBottom: "16px",
    },
    componentProps: {
      label: "用户名",
      placeholder: "请输入用户名",
    },
  },
  Row1: {
    parentKey: "page",
    type: "row",
    childrenKeys: ["Col1"],
    style: {
      display: "flex",
      marginBottom: "16px",
    },
    componentProps: {},
  },
  Col1: {
    parentKey: "Row1",
    type: "col",
    childrenKeys: ["Input2"],
    style: {
      flex: 1,
    },
    componentProps: {},
  },
  Input2: {
    parentKey: "Col1",
    type: "input",
    childrenKeys: [],
    style: {
      width: "100%",
    },
    componentProps: {
      label: "密码",
      type: "password",
      placeholder: "请输入密码",
    },
  },
  Detail: {
    parentKey: "page",
    type: "detail",
    childrenKeys: [],
    style: {
      marginTop: "24px",
    },
    componentProps: {
      title: "提交按钮",
      buttonText: "登录",
    },
  },
};

function App() {
  const [activeTab, setActiveTab] = useState<
    "generate" | "convert" | "lowcode" | "conversation"
  >("generate");
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [dsl, setDsl] = useState<DSLStructure | null>(null);
  const [generatedNaturalLanguage, setGeneratedNaturalLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "http://localhost:3000";

  // 1. 从Mock DSL生成自然语言描述
  const handleGenerateNaturalLanguage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/generate-description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dsl: mockDSL }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "生成自然语言描述失败");
      }

      setGeneratedNaturalLanguage(result.data.description);

      // 保存为文件
      const dataStr = JSON.stringify({
        dsl: mockDSL,
        description: result.data.description,
      });
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "dsl-description.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating natural language:", error);
      setError(
        error instanceof Error ? error.message : "生成自然语言描述时发生错误"
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. 从自然语言生成DSL
  const handleGenerateDSL = async () => {
    if (!naturalLanguage.trim()) {
      setError("请输入自然语言描述");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/generate-dsl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ naturalLanguage }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "生成DSL失败");
      }

      setDsl(result.data);
    } catch (error) {
      console.error("Error generating DSL:", error);
      setError(error instanceof Error ? error.message : "生成DSL时发生错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">低代码平台DSL生成器</h1>

      <div className="mb-4 flex border-b border-gray-200">
        <button
          className={`py-2 px-4 mr-2 ${
            activeTab === "generate"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("generate")}
        >
          DSL到自然语言
        </button>
        <button
          className={`py-2 px-4 mr-2 ${
            activeTab === "convert"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("convert")}
        >
          自然语言到DSL
        </button>
        <button
          className={`py-2 px-4 mr-2 ${
            activeTab === "lowcode"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("lowcode")}
        >
          低代码引擎DSL转换
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "conversation"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("conversation")}
        >
          多轮对话转换
        </button>
      </div>

      {activeTab === "generate" ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">DSL示例</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
              {JSON.stringify(mockDSL, null, 2)}
            </pre>
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            onClick={handleGenerateNaturalLanguage}
            disabled={loading}
          >
            {loading ? "生成中..." : "从DSL生成自然语言描述"}
          </button>

          {error && (
            <div className="mt-4 p-2 bg-red-100 border border-red-300 text-red-800 rounded-md">
              {error}
            </div>
          )}

          {generatedNaturalLanguage && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">生成的自然语言描述</h2>
              <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                {generatedNaturalLanguage}
              </div>
              <p className="mt-2 text-sm text-gray-600">已自动下载保存为文件</p>
            </div>
          )}
        </div>
      ) : activeTab === "convert" ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              自然语言描述
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md h-40"
              value={naturalLanguage}
              onChange={(e) => setNaturalLanguage(e.target.value)}
              placeholder="请输入页面描述，例如：一个包含用户名和密码输入框的登录表单"
            />
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            onClick={handleGenerateDSL}
            disabled={loading || !naturalLanguage.trim()}
          >
            {loading ? "生成中..." : "生成DSL"}
          </button>

          {error && (
            <div className="mt-4 p-2 bg-red-100 border border-red-300 text-red-800 rounded-md">
              {error}
            </div>
          )}

          {dsl && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">生成的DSL</h2>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(dsl, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : activeTab === "lowcode" ? (
        <div>
          <LowcodeDslConverter />
        </div>
      ) : (
        <div>
          <LowcodeDslConversation />
        </div>
      )}
    </div>
  );
}

export default App;
