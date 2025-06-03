# Language Management Helpers

**Path:** src/helpers/language_helpers.ts

## Component Overview

language_helpers.ts 提供了一组用于管理应用程序语言设置的辅助函数。它处理语言的设置和更新，确保语言偏好在本地存储和 i18next 实例之间保持同步，并更新文档的语言属性。

**核心特性:**
- 应用程序语言设置
- 语言偏好的本地存储
- 与 i18next 国际化库的集成
- HTML 文档语言属性更新

## Implementation Details

### 语言管理函数

文件导出了两个关键函数：

1. `setAppLanguage`: 设置应用程序的语言
   - 将语言代码保存到本地存储
   - 更新 i18next 实例的语言
   - 更新 HTML 文档的 lang 属性

2. `updateAppLanguage`: 从本地存储加载并应用语言设置
   - 检查本地存储中是否有保存的语言偏好
   - 如果有，则应用该语言设置
   - 更新 i18next 实例和 HTML 文档的语言

### 持久化

函数使用 localStorage 的 "lang" 键来存储用户的语言偏好，确保应用程序在重新启动后能够恢复用户的语言设置。

### 与 i18next 的集成

函数接受 i18next 的 i18n 实例作为参数，通过调用 `i18n.changeLanguage()` 方法来更改应用程序的当前语言。

## Usage Scenarios

language_helpers.ts 中的函数用于：
- 应用程序启动时恢复用户的语言偏好
- 响应用户语言切换请求
- 确保整个应用程序使用一致的语言设置

## Technical Considerations

- **持久化**: 使用 localStorage 存储用户的语言偏好
- **i18next 集成**: 与 i18next 国际化库无缝集成
- **HTML 语言标记**: 更新文档的 lang 属性，提升无障碍性和搜索引擎优化
- **优雅降级**: 当没有保存的语言偏好时，不执行任何操作（可能使用 i18next 的默认语言）

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 