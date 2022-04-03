---
nav:
  title: 源码知识
  order: 3
group:
  title: react-dom
  order: 2
title: react-reconciler
order: 14
---

# react-reconciler

## updateContainer

```js
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function
): ExpirationTime {
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

## requestCurrentTime

```js
function requestCurrentTime() {
  if (isRendering) {
    return currentSchedulerTime
  }
  findHighestPriorityRoot()
  if (
    nextFlushedExpirationTime === NoWork ||
    nextFlushedExpirationTime === Never
  ) {
    recomputeCurrentRendererTime()
    currentSchedulerTime = currentRendererTime
    return currentSchedulerTime
  }
  return currentSchedulerTime
}
```

## computeExpirationForFiber

```js
function computeExpirationForFiber(currentTime: ExpirationTime, fiber: Fiber) {
  let expirationTime //优先级
  if (expirationContext !== NoWork) {
    expirationTime = expirationContext
  } else if (isWorking) {
    if (isCommitting) {
      expirationTime = Sync
    } else {
      expirationTime = nextRenderExpirationTime
    }
  } else {
    if (fiber.mode & ConcurrentMode) {
      if (isBatchingInteractiveUpdates) {
        expirationTime = computeInteractiveExpiration(currentTime) //高优先级更新
      } else {
        expirationTime = computeAsyncExpiration(currentTime) //低优先级更新
      }
      if (nextRoot !== null && expirationTime === nextRenderExpirationTime) {
        expirationTime += 1
      }
    } else {
      expirationTime = Sync
    }
  }
  if (isBatchingInteractiveUpdates) {
    if (expirationTime > lowestPriorityPendingInteractiveExpirationTime) {
      lowestPriorityPendingInteractiveExpirationTime = expirationTime
    }
  }
  return expirationTime
}
```

## updateContainerAtExpirationTime

```js
export function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  expirationTime: ExpirationTime,
  callback: ?Function
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

## scheduleRootUpdate

```js
function scheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  expirationTime: ExpirationTime,
  callback: ?Function
) {
  const update = createUpdate(expirationTime)
  update.payload = { element }

  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }
  enqueueUpdate(current, update)

  scheduleWork(current, expirationTime)
  return expirationTime
}
```

## scheduleWork

```js
function scheduleWork(fiber: Fiber, expirationTime: ExpirationTime) {
  const root = scheduleWorkToRoot(fiber, expirationTime) //1.找到更新对应的FiberRoot节点，按照树的结构通过fiber.return一层层的返回，直到找到根节点。在向上找的过程中不断的更新每个节点对应的fiber对象childExpirationTime。并且alternate同步更新。
  if (root === null) {
    return
  }

  if (
    !isWorking &&
    nextRenderExpirationTime !== NoWork &&
    expirationTime < nextRenderExpirationTime
  ) {
    //发现当前更新的优先级高于上一个任务，则重置stack，回退任务
    interruptedBy = fiber
    resetStack()
  }
  markPendingPriorityLevel(root, expirationTime)
  if (!isWorking || isCommitting || nextRoot !== root) {
    const rootExpirationTime = root.expirationTime
    requestWork(root, rootExpirationTime) //请求调度任务
  }
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    //在某些生命周期函数中setState会造成无限循环，这里是告诉你的代码触发无限循环了
    nestedUpdateCount = 0
  }
}
```

## resetStack

```js
function resetStack() {
  if (nextUnitOfWork !== null) {
    let interruptedWork = nextUnitOfWork.return
    while (interruptedWork !== null) {
      //开始一步一步往上恢复，前一个执行的任务需要回退一步，因为现在有更高优先级的任务需要执行
      unwindInterruptedWork(interruptedWork)
      interruptedWork = interruptedWork.return
    }
  }

  nextRoot = null
  nextRenderExpirationTime = NoWork
  nextLatestAbsoluteTimeoutMs = -1
  nextRenderDidError = false
  nextUnitOfWork = null
}
```

### unwindInterruptedWork

