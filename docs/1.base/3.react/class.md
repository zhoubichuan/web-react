---
nav:
  title: 基本语法
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: React(类组件)
order: 5
---

# 二.React(类组件)

## 1.组件分类

- 按是否有状态：有状态组件、无状态组件
- 按定义方式不同：函数组件（构造函数组件）、类组件（class 组件）
- 按是否受 state 控制：受控组件、非受控组件
- 按组件的功能：展示组件和容器组件
- 按函数是否是高阶函数：高阶组件、普通组件

## 1.组件 & Props

- 可以将 UI 切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件
- 组件从概念上类似于 JavaScript 函数。它接受任意的入参，并返回用于描述页面展示内容的 React 元素。

### 1.1 函数组件

- 函数组件接收一个单一的`props`对象并返回了一个 React 元素

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

### 1.2 类组件

```js
class Welcome extends React.Component {
  render(){
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

### 1.3 组件渲染

- React 元素不但可以是 DOM 标签，还可以是用户自定义的组件
- 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性转换为单个对象传递给组件，这个对象被称为`props`
- 组件名称必须以大写字母开头
- 组件必须在使用的时候定义或引用它
- 组件的返回值只能有一个根元素

```js
class Panel extends Component {
  render (){
    let { header ,body} = this.props
    return (
      <div className="container">
        <div className="panel-default panel">
          <Header header={header}></Header>
          <Body body={body}/>
        </div>
      </.div>
    )
  }
}
class Body extends Component {
  render(){
    return <div className="panel-body">{this.props.body}</div>
  }
}
class Header extends Component {
  render(){
    return <div classNmae="panel-heading"><this.props.header></div>
  }
}
let data= {
  header:'123',
  body: '456'
}
ReactDom.render(<Panel {...data}/>,window.root)
```

### 1.4 props 的只读性

- 无论是使用函数或是类来声明的一个组件，它决不能修改它自己的 `props`
- `纯函数`没有改变它自己的输入值，当传入的值相同时，总是返回相同的结果
- 所有的 React 组件必须像纯函数那样使用他它们的 props

```js
// 纯函数
function sum(a, b) {
  return a + b
}
// 非纯函数
function withdraw(account, amount) {
  account.total -= amount
}
```

### 1.5 进行类型检查

- 要在组件的 props 上进行类型检查，你只需要配置特定的 propsTypes 属性
- 你可以通过配置特定的 defaultProps 属性来定义 props 的默认值

```js
import PropsTypes from 'prop-types'
MyComponent.propTypes = {
  // 你可以将属性声明为js原生类型，默认情况下 这些属性都是可选的
  optionalArray: PropTypes.array,
  optionalBool:PropTypes.bool,
  optionalFunc:PropTyeps.number,
  potionalNumber:PropTypes.object,
  optionalObject:PropTypes.string,
  optionalSymbol:PropTypes.symbol,
  // 任何可被渲染的元素（包含数字，字符串、元素或数组或Fragment）也包含这些类型
  optionalNode:PropTypes.node,
  // 一个React元素
  optionalElement:PropTypes.element,
  // 你也可以声明prop为类的实例，这里使用js的instanceof操作符
  optionalMessage:PropTypes.instancOf(Message),
  //你可以让你的prop只能是特定的值，指定它为枚举类型
  optionalEnum:PropTypes.oneOf(['News','Photos'])
  //一个对象可以是几种类型中的任意一个类型
  optionalUnion:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),
  //可以指定一个数组由某一类型的元素组成
  optionalArrayOf:PropTypes.arrayOf(PropTypes.number),
  //可以指定一个对象由某一类型的值组成
  optionalObjectOf:PropsTypes.objectOf(PropTypes.number),
  //可以指定一个对象由特定的类型值组成
  optionalObjectWithShape:PropTypes.shape({
    color:PropTypes.string,
    fontSize:PropTyeps.number
  })
  // 你可以在任何PropTypes属性后面加上`isRequired`,确保这个prop没有被提供时，会打印警告信息
  requiredFunc:PropTypes.func.isRequired,
  //任意类型的数据
  requiredAny:PropTypes.any.isRequired,
  //你可以指定一个自定义验证器。它在验证失败时应返回一个Error对象；请不要使用`console.warn`或抛出异常，因为这在`oneOfType`中不会起作用
  customProp:function(props,propName,componentName){
    if(!/matchme/.test(props[propName])){
      return new Error(
        'Invalid prop`'+propName+'`supplied to'+'`'+componentName+'`. Validation failed .'
      )
    }
  },
  // 你也可以提供一个自定以的`arrayOf` 或`objectOf`验证器；它应该在验证失败时返回一个Error对象；验证器将验证数组对象中的每个值。验证器的前两个参数；第一个是数组或对象本身，第二个是他们当前的键
  customArrayProp: PropTypes.arrayOf(function(propValue,keyi,componentName,location,propFullName)){
    if(!/matchme/.test(propValue[key])){
      return new Error(
        'Invalid prop`'+propName+'`supplied to'+'`'+componentName+'`. Validation failed .'
      )
    }
  }
}
```

```js
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
class Person extends React.Component {
  static defaultProps = {
    name: "Stranger",
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(["male", "famale"]),
    hobby: PropTypes.array,
    postion: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }
  render() {
    let { name, age, gender, hobby, position } = this.props
    return (
      <table>
        <thead>
          <tr>
            <td>姓名</td>
            <td>年龄</td>
            <td>性别</td>
            <td>爱好</td>
            <td>位置</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{hobby.join(",")}</td>
            <td>{position.x + " " + position.y}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
let person = {
  age: 100,
  gender: "male",
  hobby: ["basketball", "football"],
  position: { x: 10, y: 10 },
}
ReactDOM.render(<Person {...person} />, document.getElementById("root"))
```

### 1.6 虚拟 DOM

#### index.js

```js
import React from "./react"
import ReactDOM from "./react-dom"

class Welcome extends React.Component {
  render() {
    return React.createElement("h1", { className: "title" }, this.props.title)
  }
}
let element = React.createElement(Welcome, { title: "标题" })
ReactDOM.render(element, document.getElementById("root"))
```

### 1.7 react.js

```js
import createElement from "./element"
class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
  }
}
export default {
  createElement,
  Component,
}
```

#### element.js

```js
const ReactElement = function (type, props) {
  const element = {
    type: type,
    props: props,
  }
  return element
}
function createElement(type, config, children) {
  let propName
  const props = {}
  for (propName in config) {
    props[propName] = config[propName]
  }
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    props.children = Array.prototype.slice.call(arguments, 2)
  }
  return ReactElement(type, props)
}
export default createElement
```

#### react-dom.js

```js
function render(element, container) {
  if (typeof element == "string") {
    return container.appendChild(document.createTextNode(element))
  }
  let type, props
  type = element.type
  props = element.props
  if (type.isReactComponent) {
    element = new type(props).render()
    type = element.type
    props = element.props
  }
  let domElement = document.createElement(type)
  for (let propName in props) {
    if (propName === "children") {
      let children = props[propName]
      children = Array.isArray(children) ? children : [children]
      children.forEach((child) => render(child, domElement))
    } else if (propName === "style") {
      let styleObj = props[propName]
      let cssText = Object.keys(styleObj)
        .map((attr) => {
          return `${attr.replace(/[A-Z]/g, function () {
            return "-" + arguments[1]
          })}:${styleObj[attr]}`
        })
        .join(";")
      domElement.style.cssText = cssText
    } else {
      domElement.setAttribute(propName, props[propName])
    }
    container.appendChild(domElement)
  }
}
export default { render }
```

## 2.状态

- 组件的数据来源有两个地方，分别是属性对象和状态对象
- 属性是父组件传递过来的（默认属性，属性校验）
- 状态是自己内部的，改变状态唯一的方式就是`setState`
- 属性和状态的变化都会影响视图更新

```js
import React from 'react'
import ReactDOM from 'react-dom'
class Clock extends React.Component {
  constructor(props){
    super(props){
      this.state = {
        date: new Date()
      }
    }

    componentDidMount(){
      this.timerID = setInterval(
        () => this.tick(),
        1000
      )
    }

    componentWillUnmount(){
      clearInterval(this.timerID)
    }

    tick(){
      this.setState({
        date: new Date()
      })
    }

    render(){
      return (
        <div>
          <h1> Hello, word!</h1>
          <h2>It is { this.state.date.toLocaleTimeString()}</h2>
        </div>
      )
    }
  }
}
ReactDOM.render(
  <Clock>,
  document.getElementById('root')
)
```

### 2.1 不要直接修改 State

- 构造函数是唯一可以给`this.state`赋值的地方

```js
import React from 'react'
import ReactDOM from 'react-dom'
class Counter extends React.Component {
  constructor(props){
    super(props){
      this.state = {
        number: 0
      }
    }
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => {
        this.state.number = this.state.number + 1
      },
      1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  render(){
    return (
      <div>
        <p>{this.state.number}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)
```

### 2.2 State 的更新可能是异步的

- 出于性能考虑，React 可能会把多个 setState()调用合并成一个调用
- 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态
- 可以让 setState()接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数

```js
import React from "react"
import ReactDOM from "react-dom"
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0,
    }
  }

