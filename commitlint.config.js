module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 可以自定义规则
    "body-max-line-length": [0, "always"], // 禁用正文行长度限制
    "footer-max-line-length": [0, "always"], // 禁用页脚行长度限制
  },
}
