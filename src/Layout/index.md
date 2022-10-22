---
title: Layout
nav:
  path: /components
---

# Layout

```tsx
import { Layout } from 'myantd';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => (
  <>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`myantd`文档：https://ant.design/components/button-cn/
