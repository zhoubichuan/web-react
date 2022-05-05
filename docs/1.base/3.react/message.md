---
nav:
  title: 基础知识
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: React(组件间通信)
order: 4
---

# React(组件间通信)

<Alert type="info"> 前言

</Alert>

## 1.父组件向子组件通信

- 父组件通过 props 向子组件传递数据

## 2.子组件向父组件通信

```jsx
import React, { Component } from "react"
class Child extends Component {
  state = {
    name: "小明",
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.getChildData(this.state.name)}>
          子组件按钮
        </button>
      </div>
    )
  }
}
export default class Parent extends Component {
  state = {
    name: "",
  }
  getChildData = (childData) => {
    this.setState({
      name: childData,
    })
  }
  render() {
    return (
      <div>
        <p>父组件接收到的数据：{this.state.name}</p>
        <Child getChildData={this.getChildData}></Child>
      </div>
    )
  }
}
```

- 父组件通过 props 向子组件传递函数，子组件通过函数传递数据给父组件，父组件通过函数回调拿到子组件数据

## 3.跨级组件通信

- context
- 层层传递 props

## 4.非嵌套组件通信

- 通过共同父组件传递数据
- 全局发布订阅模式
