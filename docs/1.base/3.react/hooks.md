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

- `useState`会返回一对值：当前状态和一个让你更新它的函数，
- `useState`唯一的参数就是初始`state`

  **当执行状态改变函数时（状态的前后值不同）会重新渲染本组件中所有组件（包含即使没有传递任何参数的子组件）**

### 1.1 使用

```jsx
import React, { useState } from 'react'
import { Button, Divider } from 'antd'
export default function Counter() {
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  return (
    <>
      <p>{number1}</p>
      <Button onClick={() => setNumber1(number1 + 1)}>+</Button>
      <Divider />
      <p>{number2}</p>
      <Button onClick={() => setNumber2(number2 + 1)}>+</Button>
    </>
  )
}
```

### 1.2 实现

```js
let hookStates = []
let hookIndex = 0
function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  let currentIndex = hookIndex
  function setState(newState) {
    hookStates[currentIndex] = newState
    render() //更新组件的函数
  }
  return [hookStates[hookIndex++], setState]
}
```

## 2.useEffect

- useEffect 接受两个参数：一个是副作用函数，另一个是依赖数组
- useEffect 就是一个`Effect Hook`，给函数组件增加了操作副作用的能力
- 它跟 class 组件中的`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`具有相同的用途，只不过被合并成了一个 API

### 2.1 componentDidMount 场景

- 组件已挂载（类似 vue 中 mount）

```jsx
import React, { useEffect } from 'react'

export default function Counter() {
  const [name, setName] = React.useState('接口数据请求中...')
  useEffect(() => {
    setTimeout(() => {
      setName('数据请求成功')
    }, 5000)
    // 执行一次副作用操作：如果依赖数组为空，副作用函数只会在组件首次渲染时执行一次
  }, [])
  return (
    <>
      <p>进入页面等待5秒：{name}</p>
    </>
  )
}
```

### 2.2 componentDidUpdate 场景

- 数据已经更新（类似 vue 中 watch）

```jsx
import React from 'react'
import { Button } from 'antd'

export default function Counter() {
  const [name, setName] = React.useState('小明')
  const [number, setNumber] = React.useState(0)
  React.useEffect(() => {
    setName(name === '小红' ? '小明' : '小红')
    // 监听依赖变化：如果依赖数组中的值发生变化，副作用函数会被重新执行
  }, [number])
  return (
    <>
      <p>{name}</p>
      <p>
        <Button onClick={() => setNumber(number + 1)}>+</Button>：{number}
      </p>
    </>
  )
}
```

### 2.3 componentWillUnmount 场景

-

```jsx
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

export default function Counter() {
  const [name, setName] = useState('小明')
  const [number, setNumber] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Hello')
    }, 1000)

    // 返回清除函数
    return () => {
      clearInterval(timer)
    }
    // 清除副作用操作：副作用函数可以返回一个清除函数，用于清除副作用操作，比如取消订阅、清除定时器等
  }, [])
  return (
    <>
      <p>
        <Button onClick={() => setName('小红')}>修改名称</Button>：{name}
      </p>
      <p>
        <Button onClick={() => setNumber(number + 1)}>+</Button>：{number}
      </p>
    </>
  )
}
```

### 2.4 实现

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

#### useEffect 监测不到依赖数组元素的变化多种情况？

- 当使用 useEffect 时，如果依赖数组元素的变化没有被正确监测到，可能有以下几种情况：

- 依赖数组元素是一个对象或数组：useEffect 使用浅层比较来判断依赖数组元素是否发生变化。如果依赖数组中的元素是一个对象或数组，只有当引用发生变化时，useEffect 才会重新执行。如果您修改了对象或数组的属性，但是引用没有发生变化，useEffect 无法感知到这个变化。

```js
const [data, setData] = useState({ name: 'John' })

// 错误示例：修改对象属性，但引用未变化
setData({ ...data, age: 20 }) // useEffect无法感知到属性的变化

// 正确示例：修改对象属性，引用发生变化
setData(prevData => ({ ...prevData, age: 20 })) // useEffect会感知到属性的变化
```

- 依赖数组元素是一个闭包变量：如果依赖数组中的元素是一个闭包变量，那么在每次渲染时，useEffect 都会获取到最新的闭包变量。因此，即使闭包变量的值发生了变化，useEffect 也无法感知到这个变化

```js
const [count, setCount] = useState(0)

// 闭包变量
const handleClick = () => {
  setCount(count + 1)
}

useEffect(() => {
  console.log(count) // 每次渲染都会获取最新的count值
}, [count]) // 无法感知到闭包变量的变化
```

- 如果您希望 useEffect 能够感知到闭包变量的变化，可以使用函数式更新来更新状态，这样可以确保在 useEffect 中获取到的是最新的状态值

```js
const [count, setCount] = useState(0)

// 函数式更新
const handleClick = () => {
  setCount(prevCount => prevCount + 1)
}

useEffect(() => {
  console.log(count) // 每次渲染获取最新的count值
}, [count]) // 可以感知到闭包变量的变化
```

- 依赖数组元素是一个函数：如果依赖数组中的元素是一个函数，那么 useEffect 会在每次渲染时都认为该函数发生了变化，从而重新执行副作用函数

```js
const [count, setCount] = useState(0)

const handleClick = () => {
  setCount(count + 1)
}

// 错误示例：将函数作为依赖数组元素
useEffect(() => {
  console.log(count)
}, [handleClick]) // 每次渲染都会重新执行副作用函数
```

