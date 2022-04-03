---
nav:
  title: 基本语法
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: React(函数组件)
order: 6
---

# 二.React(函数组件)

## 1.什么是 React

- React 是一个用于构建用户界面的 javascript 库，核心专注于视图，目的实现组件化开发

## 2.组件化的概念

### 我们可以很直观的将一个复杂的页面分割成若干个独立的组件，每个组件包含自己的逻辑和样式，在将这些独立的组件完成一个复杂的页面，这样既减少了逻辑复杂度，又实现了代码的重用

- 可组合：一个组件可以和其他组件一起使用或者可以直接嵌套在另一个组件内部
* 可重用：每个组件都是具有独立功能的，他可以被使用在多个场景中
* 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护

## 3.react 开发环境

### 1.用 react 脚手架快速搭建项目

```
npm install create-react-app -g
create-react-app my-project
cd my-project && npm start
```

- 系统会自动安装 React，react 由两部分组成
  - react.js 是 React 的核心库
  - react-dom.js 是提供与 dom 相关的功能，会在 window 下增加 ReactDOM 属性，内部比较重要的方法是 render，将 react 元素或者 react 组件插入到页面中

## 4.jsx

- jsx 是一种 js 和 html 混合的语法，将组件的结构、数据甚至样式都聚合在一起定义组件，会编译成普通的 javascript.需要注意的是 jsx 并不是 html，在 jsx 中属性不能包含关键字，像 class 需要写成 className，for 需要写成 htmlFor,并且属性名需要采用驼峰命名法。

## 5.createElement

- jax 其实只是一种语法糖，最终会通过 babel 转译成 creactElement 语法

```js
ReactDOM.render(<div>上,<span>下</span></div>)
```

等同

```js
ReactDOM.render(React.createElement("div",null,"上",React.createElement("span",null,"下")))
```

- 一般使用 React.createElement 来创建一个虚拟 dom 元素

## 6.react 元素/jsx 元素

```js
function ReactElement(type,props){
    this.type=type
    this.props=props
}
let React={
    createElement(type,props={},...childrens){
        childrens.length===1?childrens=childrens[0]:void 0
        return new ReactElement(type,{...props,children:childrens})
    }
}
```

ReactElement 就是虚拟 dom 的概念，具有一个 type 属性代表当前的节点类型，还有节点的属性 props

## 7.模拟 render 实现

## 8.jsx 表达式的用法

## 9.jsx 属性

## 10.组件的特点声明方式

## 11.组件的两种定义方式

## 12.组件中属性和状态的区别

## 13.绑定事件

## 14.属性校验，默认属性

## 15.状态的使用

## 16.复合组件

## 17.受控组件和非受控组件

## 1.React 生命周期

## 2.使用 PropTypes 进行类型检查

## 3.性能优化

## 4.使用 Chrome 性能分析工具

## 5.避免重复渲染

## 6.Reconciliation

## 7.上下文

## 8.片段

## 9.插槽

## 10.错误边界

## 11.高阶组件

## 1.React 路由

## 2.跑通路由

## 3.实现基本路由

## 4.path-to-regexp

## 5.正则匹配路径

## 6.exact 精确匹配

## 7.Link

## 8.Redirect && Switch

## 9.页面跳转

## 10.受保护的路由

## 11.自定义导航

## 12.防止跳转
