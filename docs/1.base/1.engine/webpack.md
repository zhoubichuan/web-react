---
nav:
  title: 基本语法
  order: 2
group:
  title: React 的工程化流程
  order: 2
title: webpack 配置
order: 4
---

# 三.webpack 配置

## 1.react-app-rewired

通过 react 脚手架 create-react-app 创建了项目，但是发现了一个问题 如果没有执行 eject 命令的话 是没有其他配置文件的 这个时候就需要 用到 customize-cra 和 react-app-rewired 插件
然后在根目录下新建一个名称为 config-overrides.js 的文件

```bash
npm install react-app-rewired customize-cra --save-dev
```

::: tip
react-app-rewired 的作用就是在不 eject 的情况下,覆盖 create-react-app 的配置
:::
修改 package.json 中启动的配置

```js
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

项目根目录创建`config-overrides.js`

```js
module.exports = function override(config, env) {
  return config
}
// module.exports = {
//   webpack: (config) => {
//     config.output.library = `reactApp`
//     config.output.libraryTarget = "umd"
//     config.output.publicPath = "http://localhost:20000/"
//     return config
//   },
//   devServer: function(configFunction) {
//     return function(proxy, allowedHost) {
//       const config = configFunction(proxy, allowedHost)
//       config.headers = {
//         "Access-Control-Allow-Origin": "*",
//       }
//       return config
//     }
//   },
// }
```

## 2.按需加载 babel-plugin-import

babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件

- 安装

```bash
npm install babel-plugin-import --save-dev
```

```js
//引入
const { injectBabelPlugin } = require("react-app-rewired")
//使用
module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  )
  return config
}
```

然后在组件中就可以直接进行引用

```js
import { Button } from "antd"
```

## 3.安装 less

安装所需 less 依赖

```bash
npm install less-loader less --save-dev
```

- 安装 react-app-rewire-less

```bash
npm install --save-dev react-app-rewire-less
```

- config-overrides.js 修改配置

```js
const rewireLess = require("react-app-rewire-less")

config = rewireLess.withLoaderOptions({
  modifyVars: { "@primary-color": "#1DA57A" },
  javascriptEnabled: true,
})(config, env)
```

antd 在线换肤定制功能

```js
config = rewireLess.withLoaderOptions({
  modifyVars: getLessVars(path.join(__dirname, "./src/styles/vars.less")),
  javascriptEnabled: true,
})(config, env)
```

## 3.配置路径名别名

```js
const { override, addWebpackAlias} = require('customize-cra');
const path = require('path')

module.exports = override(
  addWebpackAlias({
    assets: path.resolve(**dirname, './src/assets'),
    pages: path.resolve(**dirname, './src/pages')
  })
);
```
