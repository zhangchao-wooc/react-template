// commit-msg 的检查工具。默认规则如下
// build
// chore
// ci
// docs
// feat
// fix
// perf
// refactor
// revert
// style
// test

module.exports = {
  extends: ['@commitlint/config-conventional']
  // 可自定义规则, 在 extends 下添加如下配置, 具体规则可见官方文档： https://commitlint.js.org/#/guides-local-setup
  // rules: {
  //   'feature': [0, 'always', 72],
  // }
}
