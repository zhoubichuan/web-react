---
nav:
  title: 源码知识
  order: 3
group:
  title: react-dom
  order: 2
title: 提交 root（dom 更新后）
order: 13
---

# 提交 root（dom 更新后）

commitAllLifeCycles

```js
function commitAllLifeCycles(
  finishedRoot: FiberRoot,
  committedExpirationTime: ExpirationTime
) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag

    if (effectTag & (Update | Callback)) {
      recordEffect()
      const current = nextEffect.alternate
      commitLifeCycles(
        finishedRoot,
        current,
        nextEffect,
        committedExpirationTime
      )
    }

    if (effectTag & Ref) {
      recordEffect()
      commitAttachRef(nextEffect)
    }

    const next = nextEffect.nextEffect

    nextEffect.nextEffect = null

    nextEffect = next
  }
}
```
