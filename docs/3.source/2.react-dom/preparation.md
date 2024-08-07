---
nav:
  title: 源码知识
  order: 3
group:
  title: react-dom
  order: 2
title: 源码概览
order: 1
---

# 源码概览

![](./1.2.png)

主要步骤：创建 root --> 渲染 root --> 提交 root

- 1 初始阶段
  - 1.1 `ReactDom.render`带上`root`节点进入源码内部，通过`createFiberRoot`创建一个`FiberRoot`节点，通过`FiberNode`创建一个`RootFiber`节点，作为`root`节点相互引用
  - 1.2 更新过期时间，给任务定义优先级
  - 1.3 创建更新，将更新队列挂载到`RootFiber`上
- 2 渲染阶段：创建fiber tree 、计算数据、diff、创建更新队列
  - 2.1 拷贝 fiber 节点作为副本修改后，前后可以比较
  - 2.2 循环单元更新节点，初始化时从根节点遍历整个组件，创建`fiber tree`，更新过程可以被打断，打断时将任务放入异步队列，当优先级更高的任务完成后，异步队列中的任务开始执行，重新循环更新 `fiber tree`，需要更新的部分放入更新队列
  - 2.3 onComplete
- 3 提交阶段：遍历更新队列，将更新反馈到 dom 上
  - 3.1 commitBeforeMutationLifecycles：遍历 effect 链、更新 state
  - 3.2 commitAllHostEffects：遍历 effect 链，不同的 effectTag 执行不同的操作
  - 3.3 commitAllLifeCycles：componentDidMount、componentDidUpdate、setState 回调函数、清空 commitUpdateQueue

```js
function App() {
  return <div>hello</div>
}
ReactDOM.render(<App />, document.getElementById("root"))
```

![](./1.png)

## 1.创建`root`节点

React 首先会生成一个 root 节点，里面包含了`RootFiber`和`FiberRoot`，它们是互相引用的关系，可以通过对象找到对方

`FiberTree`中根节点主要是靠`createFiberRoot`生成的，React 在 createFiberRoot 之前会做一系列的准备工作

> ReactDOM.
> render --> legacyRenderSubtreeIntoContainer --> container.\_reactRootContainer = legacyCreateRootFromDOMContainer = ReactRoot = DOMRenderer.createContainer = createFiberRoot

```js
// 参数
element：{
  "$$typeof": Symbol(react.element),
  "key": null,
  "ref": null,
  "props": {},
  "_owner": null,
  "_store": {}
}
```

```js
render(
  element,
  container, // <div id="root"></div>
  callback,//undefined
) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}
```

- legacyRenderSubtreeIntoContainer

```js
function legacyRenderSubtreeIntoContainer(
  parentComponent, // null
  children, //同上
  container, // <div id="root"></div>
  forceHydrate, // false
  callback // undefined
) {
  container._reactRootContainer = legacyCreateRootFromDOMContainer(
    container,
    forceHydrate
  )
  root.render(children, callback)
  return DOMRenderer.getPublicRootInstance(root._internalRoot)
}
```

- legacyCreateRootFromDOMContainer

```js
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  return new ReactRoot(container, isConcurrent, shouldHydrate)
}
```

- ReactRoot

```js
function ReactRoot(container, isConcurrent, hydrate) {
  const root = DOMRenderer.createContainer(container, isConcurrent, hydrate)
  this._internalRoot = root
}
```

- createContainer

```js
export function createContainer(containerInfo, isConcurrent, hydrate) {
  return createFiberRoot(containerInfo, isConcurrent, hydrate)
}
```

### 1.1 createFiberRoot

生成`FiberRoot`和`RootFiber`,它们互相引用

> FiberRoot.current = RootFiber  
> RootFiber.stateNode = FiberRoot

- createFiberRoot

