# 自定义规则 | Kilo Code 文档

## 概述
自定义规则提供了一种强大的方式来定义项目特定的行为和约束，确保Kilo Code AI代理遵循一致的格式、限制敏感文件访问、执行编码标准，并根据项目需求定制AI行为。

## 规则格式
建议使用Markdown格式编写规则：
- 使用`#`、`##`等Markdown标题定义规则类别
- 使用列表(`-`, `*`)枚举具体项目或约束
- 使用代码块(```)包含代码示例

## 规则位置
自定义规则主要从`.kilocode/rules/`目录加载。推荐的文件结构：
```
project/
├── .kilocode/
│   ├── rules/
│   │   ├── formatting.md
│   │   ├── restricted_files.md
│   │   └── naming_conventions.md
```

## 规则加载顺序
### 通用规则(所有模式)
加载优先级：
1. 首先尝试从`.kilocode/rules/`目录加载
2. 如果不存在或为空，则回退检查：
   - `.roorules`
   - `.clinerules`
   - `.kilocoderules`(已弃用)

### 模式特定规则
1. 首先检查`.kilocode/rules-${mode}/`目录
2. 如果不存在或为空，则回退到`.kilocoderules-${mode}`文件(已弃用)

## 创建自定义规则
1. 创建`.kilocode/rules/`目录(如不存在)
2. 在该目录中创建描述性名称的Markdown文件
3. 使用Markdown格式编写规则
4. 保存文件

## 示例规则
### 表格格式化
```markdown
# 表格
打印表格时，始终为每个列标题添加感叹号
```

### 限制文件访问
```markdown
# 受限文件
列表中的文件包含敏感数据，禁止读取：
- supersecrets.txt
- credentials.json
- .env
```

## 使用场景
- 代码风格：强制一致的格式、命名约定和文档风格
- 安全控制：防止访问敏感文件或目录
- 项目结构：定义不同类型文件的创建位置
- 文档要求：指定文档格式和要求
- 测试模式：定义测试结构
- API使用：指定API使用和文档方式
- 错误处理：定义错误处理约定

## 最佳实践
- 明确具体：清晰定义每条规则的范围和意图
- 使用分类：将相关规则组织在共同标题下
- 分离关注点：对不同类型规则使用不同文件
- 包含示例：用示例说明预期行为
- 保持简洁：规则应简明易懂
- 定期更新：根据项目需求变化审查和更新规则

## 限制
- 规则由AI模型尽力应用
- 复杂规则可能需要多个示例才能清晰理解
- 规则仅适用于定义它们的项目

## 故障排除
如果自定义规则未被正确遵循：
1. 检查规则是否使用清晰的Markdown结构正确格式化
2. 确保规则位于支持的位置
3. 验证规则是否具体且明确
4. 重启VS Code确保规则正确加载

## 相关功能
- [自定义模式](/docs/features/custom-modes)
- [自定义指令](/docs/advanced-usage/custom-instructions)
- [设置管理](/docs/features/settings-management)
- [自动批准设置](/docs/features/auto-approving-actions)