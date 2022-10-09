---
title: Button
nav:
  path: /components
---

# Button

## 1.默认按钮

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button, ConfigProvider } from 'myantd'
import React from 'react'
const App: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="myantd">
        <Button type="primary" size="large">
          保 存
        </Button>
        <Button type="default" size="large">
          取 消
        </Button>
        <Button type="link">编辑</Button>
        <Button type="link">查看</Button>
      </div>
    </ConfigProvider>
  )
}
export default App
```

## 2.评分按钮

```tsx
/**
 * title: 评分按钮
 * desc: 按钮有三种类型：合格、良好、不合格。
 */
import { Button, ConfigProvider } from 'myantd'
import React from 'react'
const App: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="myantd">
        <Button.Rate icon="qualified">
          <span>合格</span>
        </Button.Rate>
        <Button.Rate icon="good">
          <span>良好</span>
        </Button.Rate>
        <Button.Rate icon="unqualified">
          <span>不合格</span>
        </Button.Rate>
      </div>
    </ConfigProvider>
  )
}
export default App
```

## 3.图片按钮

```tsx
/**
 * title: 图片按钮
 * desc: 按钮有六种类型：搜索、刷新、告警、添加、展开、收起、重置。
 */
import { Button } from 'myantd'
import React from 'react'
const App: React.FC = () => {
  return (
    <div className="myantd">
      <Button.Image type="primary" icon="search" size="large">
        搜索
      </Button.Image>
      <Button.Image icon="refresh" size="large">
        刷新
      </Button.Image>
      <Button.Image type="primary" icon="alarm" size="large">
        告警
      </Button.Image>
      <Button.Image type="primary" icon="add" size="large">
        添加
      </Button.Image>
      <Button.Image icon="arrowleft" size="large">
        展开
      </Button.Image>
      <Button.Image icon="arrowright" size="large">
        收起
      </Button.Image>
    </div>
  )
}
export default App
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