```js
export function createFiberRoot(containerInfo, isConcurrent, hydrate) {
  const uninitializedFiber = createHostRootFiber(isConcurrent)
  let root
  if (enableSchedulerTracing) {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,
      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,
      didError: false,
      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,
      interactionThreadID: unstable_getThreadID(),
      memoizedInteractions: new Set(),
      pendingInteractionMap: new Map(),
    }
  } else {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,
      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,
      didError: false,
      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,
    }
  }
  uninitializedFiber.stateNode = root
  return root
}
```

- createHostRootFiber

```js
export function createHostRootFiber(isConcurrent) {
  let mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext

  if (enableProfilerTimer && isDevToolsPresent) {
    mode |= ProfileMode
  }

  return createFiber(HostRoot, null, null, mode)
}
```

- createFiber

```js
const createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode)
}
```

- FiberNode

```js
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0
  this.ref = null
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.firstContextDependency = null
  this.mode = mode
  this.effectTag = NoEffect
  this.nextEffect = null
  this.firstEffect = null
  this.lastEffect = null
  this.expirationTime = NoWork
  this.childExpirationTime = NoWork
  this.alternate = null
  if (enableProfilerTimer) {
    this.actualDuration = 0
    this.actualStartTime = -1
    this.selfBaseDuration = 0
    this.treeBaseDuration = 0
  }
}
```

- Fiber

```js
export type Fiber = {
  tag: WorkTag,
  key: null | string,
  elementType: any,
  type: any,
  stateNode: any,
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,
  ref: null | (((handle: mixed) => void) & {_stringRef: ?string}) | RefObject,
  pendingProps: any,
  memoizedProps: any,
  updateQueue: UpdateQueue<any> | null,
  memoizedState: any,
  firstContextDependency: ContextDependency<mixed> | null,
  mode: TypeOfMode,
  effectTag: SideEffectTag,
  nextEffect: Fiber | null,
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,
  expirationTime: ExpirationTime,
  childExpirationTime: ExpirationTime,
  alternate: Fiber | null,
  actualDuration?: number,
  actualStartTime?: number,
  selfBaseDuration?: number,
  treeBaseDuration?: number,
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
|};
```

## 2.更新渲染 root 节点

- unbatchedUpdates

```js
function unbatchedUpdates(fn) {
  if (isBatchingUpdates && !isUnbatchingUpdates) {
    isUnbatchingUpdates = true
    try {
      return fn(a) //流程2：执行anonymous
    } finally {
      isUnbatchingUpdates = false
    }
  }
  return fn(a)
}
```

- ReactRoot.prototype.render

```js
ReactRoot.prototype.render = function (
  //流程3：执行React.render
  children, //同上
  callback // undefined
) {
  const root = this._internalRoot
  const work = new ReactWork()
  DOMRenderer.updateContainer(children, root, null, work._onCommit)
  return work
}
```

- updateContainer

```js
// 参数
container:  {
  containerInfo: div#root,
  context: null,
  `current`: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …},
  didError: false,
  earliestPendingTime: 0,
  earliestSuspendedTime: 0,
  expirationTime: 0,
  finishedWork: null,
  firstBatch: null,
  hydrate: false,
  interactionThreadID: 1,
  latestPendingTime: 0,
  latestPingedTime: 0,
  latestSuspendedTime: 0,
  memoizedInteractions: Set(0) {},
  nextExpirationTimeToWorkOn: 0,
  nextScheduledRoot: null,
  pendingChildren: null,
  pendingCommitExpirationTime: 0,
  pendingContext: null,
  pendingInteractionMap: Map(0) {},
  timeoutHandle: -1
}
```

```js
export function updateContainer(
  element, //同上
  container,
  parentComponent, //null
  callback
) {
  const current = container.current
  const currentTime = requestCurrentTime()
  const expirationTime = computeExpirationForFiber(currentTime, current)
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    callback
  )
}
```

- updateContainerAtExpirationTime

