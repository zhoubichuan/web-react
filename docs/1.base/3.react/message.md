---
nav:
  title: 基础知识
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: React(类组件-组件间通信)
order: 4
---

# 类组件-组件通信

<Alert type="info"> 前言
介绍几种react中组件通信的方式
</Alert>

## 1.父子组件

### 1.1 父传子

- **props属性**

```jsx
import React, { Component } from 'react'
class Child extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.data}
      </div>
    )
  }
}
class Parent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'aaa'
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
        <Child data={this.state.name}></Child>
      </div>
    )
  }
}
export default Parent
```

### 1.2 子传父

- **props回调函数**

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

- **事件冒泡**

## 3.兄弟组件

- **context**

```jsx
import React, { Component } from 'react'

let ThemeContext = React.createContext();
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
class Child2 extends Component {
  static contextType=ThemeContext
  render() {
    return (
      <div>
        子组件数据：{this.context.name}
      </div>
    )
  }
}
class Parent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'aaaaa'
    }
  }
  getChildData = childData => {
    this.setState({
      name: childData
    })
  }
  render() {
    return (
      <ThemeContext.Provider value={{name:this.state.name}}>
        <div>
          <Child getChildData={this.getChildData}></Child>
          <Child2></Child2>
        </div>
      </ThemeContext.Provider>
    )
  }
}
export default Parent
```

- **层层传递 props**

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
class Child2 extends Component {
  render() {
    return (
      <div>
        子组件数据：{this.props.data}
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
        <Child getChildData={this.getChildData}></Child>
        <Child2 data={this.state.name}></Child2>
      </div>
    )
  }
}
export default Parent
```

## 4.任意组件

### 4.1 观察者模式

### 4.2 全局变量

### 4.3 Context

```jsx
import React, { Component } from 'react'

let ThemeContext = React.createContext();
class Child extends Component {
  constructor(props){
    super(props)
    this.  state = {
      name: '小明'
    }
  }
  static contextType=ThemeContext
  render() {
    return (
      <div>
        {this.context.name}
      </div>
    )
  }
}
class Parent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'aaaaa'
    }
  }
  render() {
    return (
      <ThemeContext.Provider value={{name:this.state.name}}>
        <div>
          <Child></Child>
        </div>
      </ThemeContext.Provider>
    )
  }
}
export default Parent
```

- 通过共同父组件传递数据
- 全局发布订阅模式
