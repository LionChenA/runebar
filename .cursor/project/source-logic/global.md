# Runebar - 全局依赖关系

## 项目概述

Runebar 是一个基于 Electron 的 AI 辅助工具，为用户提供 LLM 功能访问、提示词管理和工具集成。应用具有两个主要界面：

1. **Main Interface**: 主界面，提供完整功能和配置
2. **Runebar Interface**: 快速访问界面，通过全局快捷键激活

## 核心技术栈

### 基础框架
- **Electron**: 跨平台桌面应用框架
- **React 19**: UI 框架
- **TypeScript**: 静态类型检查
- **Vite**: 构建工具

### 状态管理
- **Zustand**: 全局 UI 状态和应用状态管理
- **TanStack Query**: 服务器状态和数据获取

### UI 组件
- **shadcn/ui**: 基于 Radix UI 的组件系统
- **Radix UI**: 无样式、可访问的 UI 原语
- **Tailwind CSS**: 原子化 CSS 框架
- **Lucide Icons**: 图标库

### 路由
- **TanStack Router**: 类型安全的客户端路由

### 国际化
- **i18next**: 国际化框架
- **react-i18next**: React 国际化绑定

## 文件结构

```
src/
├── assets/         # 字体和其他资源
├── components/     # UI 组件
│   ├── template/   # 模板组件
│   └── ui/         # shadcn/ui 组件
├── helpers/        # 辅助函数
│   ├── ipc/        # IPC 相关函数
│   ├── theme/      # 主题相关功能
│   └── localization/   # 本地化辅助函数
├── hooks/          # 自定义 React Hooks
├── layouts/        # 页面布局组件
├── localization/   # i18n 文件
├── pages/          # 页面组件
├── providers/      # Context Providers
├── routes/         # 路由定义
│   ├── main/       # 主窗口路由
│   └── runebar/    # Runebar 窗口路由
├── store/          # 状态管理 (Zustand)
├── styles/         # 全局样式
├── tests/          # 测试
│   ├── e2e/        # Playwright 端到端测试
│   └── unit/       # Vitest 单元测试
├── types/          # TypeScript 类型定义
└── utils/          # 通用工具函数
```

## 状态管理架构

### Zustand Stores
- **app.ts**: UI 状态 (侧边栏、活动视图等)
- **settings.ts**: 用户设置 (主题、语言等)
- **data.ts**: 应用数据 (模型、提示词等)

### React Query
用于所有 API 请求和异步数据获取，包括：
- LLM API 调用
- 外部服务集成

## 全局模式和约定

### 组件命名
- PascalCase 用于组件名
- kebab-case 用于文件名

### 状态管理
- Zustand 用于全局 UI 和应用状态
- TanStack Query 用于服务器数据和 API 状态
- React 状态用于局部组件状态

### CSS 约定
- 使用 Tailwind 类进行样式设置
- 避免内联样式和自定义 CSS 文件
- 使用 clsx/cn 工具函数组合条件类名

### 导入约定
- 使用别名导入 (例如 `@/components`)
- 按以下顺序对导入进行分组：
  1. React 和第三方库
  2. 内部组件和 hooks
  3. 类型和工具函数
  4. 样式

### 错误处理
- 使用 try/catch 处理异步错误
- 使用 React Query 的错误处理功能
- 显示友好的用户错误消息

# Global Dependencies and Patterns

基于对项目的分析，以下是在整个代码库中共享的关键依赖和模式。

## 核心框架和库

### Electron
- **用途**: 提供桌面应用程序的运行环境
- **主要模块**: `app`, `BrowserWindow`, IPC 通信

### React
- **版本**: 19.1.0
- **用途**: 用户界面构建
- **核心功能**: 组件系统, Hooks, 虚拟 DOM

### TanStack Router
- **用途**: 应用程序路由管理
- **主要组件**: `RouterProvider`, `router`

### i18next
- **用途**: 国际化和本地化
- **主要功能**: 语言切换, 翻译管理

## UI 组件库

### shadcn/ui
- **基础**: 基于 Radix UI 原语构建的组件库
- **样式**: 使用 Tailwind CSS 进行样式设计

### Radix UI
- **用途**: 提供无障碍、无样式的 UI 原语
- **主要组件**:
  - `Slot`: 用于组件组合 (`asChild` 模式)
  - `Toggle`: 切换组件
  - `NavigationMenu`: 导航菜单组件

## 样式工具

### Tailwind CSS
- **版本**: 4.1.7
- **用途**: 实用优先的 CSS 框架
- **主要功能**: 预定义的工具类, 响应式设计, 主题定制

### 样式工具函数
- **cn** (`@/utils/tailwind`): 用于条件性地合并类名
- **cva** (`class-variance-authority`): 用于管理组件变体和样式

## 图标库

### Lucide React
- **用途**: 提供一致的图标集
- **使用**: 用于 UI 元素如箭头、指示器和操作按钮

