# Navigation Menu Component

**Path:** src/components/ui/navigation-menu.tsx

## Component Overview

Navigation Menu 组件是对 Radix UI 的 NavigationMenu 原语的封装，提供了一个可访问的导航菜单系统，适用于网站的主导航和复杂的多级菜单结构。该组件保留了原生 NavigationMenu 的所有功能，同时增加了设计系统中定义的视觉样式。

**核心特性:**
- 基于 Radix UI 的 NavigationMenu 原语，提供无障碍的导航功能
- 支持多级导航结构
- 包含视口容器，用于显示下拉内容
- 提供动画和过渡效果
- 包含指示器，显示当前活动项

## Implementation Details

### 组件结构

Navigation Menu 组件由多个子组件组成，形成一个完整的导航系统：

- `NavigationMenu`: 根容器组件
- `NavigationMenuList`: 导航项目列表
- `NavigationMenuItem`: 单个导航项
- `NavigationMenuTrigger`: 触发下拉菜单的按钮
- `NavigationMenuContent`: 下拉菜单内容
- `NavigationMenuLink`: 导航链接
- `NavigationMenuViewport`: 下拉内容的视口容器
- `NavigationMenuIndicator`: 当前选中项的指示器

### 与 Web 标准的关系

该组件实现了 WAI-ARIA 导航菜单设计模式，提供了键盘导航和屏幕阅读器支持。它扩展了标准的 HTML 导航元素，增加了更丰富的交互功能。

### 样式和动画

组件使用 cva 定义了导航菜单触发器的样式变体，并使用 CSS 数据属性（data-[state]）来应用不同状态的样式。动画效果通过 CSS 过渡和 Radix UI 的动画属性实现。

## Usage Scenarios

Navigation Menu 组件适用于：
- 网站主导航
- 应用程序的顶部导航栏
- 包含多级结构的复杂导航系统
- 需要下拉菜单的导航界面
- 需要无障碍支持的导航元素

## Technical Considerations

- **无障碍性**: 完全支持键盘导航，包括方向键、Enter 和 Escape 键；提供适当的 ARIA 属性和角色
- **动态内容**: 视口容器动态调整大小以适应内容
- **动画**: 包含进入和退出动画，提升用户体验
- **响应式**: 在移动设备上可以适当调整布局
- **组合模式**: 遵循组合组件模式，允许灵活构建导航结构

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 