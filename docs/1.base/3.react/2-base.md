---
nav:
  title: 基础知识
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: React(基础)
order: 3
---

# React(基础)

## 1.createElement

- jax 其实只是一种语法糖，最终会通过 babel 转译成 creactElement 语法

```js
ReactDOM.render(
  <div>
    上,<span>下</span>
  </div>
)
```

等同

```js
ReactDOM.render(
  React.createElement(
    "div",
    null,
    "上",
    React.createElement("span", null, "下")
  )
)
```

- 一般使用 React.createElement 来创建一个虚拟 dom 元素

## 12.组件中属性和状态的区别

## 13.绑定事件

## 14.属性校验，默认属性

## 15.状态的使用

- 在组件的生命周期或 React 的合成事件中,setState 是异步的

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
    debugger
    this.setState({
      name: childData
    },()=>{
      console.log(this.state.name,'5555')
    })
    debugger
    console.log(this.state.name,'6666')
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

可以看到`setState`中的数据首先放到当前`fiber`更新队列中，然后通过`scheduleWork`对`fiber`进行异步更新

> 如果获取异步的结果
    - 在 setState 的第二个回调函数中获取

- 函数写法

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
    debugger
    this.setState((state,props) => {
      debugger
      return {
        name: childData
      }
    },()=>{
      console.log(this.state.name,'5555')
    })
    debugger
    console.log(this.state.name,'6666')
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

- 在 setTimeout 中,setState 是同步的

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
    setTimeout(()=>{
      debugger
      this.setState({
        name: childData
      },()=>{
        console.log(this.state.name,'3333')
      })
      debugger
      console.log(this.state.name,'4444')
    },0)
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

- 在原生 DOM 事件中,setState 是同步的

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
  componentDidMount(){
    const btnEl = document.getElementById("btn");
    btnEl.addEventListener('click',()=>{
      debugger
      this.setState(() => {
        debugger
        return {
          name: 'asdfasd'
        }
      },()=>{
        console.log(this.state.name,'1111')
      })
      debugger
      console.log(this.state.name,'2222')
    })
  }
  render() {
    return (
      <div>
        <p>数据：{this.state.name}</p>
        <button id="btn">按钮</button>
      </div>
    )
  }
}
export default Parent
```

- 状态是集合的更新

```jsx
import React, { Component } from 'react'
class Child extends Component {
  constructor(props){
    super(props)
    this.state = {
      friends: [
        { name: "lilei", age: 20 },
        { name: "lily", age: 25 },
        { name: "lucy", age: 22 }
      ]
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
      friends: [
        { name: "lilei", age: 20 },
        { name: "lily", age: 25 },
        { name: "lucy", age: 22 }
      ]
    }
  }
  getChildData = childData => {
    // 在开发中不要这样来做, 这样做,如果实现了shouldComponentUpdate,在方法里进行浅比较的话,认为两者是一样的,因为浅比较是比较两者的内存地址,
    // const newData = {name: "tom", age: 30}
    // this.state.friends.push(newData);
    // this.setState({
    //   friends: this.state.friends
    // });

    // 推荐做法
    const newFriends = [...this.state.friends];
    newFriends.push({ name: "tom", age: 30 });
    this.setState({
      friends: newFriends
    })

    // 修改集合中某个对象的数据,也是要重新生成一个集合
    const newFriends2 = [...this.state.friends];
    newFriends2[index].age += 1;
    this.setState({
      friends: newFriends2
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

当我们在 state 中保存的状态是集合类型,比如数组时, 在进行状态更新时,需要生成一个新的数组进行赋值,而不是直接在原数组上进行操作,比如增删改

- 通过源码分析可以知道：`setState`执行后，会将相关参数添加到当前`fiber`上的任务队列中，通过`executionContext`参数控制后续执行流程中是否继续执行任务队列中的任务，默认`executionContext`参数`NotContext`下会继续执行任务队列中的任务，这时业务代码表现为同步执行`setState`,当`setState`被`react合成事件包裹时`，执行合成事件会修改为`EventContent`,此时不会继续执行任务队列中的任务，业务代码表现为异步

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
