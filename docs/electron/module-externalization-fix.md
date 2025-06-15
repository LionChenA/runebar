# Electron 模块外部化问题解决方案

## 问题描述

在Electron + Vite应用中遇到的典型模块外部化错误：

```
Module "path" has been externalized for browser compatibility. Cannot access "path.join" in client code.
Uncaught TypeError: path.join is not a function
```

## 问题根源

1. **架构混合问题**：渲染进程文件错误地导入了包含Electron API的模块
2. **类型导入链**：通过类型导入间接引入了包含Node.js/Electron API的文件
3. **Vite配置问题**：Node.js全局变量在浏览器环境中未定义

## 解决方案：类型分离策略

### 1. 创建纯类型定义文件

创建了以下纯类型文件，不导入任何Electron模块：

- `src/types/ipc-types.ts` - IPC基础类型
- `src/types/shortcut-types.ts` - 快捷键类型
- `src/types/window-types.ts` - 窗口类型  
- `src/types/theme-types.ts` - 主题类型
- `src/types/settings-types.ts` - 设置类型

### 2. 重构IPC上下文文件

更新了所有IPC上下文文件，使其只导入纯类型：

- `src/helpers/ipc/shortcut/shortcut-context.ts`
- `src/helpers/ipc/theme/theme-context.ts`
- `src/helpers/ipc/settings/settings-context.ts`

### 3. 分离渲染进程和主进程代码

创建了专门的渲染进程helper文件：

- `src/helpers/settings/renderer.ts` - 渲染进程专用的设置管理
- 重构 `src/helpers/ipc/settings/index.ts` - 只用于主进程

### 4. 更新Vite配置

在 `vite.renderer.config.mts` 中添加：

```typescript
define: {
  // 定义Node.js全局变量以避免在浏览器环境中出现未定义错误
  __dirname: 'undefined',
  __filename: 'undefined',
  global: 'globalThis',
},
```

### 5. 修复类型声明

更新 `src/types.d.ts` 中的Window接口声明，使其与实际暴露的API匹配。

## 关键原则

1. **严格分离**：渲染进程代码绝不能直接导入包含Electron API的模块
2. **类型安全**：通过纯类型文件保持类型安全
3. **API一致性**：确保类型声明与实际暴露的API匹配
4. **构建优化**：通过Vite配置处理Node.js环境差异

## 文件结构

```
src/
├── types/                    # 纯类型定义（渲染进程安全）
│   ├── ipc-types.ts
│   ├── shortcut-types.ts
│   ├── window-types.ts
│   ├── theme-types.ts
│   └── settings-types.ts
├── helpers/
│   ├── settings/
│   │   └── renderer.ts       # 渲染进程专用
│   └── ipc/                  # 主进程/preload专用
│       ├── shortcut/
│       ├── theme/
│       └── settings/
└── types.d.ts               # 全局类型声明
```

## 验证

构建成功，无模块外部化错误：
- ✅ `npm run package` 成功
- ✅ 无 "path.join is not a function" 错误
- ✅ 类型检查通过

## 最佳实践

1. **新增IPC功能时**：
   - 先在 `src/types/` 中定义纯类型
   - 在preload脚本中实现API
   - 在渲染进程中只使用类型和window API

2. **避免的模式**：
   - 渲染进程直接导入包含 `import { ... } from "electron"` 的文件
   - 通过类型导入间接引入Electron模块

3. **推荐的模式**：
   - 使用纯类型文件
   - 通过window API访问preload暴露的功能
   - 保持渲染进程和主进程代码严格分离 