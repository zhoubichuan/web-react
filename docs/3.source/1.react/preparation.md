---
nav:
  title: 源码知识
  order: 3
group:
  title: react
  order: 1
title: react
order: 1
---

# react

```js
const React = {
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },
  createRef,
  Component,
  PureComponent,
  createContext,
  forwardRef,
  lazy,
  memo,
  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,
  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,
  version: ReactVersion,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
}

export default React
```

## Children

### map

```js
function mapChildren(children, func, context) {
  if (children == null) {
    return children
  }
  const result = []
  mapIntoWithKeyPrefixInternal(children, result, null, func, context)
  return result
}
```

### forEach

```js
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children
  }
  const traverseContext = getPooledTraverseContext(
    null,
    null,
    forEachFunc,
    forEachContext
  )
  traverseAllChildren(children, forEachSingleChild, traverseContext)
  releaseTraverseContext(traverseContext)
}
```

### count

```js
function countChildren(children) {
  return traverseAllChildren(children, () => null, null)
}
```

```js
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0
  }

  return traverseAllChildrenImpl(children, "", callback, traverseContext)
}
```

### toArray

```js
function toArray(children) {
  const result = []
  mapIntoWithKeyPrefixInternal(children, result, null, (child) => child)
  return result
}
```

### only

```js
function onlyChild(children) {
  invariant(
    isValidElement(children),
    "React.Children.only expected to receive a single React element child."
  )
  return children
}
```

## createRef

```js
export function createRef(): RefObject {
  const refObject = {
    current: null,
  }
  return refObject
}
```

## Component

```js
function Component(props, context, updater) {
  this.props = props
  this.context = context
  this.refs = emptyObject
  this.updater = updater || ReactNoopUpdateQueue
}

Component.prototype.isReactComponent = {}

Component.prototype.setState = function (partialState, callback) {
  invariant(
    typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState == null,
    "setState(...): takes an object of state variables to update or a " +
      "function which returns an object of state variables."
  )
  this.updater.enqueueSetState(this, partialState, callback, "setState")
}

Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate")
}
```

## PureComponent

```js
function PureComponent(props, context, updater) {
  this.props = props
  this.context = context
  this.refs = emptyObject
  this.updater = updater || ReactNoopUpdateQueue
}
```

## createContext

```js
export function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null
  }

  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    Provider: (null: any),
    Consumer: (null: any),
  }

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  }

  let hasWarnedAboutUsingNestedContextConsumers = false
  let hasWarnedAboutUsingConsumerProvider = false

  context.Consumer = context

  return context
}
```

## forwardRef

```js
export default function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  }
}
```

## lazy

```js
export function lazy(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    _status: -1,
    _result: null,
  }
}
```

## memo

```js
export default function memo(type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  }
}
```
