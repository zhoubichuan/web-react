---
nav:
  title: 源码知识
  order: 3
group:
  title: react-dom
  order: 2
title: 提交 root（dom 更新前）
order: 11
---

# 提交 root（dom 更新前）

commitBeforeMutationLifecycles

```js
function commitBeforeMutationLifecycles() {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag
    if (effectTag & Snapshot) {
      recordEffect()
      const current = nextEffect.alternate
      commitBeforeMutationLifeCycles(current, nextEffect)
    }

    // Don't cleanup effects yet;
    // This will be done by commitAllLifeCycles()
    nextEffect = nextEffect.nextEffect
  }
}
```
