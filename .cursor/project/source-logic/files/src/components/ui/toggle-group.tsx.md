# Toggle Group Component

**Path:** src/components/ui/toggle-group.tsx

## Component Overview

ToggleGroup 组件是对 Radix UI 的 ToggleGroup 原语的封装，提供了一组可以单选或多选的切换按钮。该组件构建在 Toggle 组件的基础上，使用 React Context 共享样式变体和尺寸属性。

**核心特性:**
- 基于 Radix UI 的 ToggleGroup 原语，提供无障碍的分组切换功能
- 支持单选（type="single"）和多选（type="multiple"）模式
- 通过 Context API 在组和子项之间共享样式属性
- 保持与 Toggle 组件的视觉一致性

## Implementation Details

### 基础实现

ToggleGroup 组件由两个主要部分组成：
- `ToggleGroup`：容器组件，管理整体布局和共享上下文
- `ToggleGroupItem`：单个切换项，继承 Toggle 组件的功能

其核心实现原理是：
- 创建 Context 来共享样式变体和尺寸
- ToggleGroup 提供 Context 值
- ToggleGroupItem 消费 Context 值，应用到各个切换项

### 上下文共享

ToggleGroup 使用 React Context 在父组件和子组件之间共享样式属性，这使得：
- 所有子项默认继承父组件的样式变体和尺寸
- 单个子项可以覆盖继承的样式，实现特殊样式需求
- 减少重复的样式属性传递

## Usage Scenarios

ToggleGroup 组件适用于：
- 分段控制器（Segmented Controls）
- 工具栏中的相关选项组
- 视图切换控件
- 筛选选项组
- 单选或多选设置组

## Technical Considerations

- **无障碍性**: 基于 Radix UI 的实现，提供完整的键盘导航和屏幕阅读器支持
- **状态管理**: 使用 Radix UI 的内置状态管理处理选择状态
- **样式一致性**: 通过 Context 确保组内所有切换项的样式一致性
- **布局控制**: 默认使用 flex 布局，带有预设的间距
- **组合模式**: 遵循组合组件模式，分离容器和项目职责

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 