# Button Component

**Path:** src/components/ui/button.tsx

## Component Overview

Button 组件是对 HTML 标准 `<button>` 元素的封装，提供了一系列预设样式和变体。该组件保留了原生按钮的所有功能，同时增加了设计系统中定义的视觉样式和行为。

**核心特性:**
- 基于 HTML 原生 button 元素，保留了所有原生属性和行为
- 提供多种视觉变体和尺寸选项
- 支持通过 `asChild` 属性实现组件组合模式

## Implementation Details

### 基础实现

Button 组件使用 `React.forwardRef` 转发引用到底层 DOM 元素。其核心实现原理是：
- 当 `asChild=false` (默认) 时，渲染为标准 HTML button 元素
- 当 `asChild=true` 时，使用 Radix UI 的 Slot 组件，将样式和行为应用到子组件

这种设计允许 Button 组件既可以作为独立按钮使用，也可以作为其他交互元素的样式容器使用。

### 变体系统

Button 组件提供六种视觉变体：
- `default`: 主要按钮样式，用于主要操作
- `destructive`: 危险操作按钮，通常用红色表示
- `outline`: 轮廓按钮，适用于次要操作
- `secondary`: 次要按钮，视觉重要性低于默认按钮
- `ghost`: 幽灵按钮，仅在悬停时显示背景
- `link`: 链接样式按钮，模拟超链接外观

以及四种尺寸变体：
- `default`: 标准尺寸
- `sm`: 小尺寸
- `lg`: 大尺寸
- `icon`: 图标按钮专用尺寸

## Usage Scenarios

Button 组件适用于：
- 表单提交
- 触发操作或事件
- 导航（当与链接组件结合使用时）
- 切换 UI 状态

## Technical Considerations

- **无障碍性**: 包含适当的焦点状态和禁用状态样式，支持键盘导航
- **组合模式**: 通过 `asChild` 属性支持组件组合，可以与其他交互元素结合使用
- **类型安全**: 使用 TypeScript 接口确保类型安全，提供完整的类型提示
- **样式封装**: 使用 cva 管理复杂的条件样式逻辑，保持样式的一致性和可维护性

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 