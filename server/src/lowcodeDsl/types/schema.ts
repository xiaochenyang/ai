/**
 * 阿里巴巴低代码引擎搭建协议规范类型定义
 * 参考：https://lowcode-engine.cn/site/docs/specs/lowcode-spec
 */

/**
 * 低代码引擎顶层结构
 */
export interface LowCodeSchema {
  /** 当前协议版本号 */
  version: string;
  /** 组件映射关系 */
  componentsMap: ComponentMapItem[];
  /** 描述模版/页面/区块/低代码业务组件的组件树 */
  componentsTree: ComponentTree[];
  /** 工具类扩展映射关系（可选） */
  utils?: any[];
  /** 国际化语料（可选） */
  i18n?: Record<string, any>;
  /** 应用范围内的全局常量（可选） */
  constants?: Record<string, any>;
  /** 应用范围内的全局样式（可选） */
  css?: string;
  /** 当前应用配置信息（可选） */
  config?: Record<string, any>;
  /** 当前应用元数据信息（可选） */
  meta?: Record<string, any>;
  /** 当前应用的公共数据源（可选） */
  dataSource?: DataSource[];
  /** 当前应用的路由配置信息（可选） */
  router?: Router;
  /** 当前应用的所有页面信息（可选） */
  pages?: Page[];
}

/**
 * 组件映射关系项
 */
export interface ComponentMapItem {
  /** 组件名称 */
  componentName: string;
  /** 组件包名 */
  package: string;
  /** 组件版本号 */
  version?: string;
  /** 组件描述信息 */
  destructuring?: boolean;
  /** 组件导出名称 */
  exportName: string;
  /** 组件子名称 */
  subName?: string;
  /** 组件主名称 */
  main?: string;
}

/**
 * 组件树
 */
export interface ComponentTree {
  /** 组件名称 */
  componentName: string;
  /** 组件ID */
  id?: string;
  /** 文档ID */
  docId?: string;
  /** 文件名 */
  fileName?: 'home';
  /** 组件属性 */
  props: Record<string, any>;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 组件标题 */
  title?: string;
  /** 是否锁定 */
  isLocked?: boolean;
  /** 条件 */
  condition?: boolean | string;
  /** 条件组 */
  conditionGroup?: string;
  /** 数据源 */
  dataSource?: DataSource;
  /** 状态 */
  state?: Record<string, any>;
  /** 方法 */
  methods?: Record<string, Method>;
  /** 生命周期 */
  lifeCycles?: Record<string, Method>;
  /** 原始代码 */
  originCode?: string;
  /** CSS样式 */
  css?: string;
  /** 子组件 */
  children?: ComponentTree[] | string;
}

/**
 * 方法定义
 */
export interface Method {
  /** 方法类型 */
  type: 'JSFunction' | string;
  /** 方法值 */
  value: string;
  /** 方法源码 */
  source?: string;
}

/**
 * 数据源
 */
export interface DataSource {
  /** 数据源列表 */
  list: DataSourceItem[];
}

/**
 * 数据源项
 */
export interface DataSourceItem {
  /** 数据源ID */
  id: string;
  /** 数据源类型 */
  type: string;
  /** 数据源配置选项 */
  options?: Record<string, any>;
  /** 数据处理器 */
  dataHandler?: Method;
  /** 是否生效 */
  isInit?: boolean;
  /** 是否加载 */
  isLoading?: boolean;
}

/**
 * 路由定义
 */
export interface Router {
  /** 路由类型，如 'browser' 或 'hash' */
  type?: string;
  /** 路由路径 */
  path?: string;
  /** 路由配置 */
  routes: Route[];
}

/**
 * 路由记录
 */
export interface Route {
  /** 路由路径 */
  path: string;
  /** 路由名称 */
  name?: string;
  /** 路由组件 */
  component?: string;
  /** 是否精确匹配 */
  exact?: boolean;
  /** 子路由 */
  routes?: Route[];
}

/**
 * 页面定义
 */
export interface Page {
  /** 页面路径 */
  path: string;
  /** 页面名称 */
  name?: string;
  /** 页面组件树 */
  componentsTree: ComponentTree[];
} 