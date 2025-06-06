# platform - 平台检测工具

## 组件概述

**文件路径:** `src/utils/platform.ts`  
**角色:** 工具函数库 - 平台检测  
**层级:** 基础设施层

`platform.ts`提供了一组用于检测和处理不同操作系统平台特性的工具函数。它为整个应用提供了统一的平台感知能力，使得其他组件可以根据运行环境调整行为，确保跨平台一致性。

## 核心功能

- 操作系统平台检测(macOS、Windows、Linux)
- 架构检测(x64、arm64等)
- Electron运行环境检测(主进程、渲染进程)
- 平台特定功能的条件性执行

## 实现细节

### 平台检测函数

- `isMacOS()`: 检测当前是否运行在macOS平台
- `isWindows()`: 检测当前是否运行在Windows平台
- `isLinux()`: 检测当前是否运行在Linux平台
- `getPlatform()`: 返回当前平台的标识字符串

### 环境检测函数

- `isMainProcess()`: 检测代码是否在Electron主进程中运行
- `isRendererProcess()`: 检测代码是否在Electron渲染进程中运行
- `isDevMode()`: 检测应用是否在开发模式下运行

### 平台信息

- 关于当前平台的详细信息(版本、架构等)
- 平台特定路径和位置的标准化
- 平台特定功能的可用性检测

## 与其他模块的关系

- 被`hotkey_helpers.ts`用于处理平台特定的快捷键差异
- 被`ShortcutManager`用于根据平台调整全局快捷键行为
- 可以被UI组件用于调整平台特定的显示和行为
- 被应用配置系统用于加载平台特定的设置

## 使用场景

- 调整键盘快捷键以适应不同平台的约定
- 处理平台特定的文件路径和系统接口
- 根据平台调整UI元素的布局和样式
- 启用/禁用特定平台上的专有功能

## 技术考量

- **性能优化:** 缓存平台检测结果，避免重复检测
- **可靠性:** 使用最可靠的方法检测平台，处理边缘情况
- **跨环境兼容:** 同时适用于主进程和渲染进程
- **可测试性:** 支持在测试环境中模拟不同平台

## 开发者注释

- 所有平台特定的逻辑应使用这些工具函数，而不是直接检测`process.platform`
- 通过集中化平台检测，简化了跨平台测试和维护
- 避免在代码中散布平台检测逻辑，提高代码可维护性
- 添加新的平台检测逻辑时，应在此模块中实现 