```js
function unwindInterruptedWork(interruptedWork: Fiber) {
  switch (interruptedWork.tag) {
    case ClassComponent: {
      const childContextTypes = interruptedWork.type.childContextTypes
      if (childContextTypes !== null && childContextTypes !== undefined) {
        popLegacyContext(interruptedWork)
      }
      break
    }
    case HostRoot: {
      popHostContainer(interruptedWork)
      popTopLevelLegacyContextObject(interruptedWork)
      break
    }
    case HostComponent: {
      popHostContext(interruptedWork)
      break
    }
    case HostPortal:
      popHostContainer(interruptedWork)
      break
    case ContextProvider:
      popProvider(interruptedWork)
      break
    default:
      break
  }
}
```

## requestWork

```js
function requestWork(root: FiberRoot, expirationTime: ExpirationTime) {
  addRootToSchedule(root, expirationTime) //将Root加入到Schedule（addRootToSchedule），如果此root已经调度过（已经在scheduleRoot的单向链表中），可能更新root.expirationTime
  if (isRendering) {
    return
  }

  if (isBatchingUpdates) {
    if (isUnbatchingUpdates) {
      nextFlushedRoot = root
      nextFlushedExpirationTime = Sync
      performWorkOnRoot(root, Sync, true)
    }
    return
  }

  if (expirationTime === Sync) {
    performSyncWork() //同步任务
  } else {
    scheduleCallbackWithExpirationTime(root, expirationTime) //异步任务
  }
}
```

### addRootToSchedule

```js
function addRootToSchedule(root: FiberRoot, expirationTime: ExpirationTime) {
  if (root.nextScheduledRoot === null) {
    root.expirationTime = expirationTime
    if (lastScheduledRoot === null) {
      //当前没有要处理的root
      firstScheduledRoot = lastScheduledRoot = root
      root.nextScheduledRoot = root
    } else {
      lastScheduledRoot.nextScheduledRoot = root
      lastScheduledRoot = root
      lastScheduledRoot.nextScheduledRoot = firstScheduledRoot
    }
  } else {
    const remainingExpirationTime = root.expirationTime
    if (
      remainingExpirationTime === NoWork ||
      expirationTime < remainingExpirationTime
    ) {
      root.expirationTime = expirationTime
    }
  }
}
```

## performSyncWork

```js
function performSyncWork() {
  performWork(Sync, null)
}
```

### scheduleCallbackWithExpirationTime

```js
function scheduleCallbackWithExpirationTime(
  root: FiberRoot,
  expirationTime: ExpirationTime
) {
  if (callbackExpirationTime !== NoWork) {
    // 判断上一个callback是否执行完毕
    if (expirationTime > callbackExpirationTime) {
      //当前任务如果优先级小于上个任务就退出
      return
    } else {
      if (callbackID !== null) {
        cancelDeferredCallback(callbackID)
      }
    }
  } else {
    startRequestCallbackTimer()
  }

  callbackExpirationTime = expirationTime
  const currentMs = now() - originalStartTimeMs //当前performance.now() - 程序刚执行时的performance.now()
  const expirationTimeMs = expirationTimeToMs(expirationTime) //转换ms
  const timeout = expirationTimeMs - currentMs //当前任务的延迟过期时间，由过期时间 - 当前任务创建时间 = 超过时代表任务过期需要强制更新
  callbackID = scheduleDeferredCallback(performAsyncWork, { timeout }) //生成一个callbackID，用于关闭任务
}
```

## performWork

任务执行

