---
nav:
  title: 源码知识
  order: 3
group:
  title: react-dom
  order: 2
title: 提交 root（dom 更新中）
order: 12
---

# 提交 root（dom 更新中）

commitAllHostEffects

```js
function commitAllHostEffects() {
  while (nextEffect !== null) {
    recordEffect()

    const effectTag = nextEffect.effectTag

    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect)
    }

    if (effectTag & Ref) {
      const current = nextEffect.alternate
      if (current !== null) {
        commitDetachRef(current)
      }
    }

    let primaryEffectTag = effectTag & (Placement | Update | Deletion)
    switch (primaryEffectTag) {
      case Placement: {
        commitPlacement(nextEffect)

        nextEffect.effectTag &= ~Placement
        break
      }
      case PlacementAndUpdate: {
        commitPlacement(nextEffect)

        nextEffect.effectTag &= ~Placement

        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      case Update: {
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      case Deletion: {
        commitDeletion(nextEffect)
        break
      }
    }
    nextEffect = nextEffect.nextEffect
  }
}
```
