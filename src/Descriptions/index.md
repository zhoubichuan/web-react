---
title: Descriptions
nav:
  path: /components
---

# Descriptions

```tsx
import { Descriptions } from 'myantd';
import React from 'react';

const App: React.FC = () => (
  <Descriptions title="User Info">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
    <Descriptions.Item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

export default App;
```
## Descriptions.TableInput

```tsx
import { Descriptions, Button } from 'myantd';
import React from 'react';

const App: React.FC = () => (
  <div className="myantd" style={{ width: '450px' }}>
    <Descriptions.Row
      title="请对此次作业进行评估"
      content={[
        <Button key={1} ratebtn={'qualified'}>
          <span>合格</span>
        </Button>,
        <Button key={2} ratebtn={'good'}>
          <span>良好</span>
        </Button>,
        <Button key={3} ratebtn={'unqualified'}>
          <span>不合格</span>
        </Button>
      ]}
    />
  </div>
);

export default App;
```

## Descriptions.TableInput

```tsx
import { Descriptions, Input } from 'myantd';
import React from 'react';

const App: React.FC = () => (
  <div className="myantd" style={{ width: '450px' }}>
    <Descriptions.TableInput
      table={[
        '头部一',
        '头部二',
        '头部三',
        '字段1666666666',
        `${11} xx`,
        <Input key={1} circle={true} />,
        '字段2',
        `${'1666661'} xx`,
        <Input key={2} circle={true} />,
        '字段3',
        `${'12'} xx`,
        <Input key={3} circle={true} />,
        '字段4',
        `${'14'} xx`,
        <Input key={4} circle={true} />
      ]}
    />
  </div>
);

export default App;
```
### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
