---
title: Button
nav:
  path: /components
---

# Button

- 默认按钮

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button } from 'myantd';
import React from 'react';
const App: React.FC = () => {
  return (
    <div className="myantd">
      <Button type="primary">保存</Button>
      <Button type="default">保存</Button>
      <Button.Default>重置</Button.Default>
    </div>
  );
};
export default App;
```

- 评分按钮

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button } from 'myantd';
import React from 'react';
const App: React.FC = () => {
  return (
    <div className="myantd">
      <Button ratebtn="qualified">
        <span>合格</span>
      </Button>
      <Button ratebtn="good">
        <span>良好</span>
      </Button>
      <Button ratebtn="unqualified">
        <span>不合格</span>
      </Button>
    </div>
  );
};
export default App;
```

- 图片按钮

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button } from 'myantd';
import React from 'react';
const App: React.FC = () => {
  return (
    <div className="myantd">
      <Button type="primary" ratebtn="search">
        搜索
      </Button>
      <Button ratebtn="refresh">刷新</Button>
      <Button type="primary" ratebtn="alarm">
        告警
      </Button>
      <Button type="primary" ratebtn="add">
        添加
      </Button>
      <Button ratebtn="arrowleft">展开</Button>
      <Button ratebtn="arrowright">收起</Button>
    </div>
  );
};
export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
