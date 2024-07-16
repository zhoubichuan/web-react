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

# 组件通信

<Alert type="info"> 前言

</Alert>

## 1.父子组件

### 1.1 props

### 1.2 实例方法

- 父组件通过 props 向子组件传递数据

## 2.子组件向父组件通信

### 2.1 回调函数

### 2.2 事件冒泡

```jsx
import React, { Component } from 'react'
class Child extends Component {
  constructor(props){
    super(props)
    this.  state = {
      name: '小明'
    }
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
class Parent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }
  getChildData = childData => {
    this.setState({
      name: childData
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
export default Parent
```

- 父组件通过 props 向子组件传递函数，子组件通过函数传递数据给父组件，父组件通过函数回调拿到子组件数据

## 3.兄弟组件

### 3.1 父组件

- context
- 层层传递 props

## 4.任意组件

### 4.1 观察者模式

### 4.2 全局变量

### 4.3 Context

- 通过共同父组件传递数据
- 全局发布订阅模式
