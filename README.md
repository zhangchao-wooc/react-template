# React-template

## 模版内容
采用当前最新的版本进行构建，主体为
- react 18 + react-router
- mobx + mobx-react 作为状态管理器
- vite + vite-plugin-pages(自动生成路由)
- antd + less 的 UI 操作
- axios 接口请求
- husy + lint-stage + commitlint + eslint + prettier 校验代码、commit-msg 的提交规范及美化代码。保持团队代码风格与提交规范一致
- .vscode + editorconfig 对编辑器的风格配置，保持开发人团队的配置一致

## 模版依赖
语言选择
```js
"typescript": "^4.6.3",
```

web 框架
```js
"react": "^18.0.0",
"react-dom": "^18.0.0"
```

路由系统
```js
"react-router": "^6.3.0",
"react-router-dom": "^6.3.0"
```

接口请求
```js
"axios": "^0.27.2"
```

UI 框架
```js
"antd": "^4.20.5"
```

css 预编译器
```js
"less": "^4.1.2"                                  // 选择 less 是因为 antd 是以 less 作为底层 css 预编译器，可以更好的接入
```

状态管理
```js
"mobx": "^6.5.0",                                 // 状态管理器，使用装饰器的高级语法，使代码更简洁
"mobx-react": "^7.4.0"                            // 结合 mobx 使用的插件，使得 mobx 在 React 框架上可用
```

lint 工具
```js
"husky": "^8.0.1",                                 // 改写 githook 在指定阶段做处理，这里用作 pre-commit 前 lint 代码
"lint-staged": "^12.4.1",                          // 检查新增或更改的代码格式，而非全量检查，增加 lint 效率和速度
"prettier": "^2.6.2",                              // 代码风格美化
"eslint": "^8.15.0",                               // 代码风格检查
"eslint-config-prettier": "^8.5.0",                // eslint 与 prettier 相互融合的配置、插件
"eslint-plugin-prettier": "^4.0.0",
"eslint-plugin-react": "^7.30.0",                  // 针对 React 的 eslint 规则
"eslint-plugin-react-hooks": "^4.5.0"              // 针对 React-hooks 的 eslint 规则
"@commitlint/cli": "^17.0.0",                      // 校验 commit-msg 
"@commitlint/config-conventional": "^17.0.0",      // commit-msg 的规则库，如不喜欢可在 .commitlintrc 中配置自定义规则
```

类型文件
```js
"@types/node": "^17.0.34",
"@types/react": "^18.0.0",
"@types/react-dom": "^18.0.0",
"@typescript-eslint/eslint-plugin": "^5.25.0",
"@typescript-eslint/parser": "^5.25.0"
```

构建工具
```js
"vite": "^2.9.9",                                  // 利用 ESM 开发环境构建非常快，生产构建为 gulp
"@vitejs/plugin-react": "^1.3.0",                  // vite 官方插件，用于支持 React 框架构建
"vite-plugin-pages": "^0.23.0"                     // vite 官方插件，以文件系统的嵌套生成 React 或 Vue 的约定式的路由系统
```

## 目录结构
```js
.husky                         // husky 的配置文件
  _
    .gitignore
    husky.sh
  commit-msg                   // 在提交 commit 时校验提交信息的格式
  pre-commit                   // 在 commit 之前校验代码格式

.vscode                        // vscode 编辑器的配置文件，会覆盖本地配置
  settings.json               

config                         // 配置文件

src
  asset                        // 静态文件
  components                   // 全局组建
  models                       // 状态管理
  request                      // 请求配置
  views                        // 页面文件夹
    index.module.less          // 主页样式
    index.tsx                  // 主页文件
  index.css                    // 全局样式
  main.tsx                     // 入口文件
  vite-env.d.ts                // vite 生成的 env 配置文件的类型
.commitlintrc                  // commit 提交信息规则的配置文件
.editorconfig                  // 编辑器的配置文件
.eslintignore                  // eslint 忽略检查的配置文件
.eslintrc                      // eslint 的配置文件
.gitignore                     // git 忽略提交的配置文件
.prettierrc                    // prettier 的配置文件
index.html                     // 主文件模版
package-lock.json              // 依赖版本记录
package.json                   // 项目依赖配置文件
README.md                      // 项目介绍
tsconfig.json                  // ts 配置文件
tsconfig.node.json             // vite 生成的 node 配置
vite.config.ts                 // vite 配置文件
```
