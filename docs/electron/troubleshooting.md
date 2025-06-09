# Electron 应用故障排除指南

本文档记录了在开发Electron应用过程中遇到的常见问题及其解决方案，以便团队成员参考。

## 目录
1. [HTML文件路径问题导致白屏](#html文件路径问题导致白屏)

---

## HTML文件路径问题导致白屏

### 问题描述

在重构项目结构时，将HTML文件从根目录移动到了`src/routes/app/`和`src/routes/runebar/`目录下，导致应用启动时出现白屏，控制台显示以下错误：

```
Electron Security Warning (Insecure Content-Security-Policy)
This renderer process has either no Content Security Policy set or a policy with "unsafe-eval" enabled. This exposes users of this app to unnecessary security risks.

Failed to load resource: the server responded with a status of 404 (Not Found) localhost/:1
```

### 原因分析

1. **Vite开发服务器配置问题**：
   - Vite和Electron Forge期望HTML入口文件位于项目根目录
   - 移动HTML文件后，开发服务器无法正确找到这些文件

2. **路径引用问题**：
   - `src/helpers/windows/config.ts`中的`getWindowHtmlFilename`函数返回的路径被更改
   - HTML文件中的脚本引用路径也被更新

### 解决方案

将HTML文件移回项目根目录，但保持以下结构优化：

1. **保留HTML文件在根目录**：
   - `index.html` - 主应用窗口入口
   - `runebar.html` - Runebar窗口入口

2. **保持渲染器文件在新位置**：
   - `src/routes/app/renderer.tsx` - 主应用窗口渲染器
   - `src/routes/runebar/renderer.tsx` - Runebar窗口渲染器
   - `src/routes/app/App.tsx` - 主应用窗口根组件
   - `src/routes/runebar/RunebarApp.tsx` - Runebar窗口根组件

3. **更新HTML文件中的脚本引用**：
   ```html
   <!-- index.html -->
   <script type="module" src="/src/routes/app/renderer.tsx"></script>

   <!-- runebar.html -->
   <script type="module" src="/src/routes/runebar/renderer.tsx"></script>
   ```

4. **更新配置文件**：
   - `src/helpers/windows/config.ts`中的`getWindowHtmlFilename`函数返回根目录路径
   - `vite.renderer.config.mts`中的入口点配置指向根目录的HTML文件

### 经验教训

1. **Electron和Vite的集成限制**：
   - Electron Forge与Vite的集成对HTML入口文件的位置有特定要求
   - 在开发模式下，HTML文件应保持在根目录，以便Vite开发服务器正确加载

2. **文件结构重构注意事项**：
   - 重构文件结构时，需要同时考虑构建工具和开发服务器的配置
   - 对于Electron应用，HTML入口文件和渲染进程的关系尤为重要

3. **渐进式重构**：
   - 可以保持HTML文件在根目录，同时将渲染器文件和组件移到更合理的位置
   - 这种妥协方案既满足了构建工具的要求，又改进了代码组织 