```js
export function updateContainerAtExpirationTime(
  element, // 同上
  container, // 同上
  parentComponent, //null
  expirationTime, //1
  callback
) {
  const current = container.current

  const context = getContextForSubtree(parentComponent)
  if (container.context === null) {
    container.context = context
  } else {
    container.pendingContext = context
  }

  return scheduleRootUpdate(current, element, expirationTime, callback)
}
```

- scheduleRootUpdate

```js
current: {
    actualDuration: 0
    actualStartTime: -1
    alternate: null
    child: null
    childExpirationTime: 0
    effectTag: 0
    elementType: null
    expirationTime: 0
    firstContextDependency: null
    firstEffect: null
    index: 0
    key: null
    lastEffect: null
    memoizedProps: null
    memoizedState: null
    mode: 0
    nextEffect: null
    pendingProps: null
    ref: null
    return: null
    selfBaseDuration: 0
    sibling: null
    stateNode: {current: FiberNode, containerInfo: div#root, pendingChildren: null, earliestPendingTime: 0, latestPendingTime: 0, …}
    tag: 3
    treeBaseDuration: 0
    type: null
    updateQueue: null
    _debugID: 1
    _debugIsCurrentlyTiming: false
    _debugOwner: null
    _debugSource: null
  }
```

```js
function scheduleRootUpdate(
  current,
  element, // 同上
  expirationTime, //1
  callback
) {
  const update = createUpdate(expirationTime) // 1.创建更新
  update.payload = { element }

  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }
  enqueueUpdate(current, update) // 2.将更新放进更新队列，将更新队列绑定到fiber上,也就是current
  scheduleWork(current, expirationTime) // 3.调用scheduleWork进行更新调度
  return expirationTime
}
```

### 2.1 创建更新

### 2.2 将生成的更新放入更新队列

- scheduleWork:进行调度更新
  给 fiber（current）设置优先级（expirationTime），然后调用`requestWork`

```js
function scheduleWork(
  fiber, // 同上
  expirationTime // 1
) {
  const root = scheduleWorkToRoot(fiber, expirationTime) //1.获取当前更新的root节点
  markPendingPriorityLevel(root, expirationTime) //2.将该root加入更新链表
  if (!isWorking || isCommitting || nextRoot !== root) {
    const rootExpirationTime = root.expirationTime
    requestWork(root, rootExpirationTime)
  }
}
```

- requestWork

```js
root:{
  containerInfo: div#root,
  `context`: {},
  current: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …},
  didError: false,
  `earliestPendingTime`: 1,
  earliestSuspendedTime: 0,
  `expirationTime`: 1,
  finishedWork: null
  firstBatch: null,
  hydrate: false,
  interactionThreadID: 1,
  `latestPendingTime`: 1,
  latestPingedTime: 0,
  latestSuspendedTime: 0,
  memoizedInteractions: Set(0) {},
  `nextExpirationTimeToWorkOn`: 1,
  nextScheduledRoot: null,
  pendingChildren: null,
  pendingCommitExpirationTime: 0,
  pendingContext: null,
  pendingInteractionMap: Map(0) {},
  timeoutHandle: -1
  }
```

```js
function requestWork(
  root,
  expirationTime // 1
) {
  addRootToSchedule(root, expirationTime)
  performSyncWork() //同步更新
}
```

- performSyncWork

```js
function performSyncWork() {
  performWork(Sync, null)
}
```

- performWork

```js
function performWork(
  minExpirationTime, //1
  dl
) {
  deadline = dl
  findHighestPriorityRoot()

  while (
    nextFlushedRoot !== null &&
    nextFlushedExpirationTime !== NoWork &&
    (minExpirationTime === NoWork ||
      minExpirationTime >= nextFlushedExpirationTime)
  ) {
    performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, true)
    findHighestPriorityRoot()
  }

  deadline = null
  deadlineDidExpire = false

  finishRendering()
}
```

- performWorkOnRoot

