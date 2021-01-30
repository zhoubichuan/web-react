---
lang: zh-CN
sidebarDepth: 2
meta:
  - name: description
    content: 个人总结的vuepress学习技术文档-语法
  - name: keywords
    content: vuepress,最新技术文档,vuepress语法,markdown语法
---

# React 面向组件编程

## 2.1. 基本理解和使用
### React的特点
- 它使用虚拟DOM而不是真实DOM
- 它可以用服务端渲染
- 它遵循单项数据流或数据绑定
### React的一些优点
- 提高了应用的性能
- 可以方便地在客户端和服务器端使用
- 由于JSX,代码的可读性很好
- React很容易与其他框架集成
- 使用React，编写UI测试用例变得非常容易
## 2.2. 组件三大属性 1: state

## 2.3. 组件三大属性 2: props

## 2.4. 组件三大属性 3: refs 与事件处理

## 2.5. 组件的组合

## 2.6. 收集表单数据

## 2.7. 组件生命周期

## 2.8. 虚拟 DOM 与 DOM Diff 算法

### 区分 Real Dom 和 Virtual Dom

| Real Dom                     | Virtual Dom                |
| ---------------------------- | -------------------------- |
| 1.更新缓慢                   | 1.更新更快                 |
| 2.可以直接更新 HTML          | 2.无法直接更新 HTML        |
| 3.如果元素更新，则创建新 DOM | 3.如果元素更新，则更新 JSX |
| 4.DOM 操作代价很高           | 4.DOM 操作非常简单         |
| 5.消耗的内存较多             | 5.很少的内存消耗           |
### Virtual DOM的工作原理
- Virtual DOM是一个轻量级的JavaScript对象，它最初只是real DOM的副本。它是一个节点树，它将元素、它们的属性和内容作为对象及其属性。React的渲染函数从React组件中创建一个节点树。然后它响应数据模型中变化来更新该树，该变化时有用户或系统完成的各种动作引起的。
- 每当底层数据发生改变时，整个UI都将在Virtual DOM描述中重新渲染
- 然后计算之前DOM表示与新DOM之间的差异
- 完成计算后，将用实际更改的内容更新real DOM