- 如果您希望避免在每次渲染时都重新执行副作用函数，可以将函数定义在 useEffect 的外部，并在副作用函数中引用该函数

```js
const [count, setCount] = useState(0)

const handleClick = () => {
  setCount(count + 1)
}

// 正确示例：在副作用函数中引用函数
useEffect(() => {
  const handleEffect = () => {
    console.log(count)
  }

  handleEffect()
}, [count]) // 只在count发生变化时执行副作用函数

// 或者使用useCallback包裹函数
const handleEffect = useCallback(() => {
  console.log(count)
}, [count])

useEffect(() => {
  handleEffect()
}, [handleEffect])
```

## 3.useLayoutEffect

- 其函数签名与`useEffect`相同，但它会在所有的`DOM`变更之后同步调用 effect
- `useEffect`执行的是`宏任务`不会阻塞浏览器渲染，在浏览器`render`后执行，而`useLayoutEffect`执行的是`微任务`会阻塞浏览器渲染，在浏览器`render`前执行

### 3.1 使用

```jsx
import React, { useLayoutEffect, useEffect, useRef } from 'react'

export default function Animate() {
  const red = useRef()
  const green = useRef()
  useLayoutEffect(() => {
    red.current.style.transform = `translate(500px)`
    red.current.style.transition = `all 500ms`
  }, [])
  useEffect(() => {
    green.current.style.transform = `translate(500px)`
    green.current.style.transition = `all 500ms`
  }, [])
  let style = { width: '100px', height: '100px' }

  return (
    <>
      <div style={{ ...style, backgroundColor: 'red' }} ref={red}>
        微任务
      </div>
      <div style={{ ...style, backgroundColor: 'green' }} ref={green}>
        宏任务
      </div>
    </>
  )
}
```

### 3.2 实现

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

## 4.useContext

- 接收一个`context`对象并返回该`context`的当前值

### 4.1 使用

```jsx
import React, { useState, createContext, useContext } from 'react'
import { Button } from 'antd'

const CounterContext = createContext()
function Counter() {
  let { state, setState } = useContext(CounterContext)
  return (
    <>
      <p>{state.number}</p>
      <Button onClick={() => setState({ number: state.number + 1 })}>+</Button>
      <Button onClick={() => setState({ number: state.number - 1 })}>-</Button>
    </>
  )
}
export default function App() {
  const [state, setState] = useState({ number: 0 })
  return (
    <CounterContext.Provider value={{ state, setState }}>
      <Counter />
    </CounterContext.Provider>
  )
}
```

### 4.2 实现

```js
function useContext(context) {
  return context._currentValue
}
```

## 5.useReducer

- 它接收一个形如（state,action）=> newState 的 renducer,并返回当前的 state 以及与其配套的 dispatch 方法

### 5.1 使用

```jsx
import React from 'react'
import { Button, Divider } from 'antd'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      throw new Error()
  }
}
export default function Counter() {
  const [state, dispatch] = React.useReducer(reducer, 0)
  return (
    <>
      Count: {state}
      <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
      <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
    </>
  )
}
```

### 5.2 实现

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

## 6.useMemo

### 6.1 使用

```jsx
import React, { useState } from 'react'
import { Button } from 'antd'

function Child() {
  console.log('子组件')
  return <>child</>
}
export default function App() {
  const [state, setState] = useState(0)
  console.log('父组件')
  return (
    <>
      <Button onClick={() => setState(Math.random())}>按钮</Button>
      <Child />
    </>
  )
}
```

- 使用`memo`后

```jsx
import React, { useState, useMemo, memo } from 'react'
import { Button } from 'antd'

const Child = memo(() => {
  console.log('子组件')
  return <>child</>
})

export default function App() {
  const [state, setState] = useState(0)
  console.log('父组件')
  return (
    <>
      <Button onClick={() => setState(Math.random())}>按钮</Button>
      <Child />
    </>
  )
}
```

- 使用`useMemo`后

```jsx
import React, { useState, useMemo, memo } from 'react'
import { Button } from 'antd'

const Child = memo(() => {
  console.log('子组件')
  return <>child</>
})

export default function App() {
  const [state, setState] = useState(0)
  console.log('父组件')
  return (
    <>
      <Button onClick={() => setState(Math.random())}>按钮</Button>
      <Child data={useMemo(() => state, [])} />
    </>
  )
}
```

### 6.2 实现

## 7.useCallback

### 7.1 使用

```jsx
import React, { useState, useMemo, memo } from 'react'
import { Button } from 'antd'

const Child = memo(() => {
  console.log('子组件')
  return <>child</>
})

export default function App() {
  const [state, setState] = useState(0)
  console.log('父组件')
  const handleChange = () => {}
  return (
    <>
      <Button onClick={() => setState(Math.random())}>按钮</Button>
      <Child data={useMemo(() => state, [])} onChange={handleChange} />
    </>
  )
}
```

- 使用`useCallback`后

```jsx
import React, { useState, useMemo, memo, useCallback } from 'react'
import { Button } from 'antd'

const Child = memo(() => {
  console.log('子组件')
  return <>child</>
})

export default function App() {
  const [state, setState] = useState(0)
  console.log('父组件')
  const handleChange = () => {}
  return (
    <>
      <Button onClick={() => setState(Math.random())}>按钮</Button>
      <Child
        data={useMemo(() => state, [])}
        onChange={useCallback(() => handleChange, [])}
      />
    </>
  )
}
```

### 7.2 实现

```

```