```js
root:{
  containerInfo: div#root
  context: {}
  current: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …}
  didError: false
  earliestPendingTime: 1
  earliestSuspendedTime: 0
  expirationTime: 1
  finishedWork: null
  firstBatch: null
  hydrate: false
  interactionThreadID: 1
  latestPendingTime: 1
  latestPingedTime: 0
  latestSuspendedTime: 0
  memoizedInteractions: Set(0) {}
  nextExpirationTimeToWorkOn: 1
  `nextScheduledRoot`: {current: FiberNode, containerInfo: div#root, pendingChildren: null, earliestPendingTime: 1, latestPendingTime: 1, …}
  pendingChildren: null
  pendingCommitExpirationTime: 0
  pendingContext: null
  pendingInteractionMap: Map(0) {}
  timeoutHandle: -1
  }
```

```js
function performWorkOnRoot(
  root,
  expirationTime, // 1
  isExpired //true
) {
  isRendering = true

  let finishedWork = root.finishedWork
  root.finishedWork = null

  const timeoutHandle = root.timeoutHandle
  const isYieldy = false //可中断
  renderRoot(root, isYieldy, isExpired)
  finishedWork = root.finishedWork
  if (finishedWork !== null) {
    completeRoot(root, finishedWork, expirationTime)
  }

  isRendering = false
}
```

### 2.3 中断

- renderRoot

```js
function renderRoot(
  root, //同上
  isYieldy, //false
  isExpired //true
) {
  isWorking = true
  ReactCurrentOwner.currentDispatcher = Dispatcher

  const expirationTime = root.nextExpirationTimeToWorkOn

  resetStack()
  nextRoot = root
  nextRenderExpirationTime = expirationTime
  nextUnitOfWork = createWorkInProgress(
    nextRoot.current,
    null,
    nextRenderExpirationTime
  )
  root.pendingCommitExpirationTime = NoWork

  if (enableSchedulerTracing) {
    const interactions = new Set()
    root.pendingInteractionMap.forEach(
      (scheduledInteractions, scheduledExpirationTime) => {
        if (scheduledExpirationTime <= expirationTime) {
          scheduledInteractions.forEach((interaction) =>
            interactions.add(interaction)
          )
        }
      }
    )
    root.memoizedInteractions = interactions
  }

  let prevInteractions
  if (enableSchedulerTracing) {
    prevInteractions = __interactionsRef.current
    __interactionsRef.current = root.memoizedInteractions
  }

  let didFatal = false

  startWorkLoopTimer(nextUnitOfWork)

  do {
    try {
      workLoop(isYieldy) //循环所有节点
    } catch (thrownValue) {}
    break
  } while (true)

  if (enableSchedulerTracing) {
    __interactionsRef.current = prevInteractions
  }

  isWorking = false
  ReactCurrentOwner.currentDispatcher = null
  resetContextDependences()

  const didCompleteRoot = true
  stopWorkLoopTimer(interruptedBy, didCompleteRoot)
  const rootWorkInProgress = root.current.alternate

  nextRoot = null
  interruptedBy = null

  onComplete(root, rootWorkInProgress, expirationTime)
}
```

- workLoop
- 如果不可中断，一直执行到为空为止
- 可中断，根据浏览器空运事件执行 performUnitOfWork

```js
function workLoop(
  isYieldy //false,可中断
) {
  if (!isYieldy) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
  }
}
```

### 2.4 创建子节点和兄弟节点

### 2.5 标识更新节点

- performUnitOfWork1

```js
workInProgress:{
  actualDuration: 0
  actualStartTime: -1
  alternate: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …}
  child: null
  childExpirationTime: 0
  effectTag: 0
  elementType: null
  expirationTime: 1
  firstContextDependency: null
  firstEffect: null
  index: 0
  key: null
  lastEffect: null
  memoizedProps: null
  memoizedState: null
  mode: 0
  nextEffect: null
  pendingProps: null
  ref: null
  return: null
  selfBaseDuration: 0
  sibling: null
  stateNode: {current: FiberNode, containerInfo: div#root, pendingChildren: null, earliestPendingTime: 1, latestPendingTime: 1, …}
  tag: 3
  treeBaseDuration: 0
  type: null
  updateQueue: {baseState: null, firstUpdate: {…}, lastUpdate: {…}, firstCapturedUpdate: null, lastCapturedUpdate: null, …}
  _debugID: 1
  _debugIsCurrentlyTiming: false
  _debugOwner: null
  _debugSource: null
}
```

