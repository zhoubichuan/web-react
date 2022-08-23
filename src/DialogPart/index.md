---
title: Dialog弹框
nav:
  path: /components
---

# Dialog弹框

```tsx
/**
 * title: 弹框类型
 */
import { Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
import { DialogPart } from 'myantd';

const App: React.FC = () => {
  let searchRef = createRef<any>()
  const [showDialod, setVisible] = useState(false);
  const changeDialog = (state: boolean) => {
    setVisible(state)
  }
  return (
    <>
      <Button onClick={() => changeDialog(true)}>弹框</Button>
      <DialogPart showDialod={showDialod} changeDialog={changeDialog}>
        <div
        >
          <img src={''} alt="" />
          <div>
            <p>拖拉机001：编号</p>
            <ul>
              <li>一级故障名称，请xxx</li>
              <li>一级故障名称，请xxx</li>
              <li>一级故障名称，请xxx</li>
            </ul>
          </div>
        </div>
      </DialogPart>
    </>
  )
};

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
