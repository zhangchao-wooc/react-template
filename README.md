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
- react 18 + react-router
- mobx + mobx-react 作为状态管理器
- vite + vite-plugin-pages(自动生成路由)
- antd + @ant-design/icons + less 的 UI 
- axios 接口请求
- husky + lint-stage + commitlint + eslint + stylelint + prettier 校验代码、commit-msg 的提交规范及美化代码、stylelint 规范样式代码。保持团队代码风格与提交规范一致
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
"axios": "^0.27.2"                                // 基于 XHRrequest 封装的请求库，后续考虑使用 fetch 替代
```

UI 框架
```js
"antd": "^5.1.7",                                // Ant Design UI 库
"@ant-design/icons": "^4.7.0",                    // antd 的图标库
```

css
```js 
 "normalize.css": "^8.0.1",                       // 重置 css 默认样式
"less": "^4.1.2"                                  // 选择 less 是因为 antd 是以 less 作为底层 css 预编译器，可以更好的接入和自定义主题
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
"stylelint": "^14.12.1",                           // 校验 css 的规则库
"postcss-less": "^6.0.0",                          // 配合校验 less 文件 同类型的还有 postcss-scss 等
"stylelint-config-prettier": "^9.0.3",             // 配合 prettier 使用
"stylelint-config-standard": "^28.0.0",            // stylelint 的标准规则库，也可自定义规则覆盖标准库规则
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
"vite": "^4.1.0",                                  // 利用 ESM 开发环境构建非常快，生产构建为 gulp
"@vitejs/plugin-react": "^1.3.0",                  // vite 官方插件，用于支持 React 框架构建
"vite-plugin-pages": "^0.23.0"                     // vite 官方插件，以文件系统的嵌套生成 React 或 Vue 的约定式的路由系统
```

开发工具库
```js
"dayjs": "^1.11.5",                                // moment 的替代方案，antd 5 的时间处理方案
"lodash": "^4.17.21",                              // 方法库
```

多语言方案
```js
"react-i18next": "^12.1.4"                         // i18next 的 react 版
"i18next": "^22.4.9",                              // i18next core 包
"i18next-browser-languagedetector": "^7.0.1",      // 浏览器多语言
"i18next-http-backend": "^2.1.1",                  // 远程多语言方案
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

src
  assets                       // 静态文件
    img                        // 图片
    styles                     // 全局样式文件
      global.less              // 全局样式文件
  components                   // 全局组建
  layout                       // 布局
  locales                      // 多语言文件
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
.eslintignore                  // eslint 忽略检查的配置文件
.eslintrc                      // eslint 的配置文件
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
#### 1、安装 @ant-design/pro-layout

@ant-design/pro-layout 内部 less 以 ～ 形式引入，vite 不支持该种方式的解析。

> 解决方式
```js
// vite.config.ts 中添加以下配置
resolve: {
  alias: [
    { find: /^~/, replacement: '' },
  ]
},
css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // antd 的引入也需要开启此项
        additionalData: '@root-entry-name: default;' 
      }
    }
  },
```
不使用 对象形式配置 alias 的原因是：别名只能以字符串形式匹配，而不能以正则形式匹配，不适合复杂场景

#### 2、vite-plugin-pages
问题1中将 ～ 替换为 '' 影响了 vite-plugin-pages 在 react 框架中的默认路由 '~react-pages' 的引入。导致自动生成的路由无法正确引入，路由系统瘫痪。

解决方式
```js
// vite.config.ts 中添加以下配置

plugins: [
  Pages({
    // 默认 ～react-pages 与 @ant-design/pro-layout 的 less 引入方式重合, 在解决 @ant-designpro-layout 的 less 引入方式时会影响
    // 其他以 ～ 引入方式的包，故改为 @@ 开头
    moduleId: '@@react-pages'
  }),
],

// index.tsx 主页面引入方式
import routes from '@@react-pages'

```

3、接口请求多次  
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
