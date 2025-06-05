# Hotkey Helpers - 快捷键辅助工具

## 组件概述

**文件路径:** `src/helpers/hotkey_helpers.ts`  
**角色:** 工具函数 - 快捷键处理  
**层级:** 基础设施层

`hotkey_helpers.ts`提供了一系列辅助函数，用于处理应用中的快捷键操作，包括格式转换、快捷键冲突检测、显示格式化等功能。这些工具函数为应用中的快捷键系统提供了基础支持，使快捷键处理更加标准化和简洁。

## 核心功能

- 快捷键格式的规范化和转换
- 快捷键冲突检测
- 用户界面显示格式化
- Electron与Web格式快捷键的互相转换

## 实现细节

### 快捷键格式处理

- `normalizeKeyCombo`: 将人类可读的快捷键格式转换为标准格式
- `buildKeyComboFromEvent`: 从键盘事件构建标准化的快捷键字符串
- `convertElectronToWebShortcut`: 将Electron格式快捷键转换为Web格式
- `convertWebToElectronShortcut`: 将Web格式快捷键转换为Electron格式

### 辅助功能

- `isSystemShortcut`: 检测快捷键是否为系统保留快捷键
- `formatHotkeyForDisplay`: 将快捷键格式化为适合显示的形式
- `isHotkeyConflict`: 检测两个快捷键是否冲突

## 与其他模块的关系

- 依赖`utils/platform.ts`获取平台信息
- 与`ShortcutManager`协同工作，为全局快捷键管理提供支持
- 为React钩子如`useHotkeys`提供底层功能支持

## 使用场景

- 在UI中显示格式化的快捷键
- 检测和防止快捷键冲突
- 转换不同系统间的快捷键格式
- 处理键盘事件和快捷键触发

## 技术考量

- **跨平台兼容性:** 处理不同操作系统平台上的快捷键差异
- **标准化:** 提供统一的快捷键格式和处理方法
- **用户体验:** 支持符合平台习惯的快捷键显示
- **可维护性:** 集中化的快捷键处理逻辑，避免重复代码

## 开发者注释

- 遵循函数式编程风格，提供纯函数以便于测试和组合
- 快捷键格式统一使用标准化的格式，如`Control+Shift+KeyA`
- 平台特定的快捷键显示会根据当前操作系统自动调整 