## 项目特定模式

### IPC 通信系统
- **架构**: 模块化设计，分为中央协调器和功能模块
- **中央协调器**:
  - `helpers/ipc/context-exposer.ts`: 在预加载脚本中集中暴露所有上下文
  - `helpers/ipc/listeners-register.ts`: 在主进程中集中注册所有事件监听器
- **功能模块结构**:
  - `{module}-channels.ts`: 定义 IPC 通道常量
  - `{module}-context.ts`: 暴露渲染进程可访问的 API
  - `{module}-listeners.ts`: 在主进程中处理渲染进程的请求
- **数据流**:
  1. 渲染进程通过 `window.{namespace}.{method}()` 调用暴露的 API
  2. 预加载脚本将调用转换为对特定 IPC 通道的 `ipcRenderer.invoke()` 调用
  3. 主进程中的监听器接收请求，执行相应操作
  4. 主进程返回结果，通过 Promise 传递回渲染进程
- **安全考虑**:
  - 上下文隔离: 使用 contextBridge 安全地暴露 API
  - 有限的 API: 只暴露必要的功能，限制渲染进程的权限
  - 类型安全: 使用 TypeScript 确保类型安全
  - 异步通信: 使用 Promise 进行异步通信，避免阻塞
- **现有模块**:
  - 主题管理模块: 控制应用程序主题
  - 窗口控制模块: 控制应用程序窗口

### 主题管理
- **模式**: 系统/深色/浅色主题切换
- **文件**: `helpers/theme_helpers.ts`
- **IPC 集成**: 通过 `helpers/ipc/theme` 目录下的文件与主进程通信

### 窗口控制
- **模式**: 最小化/最大化/关闭窗口操作
- **文件**: `helpers/window_helpers.ts`
- **IPC 集成**: 通过 `helpers/ipc/window` 目录下的文件与主进程通信

### 组件结构
1. **变体定义**: 使用 `cva` 定义样式变体
2. **组件接口**: TypeScript 接口扩展 HTML 元素属性和变体属性
3. **组件实现**: 使用 `React.forwardRef` 进行引用转发
4. **组合模式**: 使用 `asChild` 属性和 Radix UI 的 `Slot` 实现组件组合

### 无障碍性特性
- 键盘导航
- ARIA 属性
- 屏幕阅读器支持
- 焦点管理

### 样式方法
- Tailwind CSS 用于实用优先的样式
- CSS 变量用于主题化
- 使用数据属性的状态样式

## 快捷键管理系统

### 工具与辅助函数

项目的快捷键系统通过以下组件提供支持：

1. **平台检测 (`utils/platform.ts`)**:
   - 提供跨平台兼容的平台检测功能
   - 支持针对特定平台的条件逻辑

2. **快捷键辅助函数 (`helpers/hotkey_helpers.ts`)**:
   - 标准化快捷键格式
   - 转换不同系统的快捷键表示
   - 格式化用于UI显示的快捷键
   - 检测快捷键冲突

3. **主进程快捷键管理 (`ShortcutManager`)**:
   - 使用OOP单例模式管理全局快捷键
   - 自动化生命周期管理

4. **渲染进程快捷键钩子 (`useHotkeys`)**:
   - 基于React Hooks的局部快捷键管理
   - 组件级别的快捷键处理

### 架构分层

快捷键系统采用清晰的分层架构：

- **基础层**: 平台检测和通用工具函数
- **中间层**: 快捷键辅助函数和格式处理
- **应用层**: 主进程管理类和渲染进程钩子
- **UI层**: 组件中的快捷键绑定和显示

这种分层确保了系统的模块化和可扩展性，同时保持了跨平台的一致性。

### 重构升级

项目的全局快捷键管理系统已从函数式编程模式升级为OOP单例模式：

- **过去:** 使用函数式API (`registerGlobalShortcuts`/`unregisterGlobalShortcuts`)，需要显式注册和注销
- **现在:** 使用单例模式的`ShortcutManager`类，提供自动化的生命周期管理
- **优势:** 集中管理、自动化生命周期、降低耦合度、更好的扩展性

### 关键设计模式

- **单例模式:** `ShortcutManager`类通过`getInstance()`确保全局唯一实例
- **封装:** 将快捷键的注册、注销和事件分发逻辑完全封装在管理器内部
- **自动生命周期管理:** 在应用退出时自动注销快捷键，无需显式调用

### 使用方式

```typescript
// 初始化
ShortcutManager.getInstance().init(mainWindow);

// 注册新快捷键
ShortcutManager.getInstance().register("CommandOrControl+Shift+X", callback);

// 注销快捷键
ShortcutManager.getInstance().unregister("CommandOrControl+Shift+X");
```

### 集成流程

1. 在应用启动时初始化管理器
2. 无需显式管理快捷键的注销过程
3. 渲染进程通过预先暴露的`electronShortcut.onShortcut`API监听快捷键事件