```js
function performWork(minExpirationTime: ExpirationTime, dl: Deadline | null) {
  deadline = dl

  findHighestPriorityRoot()

  if (deadline !== null) {
    //同步任务，不考虑帧渲染是否有空余时间，同步任务也没有过期时间
    recomputeCurrentRendererTime()
    currentSchedulerTime = currentRendererTime

    if (enableUserTimingAPI) {
      const didExpire = nextFlushedExpirationTime < currentRendererTime
      const timeout = expirationTimeToMs(nextFlushedExpirationTime)
      stopRequestCallbackTimer(didExpire, timeout)
    }

    while (
      nextFlushedRoot !== null &&
      nextFlushedExpirationTime !== NoWork &&
      (minExpirationTime === NoWork ||
        minExpirationTime >= nextFlushedExpirationTime) &&
      (!deadlineDidExpire || currentRendererTime >= nextFlushedExpirationTime)
    ) {
      //遍历所有的root，并且把所有root中同步的任务全部执行掉
      performWorkOnRoot(
        nextFlushedRoot,
        nextFlushedExpirationTime,
        currentRendererTime >= nextFlushedExpirationTime
      )
      findHighestPriorityRoot()
      recomputeCurrentRendererTime()
      currentSchedulerTime = currentRendererTime
    }
  } else {
    //异步任务
    while (
      nextFlushedRoot !== null &&
      nextFlushedExpirationTime !== NoWork &&
      (minExpirationTime === NoWork ||
        minExpirationTime >= nextFlushedExpirationTime)
    ) {
      //遍历所有root，执行完所有root中的过期任务，因为过期任务是必须要执行的。如果这一帧还有空闲时间，尽可能的执行更多任务
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, true)
      findHighestPriorityRoot()
    }
  }

  if (deadline !== null) {
    callbackExpirationTime = NoWork
    callbackID = null
  }
  if (nextFlushedExpirationTime !== NoWork) {
    scheduleCallbackWithExpirationTime(
      ((nextFlushedRoot: any): FiberRoot),
      nextFlushedExpirationTime
    )
  }

  // Clean-up.
  deadline = null
  deadlineDidExpire = false

  finishRendering()
}
```

## performWorkOnRoot

执行任务的两个阶段

- renderRoot 渲染阶段
- completeRoot 提交阶段

```js
function performWorkOnRoot(
  root: FiberRoot,
  expirationTime: ExpirationTime,
  isExpired: boolean
) {
  isRendering = true

  if (deadline === null || isExpired) {
    //同步任务或者任务已经过期，不可以打断任务

    let finishedWork = root.finishedWork
    if (finishedWork !== null) {
      //是否存在已经完成的finishedWork,存在就完成它
      completeRoot(root, finishedWork, expirationTime)
    } else {
      root.finishedWork = null
      const timeoutHandle = root.timeoutHandle
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout
        cancelTimeout(timeoutHandle)
      }
      const isYieldy = false
      renderRoot(root, isYieldy, isExpired)
      finishedWork = root.finishedWork
      if (finishedWork !== null) {
        completeRoot(root, finishedWork, expirationTime)
      }
    }
  } else {
    //异步任务
    let finishedWork = root.finishedWork
    if (finishedWork !== null) {
      completeRoot(root, finishedWork, expirationTime)
    } else {
      root.finishedWork = null
      const timeoutHandle = root.timeoutHandle
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout
        cancelTimeout(timeoutHandle)
      }
      const isYieldy = true //可以中断
      renderRoot(root, isYieldy, isExpired)
      finishedWork = root.finishedWork
      if (finishedWork !== null) {
        if (!shouldYield()) {
          //这一帧还有空余时间，执行completeRoot
          completeRoot(root, finishedWork, expirationTime)
        } else {
          //没有空余时间，等下一帧
          root.finishedWork = finishedWork
        }
      }
    }
  }

  isRendering = false
}
```

## renderRoot