```js
function performUnitOfWork(workInProgress) {
  const current = workInProgress.alternate

  startWorkTimer(workInProgress)

  let next
  if (enableProfilerTimer) {
    next = beginWork(current, workInProgress, nextRenderExpirationTime)
    workInProgress.memoizedProps = workInProgress.pendingProps

    if (workInProgress.mode & ProfileMode) {
      stopProfilerTimerIfRunningAndRecordDelta(workInProgress, true)
    }
  }

  if (next === null) {
    next = completeUnitOfWork(workInProgress)
  }

  ReactCurrentOwner.current = null

  return next
}
```

- beginWork1

```js
current:{
  actualDuration: 0
  actualStartTime: -1
  alternate: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …}
  child: null
  childExpirationTime: 0
  effectTag: 0
  elementType: null
  expirationTime: 1
  firstContextDependency: null
  firstEffect: null
  index: 0
  key: null
  lastEffect: null
  memoizedProps: null
  memoizedState: null
  mode: 0
  nextEffect: null
  pendingProps: null
  ref: null
  return: null
  selfBaseDuration: 0
  sibling: null
  stateNode: {current: FiberNode, containerInfo: div#root, pendingChildren: null, earliestPendingTime: 1, latestPendingTime: 1, …}
  tag: 3
  treeBaseDuration: 0
  type: null
  updateQueue: {baseState: null, firstUpdate: {…}, lastUpdate: {…}, firstCapturedUpdate: null, lastCapturedUpdate: null, …}
  _debugID: 1
  _debugIsCurrentlyTiming: false
  _debugOwner: null
  _debugSource: null
}
```

```js
function beginWork(
  current,
  workInProgress, //同上
  renderExpirationTime //1
) {
  const updateExpirationTime = workInProgress.expirationTime
  workInProgress.expirationTime = NoWork

  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderExpirationTime)
  }
}
```

- updateHostRoot

```js
workInProgress:{
  actualDuration: 0
  actualStartTime: -1
  alternate: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …}
  child: null
  childExpirationTime: 0
  effectTag: 0
  elementType: null
  `expirationTime`: 0
  firstContextDependency: null
  firstEffect: null
  index: 0
  key: null
  lastEffect: null
  memoizedProps: null
  memoizedState: null
  mode: 0
  nextEffect: null
  pendingProps: null
  ref: null
  return: null
  selfBaseDuration: 0
  sibling: null
  stateNode: {current: FiberNode, containerInfo: div#root, pendingChildren: null, earliestPendingTime: 1, latestPendingTime: 1, …}
  tag: 3
  treeBaseDuration: 0
  type: null
  updateQueue: {baseState: null, firstUpdate: {…}, lastUpdate: {…}, firstCapturedUpdate: null, lastCapturedUpdate: null, …}
  _debugID: 1
  _debugIsCurrentlyTiming: false
  _debugOwner: null
  _debugSource: null
}
```

```js
function updateHostRoot(
  current, //同上
  workInProgress,
  renderExpirationTime
) {
  pushHostRootContext(workInProgress)
  var updateQueue = workInProgress.updateQueue

  var nextProps = workInProgress.pendingProps
  var prevState = workInProgress.memoizedState
  var prevChildren = prevState !== null ? prevState.element : null
  processUpdateQueue(
    workInProgress,
    updateQueue,
    nextProps,
    null,
    renderExpirationTime
  )
  var nextState = workInProgress.memoizedState
  var nextChildren = nextState.element

  var root = workInProgress.stateNode
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)
  resetHydrationState()
  return workInProgress.child
}
```

