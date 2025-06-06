# Runebar TODO 列表

## 主进程和渲染进程代码隔离

### 问题背景
在尝试解决 main 和 runebar 界面 theme 不同步问题时，遇到了渲染进程尝试直接使用 Electron API 的问题。这是因为主进程代码和渲染进程代码没有被正确隔离。

### 临时解决方案
1. ✅ 修改 `vite.renderer.config.mts`，添加 `external: ['electron', ...builtinModules]` 配置
2. ✅ 修改 `src/helpers/theme/index.ts`，不再导出 `theme_manager.ts`
3. ✅ 更新主进程代码，直接从源文件导入 `ThemeManager`

### 长期解决方案
1. 重构项目结构，明确分离主进程和渲染进程代码
   - [ ] 创建 `src/main/` 目录存放主进程代码
   - [ ] 创建 `src/renderer/` 目录存放渲染进程代码
   - [ ] 创建 `src/preload/` 目录存放预加载脚本
   - [ ] 创建 `src/shared/` 目录存放共享类型和常量

2. 建立严格的依赖管理
   - [ ] 确保主进程代码只在主进程中运行
   - [ ] 确保渲染进程代码不直接依赖 Node.js 和 Electron 主进程 API
   - [ ] 通过预加载脚本和 IPC 通信在进程间传递数据和操作

3. 编译时检查
   - [ ] 添加 ESLint 规则检查不恰当的导入
   - [ ] 设置编译时检查，确保渲染进程不依赖主进程 API

### 具体任务
1. [ ] 创建新的目录结构
2. [ ] 迁移主进程代码到 `src/main/` 目录
3. [ ] 迁移渲染进程代码到 `src/renderer/` 目录
4. [ ] 迁移预加载脚本到 `src/preload/` 目录
5. [ ] 提取共享类型和常量到 `src/shared/` 目录
6. [ ] 更新构建配置以适应新的目录结构
7. [ ] 添加编译时检查规则 