  handleClick = () => {
    this.setState((state) => ({ number: state.number + 1 }))
    this.setState((state) => ({ number: state.number + 1 }))
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"))
```

### 2.3 State 的更新会被合并

- 当你调用 setState()的时候，React 会把你提供的对象合并到当前的 state

```js
import React from "react"
import ReactDOM from "react-dom"
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "zhufeng",
      number: 0,
    }
  }
  handleClick = () => {
    this.setState((state) => ({ number: state.number + 1 }))
    this.setState((state) => ({ numbner: state.number + 1 }))
  }
  render() {
    return (
      <div>
        <p>
          {this.state.name}:{this.state.number}
        </p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"))
```

### 2.4 数据是向下流动的

- 不管是父组件或是自组件都无法知道某个组件是有状态还是无状态，并且它们也并不关心它是函数组件还是 class 组件
- 这就是为什么称 state 为局部的或是封装的原因，除了拥有并设置了它的组件，其他组件都无法访问
- 任何 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它的组件
- 如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每个组件的 state 就像在任意一点上给瀑布增加额外的水源，但是它只能向下流动

```js
import React from 'react'
import ReactDOM from 'react-dom'
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      number: 90
    }
  }
  handleClick(()=>{
    this.setState(state=>(
      {number:state.number+1}
    ))
  })
  render(){
    return (
      <div style={{border:'1px solid red'}}>
        <p>{this.state.name}:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <SubCounter number={this.state.number} />
      </div>
    )
  }
}
class SubCounter extends React.Component {
  render(){
    return <div style={{border:'1px solid blue'}}>子计数器：{this.props.number}</div>
  }
}
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)
```

## 3.事件处理

- React 事件的命名采用小驼峰式，而不是纯小写
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
- 你不能通过返回 `false`方式阻止默认行为，你必须显式使用`preventDefault`

```js
import React from "react"
import ReactDOM from "react-dom"
class Link extends React.Component {
  handleClick(e) {
    e.preventDefault()
    console.log("The link was clicked .")
  }
  render() {
    return (
      <a href="http://www.baidu.com" onClick={this.handleClick}>
        Click me
      </a>
    )
  }
}
ReactDOM.render(<Link />, document.getElementById("root"))
```

### 3.1 this

- 你必须谨慎对待 JSX 回调函数中的 this, 可以使用
  - 公共属性（箭头函数）
  - 匿名函数
  - bind 进行绑定

```js
class LoggingButton extends React.Component {
  handleClick(){
    console.log('this is:', this)
  }
  handleClcik1=()=>{
    console.log('this is:',this)
  }
  render(){
    return (
      <button onClick={event => this.handleClick(event)}>Click me</button>
    )
  }
}
```

### 3.2 向事件处理程序传递参数

- 匿名函数
- bind

```js
class LoggingButton extends React.Component {
  handleClick = (id, event) => {
    console.log("id", id)
  }
  render() {
    return (
      <>
        <button onClick={(event) => this.handleClick("1", event)}>
          Click me
        </button>
        <button onClick={this.handleClick.bind(this, "1")}>Click me</button>
      </>
    )
  }
}
```

### 3.3 Ref

- Refs 提供了一种方式，允许我们访问 dom 节点或在 render 方法中创建的 React 元素
- 在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望　 React 能赋予组件一个初始值，但是不去控制后续的更新。在这种情况下，你可以指定一个 defaultValue 属性，而不是 value.

### 3.4 一个简单的 hooks

首先让我们看一下一个简单的有状态组件：

```js
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