- performUnitOfWork2

```js
workInProgress:{
  `workInProgress` = FiberNode {tag: 2, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
  `Local`
  `current$$1`: undefined
  `next`: undefined
  `this`: undefined
  `workInProgress`: FiberNode {tag: 2, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
  `Closure`
  `Closure` (./node_modules/react-dom/cjs/react-dom.development.js)
  `Window`
  `Global`
  `FiberNode`
  actualDuration: 0
  actualStartTime: -1
  `alternate`: null
  child: null
  childExpirationTime: 0
  `effectTag`: 2
  `elementType`: ƒ App()
  `expirationTime`: 1
  firstContextDependency: null
  firstEffect: null
  index: 0
  key: null
  lastEffect: null
  memoizedProps: null
  memoizedState: null
  mode: 0
  nextEffect: null
  `pendingProps`: {}
  ref: null
  `return`: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …}
  selfBaseDuration: 0
  `sibling`: null
  `stateNode`: null
  `tag`: 2
  treeBaseDuration: 0
  `type`: ƒ App()
  `updateQueue`: null
  `_debugID`: 4
  `_debugIsCurrentlyTiming`: false
  _debugOwner: null
  _debugSource: null
}
```

```js
function performUnitOfWork(workInProgress) {
  const current = workInProgress.alternate

  startWorkTimer(workInProgress)

  let next
  if (enableProfilerTimer) {
    next = beginWork(current, workInProgress, nextRenderExpirationTime)
    workInProgress.memoizedProps = workInProgress.pendingProps

    if (workInProgress.mode & ProfileMode) {
      stopProfilerTimerIfRunningAndRecordDelta(workInProgress, true)
    }
  }

  if (next === null) {
    next = completeUnitOfWork(workInProgress)
  }

  ReactCurrentOwner.current = null

  return next
}
```

- beginWork2

```js
function beginWork(
  current,//null
  workInProgress,//同上
  renderExpirationTime,//1
){
  const updateExpirationTime = workInProgress.expirationTime;
  workInProgress.expirationTime = NoWork;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
      {
        var elementType = workInProgress.elementType;
        return mountIndeterminateComponent(current, workInProgress, elementType, renderExpirationTime);
      }
}
```

### 2.6 commitRoot

提交阶段

- mountIndeterminateComponent

```js
workInProgress:{
  actualDuration: 0
  actualStartTime: -1
  alternate: null
  child: null
  childExpirationTime: 0
  effectTag: 3
  elementType: ƒ App()
  `expirationTime`: 0
  firstContextDependency: null
  firstEffect: null
  index: 0
  key: null
  lastEffect: null
  memoizedProps: null
  memoizedState: null
  mode: 0
  nextEffect: null
  pendingProps: {}
  ref: null
  return: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: {…}, …}
  selfBaseDuration: 0
  sibling: null
  stateNode: null
  tag: 2
  treeBaseDuration: 0
  type: ƒ App()
  updateQueue: null
  _debugID: 4
  _debugIsCurrentlyTiming: true
  _debugOwner: null
  _debugSource: null
}
```

```js
function mountIndeterminateComponent(
  _current, //null
  workInProgress,
  Component, //App
  renderExpirationTime //1
) {
  const props = workInProgress.pendingProps
  const unmaskedContext = getUnmaskedContext(workInProgress, Component, false)
  const context = getMaskedContext(workInProgress, unmaskedContext)

  prepareToReadContext(workInProgress, renderExpirationTime)

  let value
  value = Component(props, context)
  workInProgress.effectTag |= PerformedWork
  workInProgress.tag = FunctionComponent
  reconcileChildren(null, workInProgress, value, renderExpirationTime)
  return workInProgress.child
}
```

- App

```js
function App() {
  return <div>hello</div>
}
```

![](./1.1.png)
