# 综合案例

## myantd

基本 antd 4.0 二次封装的业务组件库。

文档请配合 antd 文档使用 [Ant Design](https://ant.design/components/overview-cn/)

## 使用方法

### 安装

以 yarn 为例

```sh
yarn add myantd
```

### 配置

.bablerc

### 使用

1、 使用包内的 `ConfigProvider` 组件对应用根节点组件进行包裹，修改全局组件命名空间为 `myantd`

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ConfigProvider } from 'myantd'

ReactDOM.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>,
  document.querySelect('#root')
)
```

2、这样引入组件即可，会按需加载基于 antd 定制过的组件

```js
import React from 'react'
import { Button } from 'myantd'

export default () => {
  return <Button type="primary">点我</Button>
}
```

3、此外 `myantd` 必须全量引入定制过的 `antd` 样式。

```js
import 'myantd/esm/styles/index.css'
```

PS：如果项目中已经有 antd 3.x 版本，请引入 myantd 所有组件样式。

```js
import 'myantd/esm/styles/styleWithoutGlobal.css'
```

譬如在umi项目中使用，定位global入口
```js
import React from 'react'
import { Button,ConfigProvider } from 'myantd';
// + import 'myantd/esm/styles/index.css'

export default function IndexPage() {
  return (
    <ConfigProvider>
      <h1>Page index</h1>
      <Button type="primary">button</Button>
    </ConfigProvider>
  );
}
```

## 如何开发 myantd

```sh
yarn

# 启动
yarn start

# 构建
yarn build
```

## 开发官网

在 src 文件中，修改组件，编写组件文档及单元测试。

# 发包流程

1. 提交代码

```shell
# 首先确认要提交的文件
git add .

# 运行提交命令
# 无add时，需要优化
yarn commit
# 或者
npm run commit

后续步骤同正常git代码提交流程

```

2. 发包

```shell
# 升级版本
yarn release
# 或者
npm run release
```

  <p align="center">
    <a><img src="https://img.shields.io/github/last-commit/zhoubichuan/web-react.svg"/></a>
    <a><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/></a>
    <a><img src="https://img.shields.io/github/issues/zhoubichuan/web-react.svg"/></a>
    <a><img src="https://img.shields.io/github/forks/zhoubichuan/web-react.svg"/></a>
    <a><img src="https://img.shields.io/github/stars/zhoubichuan/web-react.svg"/></a>
    <a><img src="https://img.shields.io/maintenance/yes/2020.svg"/></a>
  </p>

  <h1>web-react</h1>
  <p>在 <a href="https://zhoubichuan.github.io/web-react/">这里</a> 阅读体验更佳</p>
  <p>整理自各大技术社区和权威书籍的前端技术图谱</p>
</div>