我们来看一下使用 hooks 后的版本

```js
import { useState } from "react"
function Example() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

可以看到，Example 变成了一个函数，但这个函数却又自己的状态，同时它还可以更新自己的状态。这个函数之所以这个牛，就是因为它注入了一个 hook--useState，就是这个 hook 让我们的函数变成了一个有状态的函数。

除了 useState 这个 hook 外，还有很多别的 hook，比如 useEffect 提供了类似于 componentDidMount 等生命周期钩子的功能，useContext 提供了上下文的功能等。

Hooks 本质上就是一类特殊的函数，他们可以为你的函数型组件（function component）注入一些特殊的功能。

### 3.5 React 为什么要搞一个 Hooks

#### 想要复用一个有状态的组件太麻烦了

我们都知道 react 的核心思想就是，将一个页面拆层一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。但假如你在大型的工作项目中用 react，你会发现你的项目中实际上有很多 react 组件冗长且难以复用。尤其是那些写成 class 的组件，它们本身包含了状态，所以复用这类组件就变得很麻烦。

之前官方推荐的解决方案就是：渲染属性和高阶组件

渲染属性指的是使用一个值为函数的 prop 来传递需要动态渲染的 nodes 或者组件，如果下面的代码可以看到我们的 DataProvider 组件包含了所有跟状态相关的代码，而 Cat 组件可以是一个单纯的展示型组件，这样一来 DataProvider 就可以单独复用了。

```js
import Cat from "components/cat"
class DataProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = { target: "zbc" }
  }
  render() {
    return <div>{this.props.render(this.state)}</div>
  }
}
;<DataProvider render={(data) => <Cat target={data.target} />} />
```

虽然这个模式叫 Render Props，但不是说非用 render 的 props 不可，习惯上大家更长写成下面这种

```js
<DataProvider>{(data) => <Cat target={data.target} />}</DataProvider>
```

高阶组件这个概念就更好理解了，说白了就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。看下面的代码示例，withUser 函数就是一个高阶组件，它返回了一个新组件，这个组件具有了它提供的获取用户信息的功能。

```js
const withUser = (wrappedComponent) => {
  const user = sessionStorage.getItem("user")
  return (props) => <WrappedComponent user={user} {...props} />
}
const UserPage = (props) => (
  <div class="user-container">
    <p>My name is {props.user}!</p>
  </div>
)
export default withUser(UserPage)
```

以上这两种模式看上去都挺不错的，很多库也运用了这种模式，比如我们常用的 React Router 但我们仔细看这两种莫斯，会发现他们会增加我们代码的层级关系。最直观的体现，打开 devtool 看看你的组件层级嵌套是不是很夸张。这时候再回头看我们上一节给出的 hooks 列子，是不是简洁多了，没有多余的层级嵌套。把各种想要的功能写成一个一个可复用的自定义 hook，当你的组件想用什么功能时，直接在组件里调用这个 hook 即可。

#### 生命周期钩子函数里的逻辑太乱了

我们通常希望一个函数只做一件事情，但我们的生命周期钩子函数里通常同时做了很多事情。比如我们需要在 componentDidMount 中发起 ajax 请求获取数据，绑定一些事件监听等等。同时，有时候我们还需要在 componentDidUpdate 做一遍同样的事情。当项目变复杂以后，这一块代码也变得不那么直观。

#### calss 真的太让人困惑了

我们用 class 来创建 react 组件时，还有一件很麻烦的事情，就是 this 的指向问题。为了保证 this 的指向正确，我们要经常写这样的代码：this.handleClick=this.handleClick.bind(this),或者是这样的代码：<button onClick={()=>this.handleClick(e)}>。一旦我们不小心忘了绑定 this，各种 bug 就随之而来，很麻烦。

还有一件让我们很苦恼得到事情。尽可能把你的组件写成无状态组件的形式，因为他们更方便复用，可以独立测试。然而很多时候，我们用 function 写了一个简洁的完美的无状态组件，后来因为需求变动这个组件必须得有自己的 state，我们又得很麻烦的把 function 改为 class。

#### 什么是 State Hooks

回到一开始我们用的例子，我们分解来看到底 state hooks 做了什么。

```js
import { useState } from "react"
function Example() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>You clicked {count} timers</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

