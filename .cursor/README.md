# Runebar 项目规则和文档

本目录包含了Runebar项目的规则、文档和辅助工具。

## 规则目录

`.cursor/rules/` 目录包含了项目的各种规则和指南：

- `memory/programming/front-end/react/react`: 解决React项目中遇到biome提示"import React语句only used as types"错误的配置方法
- `project/doc`: 定义文档规范
- `project/project-context`: 提取并持久化项目技术环境摘要
- `structure`: 整个仓库的结构和各部分的用途

## 项目文档

项目的主要文档位于 `docs/` 目录：

### 架构文档
- `docs/architecture.md`: 项目整体架构设计
- `docs/main-interface-plan.md`: 主界面计划

### Electron相关
- `docs/electron/application-flow.md`: 应用流程
- `docs/electron/multi-window.md`: 多窗口管理
- `docs/electron/runebar-window.md`: Runebar窗口实现
- `docs/electron/troubleshooting.md`: 故障排除指南

### UI组件库
- `docs/radix-ui/`: Radix UI组件文档
- `docs/shadcn/`: Shadcn UI组件文档
- `docs/tanstack/`: TanStack相关库文档

## 使用指南

在开发过程中，请遵循以下原则：

1. 遵循项目的文件命名和存放位置规范
2. 使用`@/`绝对路径方式引用模块，避免使用相对路径
3. 编写清晰的注释，尤其是对于复杂的逻辑
4. 遇到问题时，先查阅相关文档，特别是故障排除指南

## 规则更新

如需更新规则或添加新的文档，请遵循现有的格式和组织结构。

## 规则列表

### 1. project/project-context

自动提取和保存项目的技术环境信息（框架、工具、配置）到`.cursor/project/context.json`文件中。
只有在相关配置文件发生变化时才会更新。

### 2. memory/programming/front-end/react/react

解决React项目中遇到biome提示"import React语句only used as types"错误的配置方法。

### 3. project/source-logic

维护项目源码文件的结构化文档，包括：

- **全局文档**：`.cursor/project/source-logic/global.md` - 记录项目的全局依赖关系和模式
- **文件文档**：`.cursor/project/source-logic/files/<filepath>.md` - 记录特定文件的逻辑和作用

每个文件文档包含：
1. 组件/模块概述
2. 实现细节
3. 技术注解
4. 设计思考
5. 与其他模块的关系
6. 使用示例

## 使用方法

AI助手可以通过以下方式使用这些规则：

1. 读取`context.json`了解项目基本配置
2. 查阅`global.md`了解项目全局依赖和模式
3. 查阅特定文件的`.md`文档了解其逻辑和作用
4. 遵循文档中记录的设计模式和约定

## 规则结构

```
.cursor/
├── project/
│   ├── context.json                     # 项目技术环境信息
│   └── source-logic/
│       ├── global.md                    # 全局依赖关系和模式
│       └── files/                       # 文件逻辑文档
│           └── src/
│               ├── store/
│               │   ├── app.ts.md        # app store逻辑
│               │   ├── settings.ts.md   # settings store逻辑
│               │   └── data.ts.md       # data store逻辑
│               ├── hooks/
│               │   └── use-llm.ts.md    # LLM hook逻辑
│               └── providers/
│                   ├── app-providers.tsx.md  # 应用providers逻辑
│                   └── query-provider.tsx.md # Query provider逻辑
└── rules/                              # 规则定义
    └── project/
        └── project-context.mdc         # 项目上下文规则定义
``` 