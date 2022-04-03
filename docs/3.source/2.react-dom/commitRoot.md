---
nav:
  title: 源码知识
  order: 3
group:
  title: react-dom
  order: 2
title: 提交 root
order: 10
---

# 提交 root

主要任务是把之前记录好的更新操作反映到真实 dom 上，并且这个过程是不能中断的。

- 1.检查 finishedWork 是否也有 effect，如果有插入 effect 链表中

## 3.1 commitBeforeMutationLifecycles

第一次遍历 effect 链，更新 class 组件实例上的 state,props,执行 getSnapshotBeforeUpdate 生命周期

## 3.2 commitAllHostEffects

- 3.第二次遍历 effect 链，不同的 effectTag,执行不同的操作，比如重置文本节点，执行 插入、更新、删除等的 effect 链，真正的对 dom 进行修改。

## 3.3 commitAllLifeCycles

- 4.第三次遍历 effect 链，这次遍历就是做一些收尾工作。执行 componentDidMount、componentDidUpdate，更新的回调函数等。
- 5.做一些 还原变量 等的收尾工作。