```js
function renderRoot(
  root: FiberRoot,
  isYieldy: boolean,
  isExpired: boolean
): void {
  isWorking = true
  ReactCurrentOwner.currentDispatcher = Dispatcher

  const expirationTime = root.nextExpirationTimeToWorkOn

  if (
    expirationTime !== nextRenderExpirationTime ||
    root !== nextRoot ||
    nextUnitOfWork === null
  ) {
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
      const interactions: Set<Interaction> = new Set()
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

      if (interactions.size > 0) {
        const subscriber = __subscriberRef.current
        if (subscriber !== null) {
          const threadID = computeThreadID(
            expirationTime,
            root.interactionThreadID
          )
          try {
            subscriber.onWorkStarted(interactions, threadID)
          } catch (error) {
            if (!hasUnhandledError) {
              hasUnhandledError = true
              unhandledError = error
            }
          }
        }
      }
    }
  }

  let prevInteractions: Set<Interaction> = (null: any)
  if (enableSchedulerTracing) {
    prevInteractions = __interactionsRef.current
    __interactionsRef.current = root.memoizedInteractions
  }

  let didFatal = false

  startWorkLoopTimer(nextUnitOfWork)

  do {
    try {
      workLoop(isYieldy)
    } catch (thrownValue) {
      if (nextUnitOfWork === null) {
        didFatal = true
        onUncaughtError(thrownValue)
      } else {
        const failedUnitOfWork: Fiber = nextUnitOfWork

        const sourceFiber: Fiber = nextUnitOfWork
        let returnFiber = sourceFiber.return
        if (returnFiber === null) {
          didFatal = true
          onUncaughtError(thrownValue)
        } else {
          throwException(
            root,
            returnFiber,
            sourceFiber,
            thrownValue,
            nextRenderExpirationTime
          )
          nextUnitOfWork = completeUnitOfWork(sourceFiber)
          continue
        }
      }
    }
    break
  } while (true)

  if (enableSchedulerTracing) {
    // Traced work is done for now; restore the previous interactions.
    __interactionsRef.current = prevInteractions
  }

  // We're done performing work. Time to clean up.
  isWorking = false
  ReactCurrentOwner.currentDispatcher = null
  resetContextDependences()

  // Yield back to main thread.
  if (didFatal) {
    const didCompleteRoot = false
    stopWorkLoopTimer(interruptedBy, didCompleteRoot)
    interruptedBy = null

    nextRoot = null
    onFatal(root)
    return
  }

  if (nextUnitOfWork !== null) {
    const didCompleteRoot = false
    stopWorkLoopTimer(interruptedBy, didCompleteRoot)
    interruptedBy = null
    onYield(root)
    return
  }

  // We completed the whole tree.
  const didCompleteRoot = true
  stopWorkLoopTimer(interruptedBy, didCompleteRoot)
  const rootWorkInProgress = root.current.alternate

  nextRoot = null
  interruptedBy = null

  if (nextRenderDidError) {
    // There was an error
    if (hasLowerPriorityWork(root, expirationTime)) {
      markSuspendedPriorityLevel(root, expirationTime)
      const suspendedExpirationTime = expirationTime
      const rootExpirationTime = root.expirationTime
      onSuspend(
        root,
        rootWorkInProgress,
        suspendedExpirationTime,
        rootExpirationTime,
        -1 // Indicates no timeout
      )
      return
    } else if (!root.didError && !isExpired) {
      root.didError = true
      const suspendedExpirationTime = (root.nextExpirationTimeToWorkOn = expirationTime)
      const rootExpirationTime = (root.expirationTime = Sync)
      onSuspend(
        root,
        rootWorkInProgress,
        suspendedExpirationTime,
        rootExpirationTime,
        -1 // Indicates no timeout
      )
      return
    }
  }

  if (!isExpired && nextLatestAbsoluteTimeoutMs !== -1) {
    const suspendedExpirationTime = expirationTime
    markSuspendedPriorityLevel(root, suspendedExpirationTime)

    const earliestExpirationTime = findEarliestOutstandingPriorityLevel(
      root,
      expirationTime
    )
    const earliestExpirationTimeMs = expirationTimeToMs(earliestExpirationTime)
    if (earliestExpirationTimeMs < nextLatestAbsoluteTimeoutMs) {
      nextLatestAbsoluteTimeoutMs = earliestExpirationTimeMs
    }

    const currentTimeMs = expirationTimeToMs(requestCurrentTime())
    let msUntilTimeout = nextLatestAbsoluteTimeoutMs - currentTimeMs
    msUntilTimeout = msUntilTimeout < 0 ? 0 : msUntilTimeout

    const rootExpirationTime = root.expirationTime
    onSuspend(
      root,
      rootWorkInProgress,
      suspendedExpirationTime,
      rootExpirationTime,
      msUntilTimeout
    )
    return
  }

  onComplete(root, rootWorkInProgress, expirationTime)
}
```

