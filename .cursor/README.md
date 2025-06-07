# Cursor规则

本文档介绍了Runebar项目中使用的Cursor规则，帮助AI助手更好地理解和处理代码。

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