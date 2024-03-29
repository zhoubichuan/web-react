---
nav:
  title: 基础知识
  order: 1
group:
  title: React 功能模块
  order: 3
title: 多语言支持
order: 8
---

# 七.多语言支持

## 1.语言文件

`locale.json`

```json
{
  "en-us": {
    "appName": "React App Pro",
    "siderMenu_dashboard": "Dashboard",
    "siderMenu_analysis": "Analysis",
    ...
  },
  "zh-cn": {
    "appName": "React 中后台应用",
    "siderMenu_dashboard": "仪表盘",
    "siderMenu_analysis": "分析页",
    ...
  }
}
```

在存储方面对于追求开发效率的团队来说，将语言文件直接 commit 到项目的代码仓库是一种可行的做法。但如果有条件的话还是应该将下载语言文件这一步放在项目[持续集成](https://baike.baidu.com/item/%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90)的流程中，每一次构建项目时从存放语言文件的远端服务器拉取最新的版本，以保证发布到生产环境中的语言文件永远是最新的。

## 2.解决方案

**多语言版本切换**，也就是在同一个应用中支持用户切换产品的不同语言版本。

**多语言版本构建**，即将同一个应用打包成不同语言的版本，分别发布到不同的生产环境中，但在应用内部不支持多语言切换。

对于多语言版本切换来说，因为在运行时可能会用到所有不同的语言，所以建议将所有语言的翻译都存在同一个 JSON 文件中，这里我们暂且将它命名为 `locale.json`，并将不同语言的区域码设置为第一层的 key 值，第二层则为具体页面占位符的 key 值，命名时建议采取`页面_模块_值（login_loginPanel_usernameplaceholder）`的方式扁平化地存储这些值以加快查询时的速度。如果有跨平台需求的话，也可以在页面前面加上平台，如 `web_login_loginPanel_usernamePlaceholder`、`mobileWeb_login_loginPanel_usernamePlaceholder`，便于统一管理不同平台之间语言文件的 key 值。

对于多语言版本构建来说就没有必要把所有的语言翻译都存在一个文件中了，可以将不同的翻译分别存在各自的语言文件中。

`en-us.json`

```json
{
  "appName": "React App Pro",
  "siderMenu_dashboard": "Dashboard",
  "siderMenu_analysis": "Analysis",
  ...
}
```

`zh-cn.json`

```json
{
  "appName": "React 中后台应用",
  "siderMenu_dashboard": "仪表盘",
  "siderMenu_analysis": "分析页",
  ...
}
```

### 在应用构建过程中加载语言文件

准备好了语言文件，下一步就是将它集成到由 webpack 主导的应用构建过程中。

首先将语言文件 import 到 `webpack.config.js` 中，然后再通过 webpack 本身提供的 `webpack.DefinePlugin` 将它注入为应用的一个全局常量。

```js
const localeMessages = require("./src/i18n/locale.json")

new webpack.DefinePlugin({
  "process.env.BUILD_LOCALE_MESSAGES": JSON.stringify(localeMessages),
})
```

在这里，上面提到的多语言版本切换以及多语言版本构建的区别就体现出来了。对于多语言版本切换来说，像上面这样直接将唯一的语言文件注入为应用常量即可。但如果我们想要构建多个不同语言版本应用的话，又该怎么做呢？

为了解决这一问题，让我们再引入一个应用构建时的配置文件，称为 `buildConfig.js`。

```js
module.exports = {
  "PROD-US": {
    locale: "en-us",
  },
  "PROD-CN": {
    locale: "zh-cn",
  },
  localhost: {
    locale: "zh-cn",
  },
}
```

并在 `package.json` 中分别配置不同语言版本的构建命令。

```js
"scripts": {
  "build:PROD-US": "cross-env NODE_ENV=production BUILD_DOMAIN=PROD-US webpack -p --progress --colors",
  "build:PROD-CN": "cross-env NODE_ENV=production BUILD_DOMAIN=PROD-CN webpack -p --progress --colors",
}
```

这样就可以在 webpack 的配置中读取到当前要构建的目标版本语言，然后再据此去匹配相应的语言文件，如 `en-us.json`。

```js
const BUILD_DOMAIN = process.env.BUILD_DOMAIN || "localhost"
const config = buildConfig[BUILD_DOMAIN]
const localeMessages = require(`./src/i18n/${config.locale}.json`)

new webpack.DefinePlugin({
  "process.env.BUILD_LOCALE_MESSAGES": JSON.stringify(localeMessages),
})
```

### 在应用初始化时读取语言文件

在成功通过 webpack 将语言文件注入为全局常量后，我们就可以在应用中读取到构建时传入的语言文件了。这里为了方便其他文件引用构建配置及语言文件，我们可以提供一个统一的接口。

`src/app/config/buildConfig.js`

```js
const buildConfig = process.env.BUILD_CONFIG
const messages = process.env.BUILD_LOCALE_MESSAGES

export { messages, buildConfig }
```

`src/app/init/router.js`

```js
import { messages, buildConfig } from "../config/buildConfig"

const { locale } = buildConfig

const Router = (props) => (
  <ConnectedRouter history={props.history}>
    <MultiIntlProvider defaultLocale={locale} messageMap={messages}>
      ...
    </MultiIntlProvider>
  </ConnectedRouter>
)
```

### 在页面中注入翻译值

语言文件注入恰巧就是一个非常适合使用 Context API 来解决的用例，因为：第一，语言文件需要能够跨层级传递到每一个组件中因为每一个组件中都可能存在需要翻译的部分；第二，语言文件并不会经常更新。这里的不经常更新指的是在应用运行时而不是开发过程中不经常更新，于是也就避免了 Context 中的数据变化引起应用整体重绘所带来的性能问题。

让我们先来创建一个存放语言文件的 Context。

```js
import React from "react"

const { Provider, Consumer } = React.createContext({
  locale: "",
  messages: {},
  formatMessage: () => {},
})

export { Provider, Consumer }
```

再将通过 props 传入的国家码、语言文件及读取语言文件中某一个 key 值的函数注入到 Context 的 `value` 对象中。

```js
import { Provider } from "./IntlContext"

class IntlProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        locale: props.locale,
        messages: props.messages,
        formatMessage: this.formatMessage,
      },
    }
  }

  formatMessage = (config) => {
    const { id } = config
    const message = this.state.value.messages[id]

    if (message === undefined) {
      console.warn(
        `[react-intl-context]: Message key ${id} is undefined. Fallback to empty string.`
      )
      return ""
    }

    return message
  }

  render() {
    return <Provider value={this.state.value}>{this.props.children}</Provider>
  }
}
```

然后再写一个高阶组件作为 Context 的 Consumer。

```js
import React from "react"
import { Consumer } from "./IntlContext"

const injectIntl = (WrappedComponent) => {
  const InjectIntl = (props) => (
    <Consumer>
      {(value) => <WrappedComponent {...props} intl={value} />}
    </Consumer>
  )

  return InjectIntl
}

export default injectIntl
```

最后我们只需要将页面组件包裹在 `injectIntl` 这个高阶组件中，页面组件就可以多接收到一个名为 `intl` 的 props，直接调用 `this.props.intl.formatMessage` 并传入相应的占位符 key 值即可读取到语言文件中的相应翻译。

```js
import { injectIntl } from "react-intl-context"

class OutletDetail extends Component {
  render() {
    const { intl } = this.props

    return (
      <div className="view-outletDetail">
        <Button>
          {intl.formatMessage({ id: "outletDetail_showNotification" })}
        </Button>
      </div>
    )
  }
}

export default injectIntl(OutletDetail)
```