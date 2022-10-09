---
title: Form
nav:
  path: /components
---

# Form

```tsx
import { Button, Checkbox, Form, Input } from 'myantd'
import React from 'react'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

## Form.Search

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import {Form } from 'myantd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
let initTemplate = [
  {
    name: 'taskId',
    placeholder: '请输入'
  },
  {
    name: 'typeName',
    placeholder: '请选择',
    type: 'select',
    fieldNames: {
      value: 'code'
    },
    options: [] as any,
  }
]
const App: React.FC = () => {
  let searchRef = createRef<any>();
  const [showDialod, setVisible] = useState(false);
  const [tableData, setTableData] = useState({
    data: [],
    page: { total: 0, pageSize: 20, current: 1 }
  });
  const getSearchData = ({ data, current, pageSize, total }: any) => {
    setTableData({ data: data, page: { total: total, pageSize: pageSize, current: current } });
  };
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    searchRef.current?.handleSearch({ current: pagination.current, pageSize: pagination.pageSize });
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="myantd">
      <Form.Search
        columns={initTemplate}
        onRef={searchRef}
        searchData={getSearchData}
        requestFn={() => {}}
      />
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
