# Toggle Component

**Path:** src/components/ui/toggle.tsx

## Component Overview

Toggle 组件是对 Radix UI 的 Toggle 原语的封装，提供了一个可以在开启和关闭状态之间切换的交互元素。该组件保留了原生 Toggle 的所有功能，同时增加了设计系统中定义的视觉样式。

**核心特性:**
- 基于 Radix UI 的 Toggle 原语，提供无障碍的状态切换功能
- 提供多种视觉变体和尺寸选项
- 支持通过数据属性实现状态样式变化

## Implementation Details

### 基础实现

Toggle 组件使用 `React.forwardRef` 转发引用到底层 Radix UI Toggle 组件。其核心实现原理是：
- 使用 Radix UI 的 Toggle.Root 组件作为基础
- 应用通过 cva 定义的样式变体
- 根据组件状态（开/关）应用不同的样式

这种设计确保了组件的可访问性，同时保持了与设计系统的视觉一致性。

### 变体系统

Toggle 组件提供两种视觉变体：
- `default`: 默认样式，无边框
- `outline`: 带边框样式，适用于需要更明显边界的场景

以及三种尺寸变体：
- `default`: 标准尺寸
- `sm`: 小尺寸
- `lg`: 大尺寸

## Usage Scenarios

Toggle 组件适用于：
- 开关设置选项
- 切换功能的启用/禁用状态
- 选择/取消选择单个选项
- 工具栏中的切换按钮

## Technical Considerations

- **无障碍性**: 基于 Radix UI 的实现，提供完整的键盘导航和屏幕阅读器支持
- **状态管理**: 使用 data 属性（`data-[state=on]`）来管理不同状态的样式
- **类型安全**: 使用 TypeScript 接口确保类型安全，提供完整的类型提示
- **样式封装**: 使用 cva 管理条件样式逻辑，保持样式的一致性

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 