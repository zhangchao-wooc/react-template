# React-template
react 框架模板

## 配置策略
所有配置均跟随项目文件而不依赖本地配置，以防每人本地配置不同而造成的项目冲突或事故。同时，所有配置文件跟随项目也减轻了协作开发人员的本地配置问题。  
常见的跟随项目配置有以下几种
- 编辑器配置
- 代码校验配置
- 代码风格配置
- 镜像源配置
- 包管理器配置
- git 规范配置

## 项目启动
```js
npm install     // 安装依赖
npm run prepare // 生成 husky 的 shell 执行文件
npm run dev     // 启动项目
```
#### Tips：
- husky 生成的 shell 文件会被自带的 .ignore 自动忽略上传, 如果你需要也可以删除此文件，将 shell 上传至 git 仓库

## 模版内容

采用当前最新的版本进行构建，主体为

- react 19 + react-router + react-router-dom
- mobx + mobx-react 作为状态管理器
- vite + vite-plugin-pages（自动生成路由）
- antd 6 + @ant-design/icons 的 UI
- i18n 使用 BCP 47 标准
- React Compiler + Rolldown Babel 编译链
- axios 接口请求
- husky + lint-staged + commitlint + eslint + stylelint + prettier 校验代码、commit-msg 的提交规范及美化代码。保持团队代码风格与提交规范一致
- .vscode + editorconfig 对编辑器的风格配置，保持开发团队的配置一致

## 模版依赖

语言选择
```js
"typescript": "^6.0.3"
```

web 框架
```js
"react": "^19.2.7",
"react-dom": "^19.2.7"
```

路由系统
```js
"react-router": "^8.2.0",
"react-router-dom": "^7.18.1"
```

接口请求
```js
"axios": "^1.18.1"                                // 基于 XMLHttpRequest 封装的请求库
```

UI 框架
```js
"antd": "^6.5.1",                                 // Ant Design UI 库
"@ant-design/icons": "^6.3.2"                     // antd 的图标库
```

css
```js 
"normalize.css": "^8.0.1"                         // 重置 css 默认样式
```

状态管理
```js
"mobx": "^6.16.1",                                // 状态管理器，使用装饰器的高级语法，使代码更简洁
"mobx-react": "^9.2.2"                            // 结合 mobx 使用的插件，使得 mobx 在 React 框架上可用
```

lint 工具
```js
"husky": "^9.1.7",                                 // 改写 git hook，在提交阶段执行校验
"lint-staged": "^17.0.8",                          // 仅检查新增或更改的文件
"prettier": "^3.9.5",                              // 代码格式化
"eslint": "^9.7.0",                                // JavaScript/TypeScript 代码检查
"eslint-config-prettier": "^10.1.8",               // 关闭与 Prettier 冲突的 ESLint 规则
"eslint-plugin-prettier": "^5.5.6",
"eslint-plugin-react": "^7.37.5",                  // React 代码检查
"eslint-plugin-react-hooks": "^7.1.1",             // React Hooks 代码检查
"@typescript-eslint/eslint-plugin": "^8.62.0",
"@typescript-eslint/parser": "^8.62.0",
"@commitlint/cli": "^21.2.1",                      // 校验 commit-msg
"@commitlint/config-conventional": "^21.2.0",      // Conventional Commits 规则
"stylelint": "^17.14.0",                           // CSS 代码检查
"stylelint-config-standard": "^40.0.0"             // Stylelint 标准规则
```

类型文件
```js
"@types/lodash-es": "^4.17.12",
"@types/node": "^26.1.1",
"@types/react": "^19.2.17",
"@types/react-dom": "^19.2.3"
```

构建工具
```js
"vite": "^8.1.5",                                  // 开发服务器和生产构建工具
"@vitejs/plugin-react": "^6.0.3",                  // Vite 官方 React 插件
"vite-plugin-pages": "^0.33.3",                    // 基于文件系统生成路由
"@rolldown/plugin-babel": "^0.2.3",                // 在 Vite 构建链中运行 Babel
"@babel/plugin-proposal-decorators": "^8.0.2",     // 支持 legacy decorators
"babel-plugin-react-compiler": "^1.0.0"            // React Compiler Babel 插件
```

开发工具库
```js
"dayjs": "^1.11.21",                               // 日期时间工具库
"lodash-es": "^4.18.1"                             // 方法库
```

多语言方案
```js
"react-i18next": "^17.0.10",                       // i18next 的 React 集成
"i18next": "^26.3.6",                              // i18next core 包
"i18next-browser-languagedetector": "^8.2.1"       // 浏览器语言探测
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

env                            // 环境变量文件夹
  .env                         // 公共变量。所有模式都会加载
  .env.development             // npm run dev. 开发环境变量文件，会覆盖 .env 中同名变量
  .env.production              // npm run build. 生产环境变量文件，会覆盖 .env 中同名变量
  .env.staging                 // npm run staging 预发环境变量文件，会覆盖 .env 中同名变量

public
  locales                      // 构建时原样复制的多语言 JSON 文件

src
  assets                       // 静态文件
    img                        // 图片
  styles                       // 全局样式文件
    global.css                 // 全局样式文件
  components                   // 全局组建
  layout                       // 布局
  i18n.ts                      // i18next 初始化配置
  request                      // 请求配置
  store                        // 状态管理
  utils                        // 公共方法
  views                        // 页面文件夹
    home                       
    list
    index.tsx                  // 入口页面文件
  main.tsx                     // 入口文件
  vite-env.d.ts                // vite 生成的 env 配置文件的类型
.commitlintrc.js               // commit 提交信息规则的配置文件
.editorconfig                  // 编辑器的配置文件
eslint.config.mjs              // ESLint flat config
.gitignore                     // git 忽略提交的配置文件
.npmrc                         // npm 镜像源
.prettierrc                    // prettier 的配置文件
.stylelintrc                   // stylelint 配置文件
index.html                     // 主文件模版
package-lock.json              // 依赖版本记录
package.json                   // 项目依赖配置文件
README.md                      // 项目介绍
tsconfig.json                  // ts 配置文件
tsconfig.node.json             // vite 生成的 node 配置
vite.config.ts                 // vite 配置文件
```

## 可能出现的问题
#### 1、接口请求多次
模版中开启了 React 的严格模式，接口请求多次情况只发生在本地调试时，线上版本则无此情况。如关闭严格模式，可在 /react-template/src/main.tsx 中注释掉或删除代码。 如下所示
```js
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider {...store}>
      <Router>
        <ConfigProvider locale={zhCN}>
          <LayoutPage>
            <App />
          </LayoutPage>
        </ConfigProvider>
      </Router>
    </Provider>
  // </React.StrictMode>
)

```
