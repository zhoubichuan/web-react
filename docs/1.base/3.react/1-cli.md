---
nav:
  title: 基础知识
  order: 1
group:
  title: React 17.x 全家桶
  order: 2
title: 脚手架
order: 2
---

# 脚手架

## 1.用 react 脚手架快速搭建项目

```
npm install create-react-app -g
create-react-app my-project
cd my-project && npm start
```

- 系统会自动安装 React，react 由两部分组成
  - react.js 是 React 的核心库
  - react-dom.js 是提供与 dom 相关的功能，会在 window 下增加 ReactDOM 属性，内部比较重要的方法是 render，将 react 元素或者 react 组件插入到页面中