## workLoop

```js
function workLoop(isYieldy) {
  if (!isYieldy) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
  } else {
    while (nextUnitOfWork !== null && !shouldYield()) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
  }
}
```

## performUnitOfWork

```js
function performUnitOfWork(workInProgress: Fiber): Fiber | null {
  const current = workInProgress.alternate

  startWorkTimer(workInProgress)

  let next
  if (enableProfilerTimer) {
    if (workInProgress.mode & ProfileMode) {
      startProfilerTimer(workInProgress)
    }

    next = beginWork(current, workInProgress, nextRenderExpirationTime)
    workInProgress.memoizedProps = workInProgress.pendingProps

    if (workInProgress.mode & ProfileMode) {
      stopProfilerTimerIfRunningAndRecordDelta(workInProgress, true)
    }
  } else {
    next = beginWork(current, workInProgress, nextRenderExpirationTime)
    workInProgress.memoizedProps = workInProgress.pendingProps
  }

  if (next === null) {
    next = completeUnitOfWork(workInProgress)
  }

  ReactCurrentOwner.current = null

  return next
}
```

## beginWork

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderExpirationTime: ExpirationTime
): Fiber | null {
  const updateExpirationTime = workInProgress.expirationTime

  if (current !== null) {
    // ------如果满足以下条件React会判断当前节点是不需要更新的---------
    const oldProps = current.memoizedProps //老的props
    const newProps = workInProgress.pendingProps //新的props
    if (
      oldProps === newProps && // 新旧props比较
      !hasLegacyContextChanged() && // 是否有老版本的context使用并且发生变化
      (updateExpirationTime === NoWork ||
        updateExpirationTime > renderExpirationTime) //当前节点是否需要更新以及他的更新优先级是否在当前更新优先级之前
    ) {
      // ------------------------------------------------------------
      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress)
          resetHydrationState()
          break
        case HostComponent:
          pushHostContext(workInProgress)
          break
        case ClassComponent: {
          const Component = workInProgress.type
          if (isLegacyContextProvider(Component)) {
            pushLegacyContextProvider(workInProgress)
          }
          break
        }
        case HostPortal:
          pushHostContainer(
            workInProgress,
            workInProgress.stateNode.containerInfo
          )
          break
        case ContextProvider: {
          const newValue = workInProgress.memoizedProps.value
          pushProvider(workInProgress, newValue)
          break
        }
        case Profiler:
          if (enableProfilerTimer) {
            workInProgress.effectTag |= Update
          }
          break
        case SuspenseComponent: {
          const state: SuspenseState | null = workInProgress.memoizedState
          const didTimeout = state !== null && state.didTimeout
          if (didTimeout) {
            const primaryChildFragment: Fiber = (workInProgress.child: any)
            const primaryChildExpirationTime =
              primaryChildFragment.childExpirationTime
            if (
              primaryChildExpirationTime !== NoWork &&
              primaryChildExpirationTime <= renderExpirationTime
            ) {
              return updateSuspenseComponent(
                current,
                workInProgress,
                renderExpirationTime
              )
            } else {
              const child = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderExpirationTime
              )
              if (child !== null) {
                return child.sibling
              } else {
                return null
              }
            }
          }
          break
        }
      }
      return bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderExpirationTime
      )
    }
  }

  // Before entering the begin phase, clear the expiration time.
  workInProgress.expirationTime = NoWork

  switch (workInProgress.tag) {
    case IndeterminateComponent: {
      const elementType = workInProgress.elementType
      return mountIndeterminateComponent(
        current,
        workInProgress,
        elementType,
        renderExpirationTime
      )
    }
    case LazyComponent: {
      const elementType = workInProgress.elementType
      return mountLazyComponent(
        current,
        workInProgress,
        elementType,
        updateExpirationTime,
        renderExpirationTime
      )
    }
    case FunctionComponent: {
      const Component = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps)
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderExpirationTime
      )
    }
    case ClassComponent: {
      const Component = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps)
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderExpirationTime
      )
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderExpirationTime)
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderExpirationTime)
    case HostText:
      return updateHostText(current, workInProgress)
    case SuspenseComponent:
      return updateSuspenseComponent(
        current,
        workInProgress,
        renderExpirationTime
      )
    case HostPortal:
      return updatePortalComponent(
        current,
        workInProgress,
        renderExpirationTime
      )
    case ForwardRef: {
      const type = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps =
        workInProgress.elementType === type
          ? unresolvedProps
          : resolveDefaultProps(type, unresolvedProps)
      return updateForwardRef(
        current,
        workInProgress,
        type,
        resolvedProps,
        renderExpirationTime
      )
    }
    case Fragment:
      return updateFragment(current, workInProgress, renderExpirationTime)
    case Mode:
      return updateMode(current, workInProgress, renderExpirationTime)
    case Profiler:
      return updateProfiler(current, workInProgress, renderExpirationTime)
    case ContextProvider:
      return updateContextProvider(
        current,
        workInProgress,
        renderExpirationTime
      )
    case ContextConsumer:
      return updateContextConsumer(
        current,
        workInProgress,
        renderExpirationTime
      )
    case MemoComponent: {
      const type = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps = resolveDefaultProps(type.type, unresolvedProps)
      return updateMemoComponent(
        current,
        workInProgress,
        type,
        resolvedProps,
        updateExpirationTime,
        renderExpirationTime
      )
    }
    case SimpleMemoComponent: {
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateExpirationTime,
        renderExpirationTime
      )
    }
    case IncompleteClassComponent: {
      const Component = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps)
      return mountIncompleteClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderExpirationTime
      )
    }
    default:
  }
}
```

## mountIndeterminateComponent

```js
function mountIndeterminateComponent(
  _current,
  workInProgress,
  Component,
  renderExpirationTime
) {
  if (_current !== null) {
    _current.alternate = null
    workInProgress.alternate = null
    workInProgress.effectTag |= Placement
  }

  const props = workInProgress.pendingProps
  const unmaskedContext = getUnmaskedContext(workInProgress, Component, false)
  const context = getMaskedContext(workInProgress, unmaskedContext)

  prepareToReadContext(workInProgress, renderExpirationTime)

  let value

  value = Component(props, context)
  workInProgress.effectTag |= PerformedWork

  if (
    typeof value === "object" &&
    value !== null &&
    typeof value.render === "function" &&
    value.$$typeof === undefined
  ) {
    workInProgress.tag = ClassComponent
    let hasContext = false
    if (isLegacyContextProvider(Component)) {
      hasContext = true
      pushLegacyContextProvider(workInProgress)
    } else {
      hasContext = false
    }

    workInProgress.memoizedState =
      value.state !== null && value.state !== undefined ? value.state : null

    const getDerivedStateFromProps = Component.getDerivedStateFromProps
    if (typeof getDerivedStateFromProps === "function") {
      applyDerivedStateFromProps(
        workInProgress,
        Component,
        getDerivedStateFromProps,
        props
      )
    }

    adoptClassInstance(workInProgress, value)
    mountClassInstance(workInProgress, Component, props, renderExpirationTime)
    return finishClassComponent(
      null,
      workInProgress,
      Component,
      true,
      hasContext,
      renderExpirationTime
    )
  } else {
    workInProgress.tag = FunctionComponent
    reconcileChildren(null, workInProgress, value, renderExpirationTime)
    return workInProgress.child
  }
}
```
