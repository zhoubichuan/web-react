---
nav:
  title: 基础知识
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: React(hooks)
order: 7
---

# 二.React(hooks)

## 1.useState

- `useState`会返回一对值：当前状态和一个让你更新它的函数
- `useState`唯一的参数就是初始`state`

### 1.1 使用

```jsx
import React from "react"
export default function Counter() {
  const [number, setNumber] = React.useState(0)
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  )
}
```

### 1.2 实现

```js
let lastState
function useState(initialState) {
  lastState = lastState || initialState
  function setState(newState) {
    lastState = newState
    render()
  }
  return [lastState, setState]
}
```

## 2.多 useState

### 2.1 使用

```js
import React from "react"
import ReactDOM from "react-dom"
function Counter() {
  const [number1, setNumber1] = React.useState(0)
  const [number2, setNumber2] = React.useState(0)
  return (
    <>
      <p>{number1}</p>
      <button onClick={() => setNumber1(number1 + 1)}>+</button>
      <hr />
      <p>{number2}</p>
      <button onClick={() => setNumber2(number2 + 1)}>+</button>
    </>
  )
}
function render() {
  ReactDOM.render(<Counter />, document.getElementById("root"))
}
render()
```

### 2.2 实现

```js
let hookStates = []
let hookIndex = 0
function useState(initialState) {
  //如果有老值取老值,没有取默认值
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  //暂存索引
  let currentIndex = hookIndex
  function setState(newState) {
    hookStates[currentIndex] = newState
    render()
  }
  return [hookStates[hookIndex++], setState]
}
```

## 3.useEffect

- useEffect 就是一个`Effect Hook`，给函数组件增加了操作副作用的能力
- 它跟 class 组件中的`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`具有相同的用途，只不过被合并成了一个 API

### 3.1 使用

```jsx
import React from "react"

export default function Counter() {
  const [name, setName] = React.useState("小明")
  const [number, setNumber] = React.useState(0)
  React.useEffect(() => {
    console.log(number)
  }, number)
  return (
    <>
      <p>
        <button onClick={() => setName("小红")}>修改名称</button>:{name}
      </p>
      <p>
        <button onClick={() => setNumber(number + 1)}>+</button>:{number}
      </p>
    </>
  )
}
```

### 3.2 实现

```js
let hookStates = []
let hookIndex = 0
function useState(initialState) {
  //如果有老值取老值,没有取默认值
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  //暂存索引
  let currentIndex = hookIndex
  function setState(newState) {
    hookStates[currentIndex] = newState
    render()
  }
  return [hookStates[hookIndex++], setState]
}

function UseEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let lastDeps = hookStates[hookIndex]
    let same = dependencies.every((item, index) => item === lastDeps[index])
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies
      setTimeout(callback)
    }
  } else {
    hookStates[hookIndex++] = dependencies
    setTimeout(callback)
  }
}
```

## 4.useLayoutEffect

- 其函数签名与`useEffect`相同，但它会在所有的`DOM`变更之后同步调用 effect
- `useEffect`不会阻塞浏览器渲染，而`useLayoutEffect`会阻塞浏览器渲染
- `useEffect`会在浏览器渲染结束后执行，`useLayoutEffect`则是在`DOM`更新完成后，浏览器绘制之前执行

### 4.1 使用

```js
import React from "react"
import ReactDOM from "react-dom"

const Animate = () => {
  const red = React.useRef()
  const green = React.useRef()
  React.useLayoutEffect(() => {
    red.current.style.transform = `translate(500px)`
    red.current.style.transition = `all 500ms`
  })
  React.useEffect(() => {
    green.current.style.transform = `translate(500px)`
    green.current.style.transition = `all 500ms`
  })
  let style = { width: "100px", height: "100px" }

  return (
    <div>
      <div style={{ ...style, backgroundColor: "red" }} ref={red}></div>
      <div style={{ ...style, backgroundColor: "green" }} ref={green}></div>
    </div>
  )
}

function render() {
  ReactDOM.render(<Animate />, document.getElementById("root"))
}
render()
```

### 4.2 实现

```js
function useLayoutEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let lastDeps = hookStates[hookIndex]
    let same = dependencies.every((item, index) => item === lastDeps[index])
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies
      queueMicrotask(callback)
    }
  } else {
    hookStates[hookIndex++] = dependencies
    queueMicrotask(callback)
  }
}
```

## 5.useContext

- 接收一个`context`对象并返回该`context`的当前值

### 5.1 使用

```js
import React from "react"
import ReactDOM from "react-dom"
const CounterContext = React.createContext()

function Counter() {
  let { state, setState } = React.useContext(CounterContext)
  return (
    <>
      <p>{state.number}</p>
      <button onClick={() => setState({ number: state.number + 1 })}>+</button>
      <button onClick={() => setState({ number: state.number - 1 })}>-</button>
    </>
  )
}
function App() {
  const [state, setState] = useState({ number: 0 })
  return (
    <CounterContext.Provider value={{ state, setState }}>
      <Counter />
    </CounterContext.Provider>
  )
}
function render() {
  ReactDOM.render(<App />, document.getElementById("root"))
}
render()
```

### 5.2 实现

```js
function useContext(context) {
  return context._currentValue
}
```

## 6.useReducer

- 它接收一个形如（state,action）=> newState 的 renducer,并返回当前的 state 以及与其配套的 dispatch 方法

### 6.1 使用

```js
import React from "react"
import ReactDOM from "react-dom"

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      throw new Error()
  }
}
function Counter() {
  const [state, dispatch] = React.useReducer(reducer, 0)
  return (
    <>
      Count: {state}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  )
}
function render() {
  ReactDOM.render(<Counter />, document.getElementById("root"))
}
render()
```

### 6.2 实现

```js
let hookStates = []
let hookIndex = 0
function useReducer(reducer, initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  let currentIndex = hookIndex
  function dispatch(action) {
    hookStates[currentIndex] = reducer(hookState[currentIndex], action)
    render()
  }
  return [hookStates[hookIndex++], dispatch]
}
```

## 7.useMemo

### 7.1 使用

### 7.2 实现

## 8.useCallback

### 8.1 使用

### 8.2 实现
