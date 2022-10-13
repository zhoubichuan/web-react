---
title: Table
nav:
  path: /components
---

# Table

```tsx
import { Space, Table, Tag } from 'antd'
import React from 'react'

const { Column, ColumnGroup } = Table

interface DataType {
  key: React.Key
  firstName: string
  lastName: string
  age: number
  address: string
  tags: string[]
}

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

const App: React.FC = () => (
  <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
)

export default App
```

# Table.Pagination

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button, Space,Table, Form, Modal } from 'myantd';
import type { ColumnsType, TableProps } from 'antd/es/table';
interface DataType {
  key: React.Key;
  name: string;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

const App: React.FC = () => {
  let searchRef = createRef<any>();
  const [showDialod, setVisible] = useState(false);
    const [formColumns, setFormColumns] = useState([
    { name: 'machineNameMt', placeholder: '请输入故障设备' },
    {
      name: 'typeCode',
      placeholder: '请选择任务类型',
      type: 'select',
      fieldNames: {
        value: 'code'
        // label:'name'
      },
      options: [] as any
    }
  ]);
  const handleContinue = () => {
    setVisible(true);
  };
  const changeDialog = (state: boolean) => {
    setVisible(state);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '号码',
      dataIndex: 'name'
    },
    {
      title: '信息',
      dataIndex: 'a',
      sorter: {
        compare: (a, b) => a.a - b.a,
        multiple: 3
      },
      showSorterTooltip: false
    },
    {
      title: '名称',
      dataIndex: 'b',
      sorter: {
        compare: (a, b) => a.b - b.b,
        multiple: 2
      },
      showSorterTooltip: false,
      width: 180
    },
    {
      title: '年龄',
      dataIndex: 'c',
      sorter: {
        compare: (a, b) => a.c - b.c,
        multiple: 1
      },
      showSorterTooltip: false,
      width: 180
    },
    {
      title: '时间',
      dataIndex: 'd',
      sorter: {
        compare: (a, b) => a.d - b.d,
        multiple: 1
      },
      showSorterTooltip: false,
      width: 150
    },
    {
      title: '其他',
      dataIndex: 'e',
      sorter: {
        compare: (a, b) => a.e - b.e,
        multiple: 1
      },
      showSorterTooltip: false,
      width: 150
    },
    {
      title: '备注',
      dataIndex: 'f',
      sorter: {
        compare: (a, b) => a.f - b.f,
        multiple: 1
      },
      showSorterTooltip: false,
      width: 150
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" block onClick={handleContinue}>
            打开
          </Button>
          <Button type="link" block>
            继续
          </Button>
          <Button type="link" block>
            详情
          </Button>
        </Space>
      )
    }
  ];
  const [tableData, setTableData] = useState({
    data: [],
    page: { total: 0, pageSize: 20, current: 1 }
  });
  const getSearchData = ({ data, pageIndex, pageSize, total }: any) => {
    setTableData({ data: data, page: { total: total, pageSize: pageSize, current: pageIndex } });
  };
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    searchRef.current?.handleSearch({
      pageIndex: pagination.current,
      pageSize: pagination.pageSize
    });
    console.log('params', pagination, filters, sorter, extra);
  };
  const requestFn = async (params: getFailureInfoListParams, callback: Function) => {
    let defaultParams: getFailureInfoListParams = {
      // machineNameMt: '',
      // typeCode: '',
      pageSize: 20,
      pageIndex: 1
    };
    params = { ...defaultParams, ...params };
    params.machineNameMt === '' && (params.machineNameMt = undefined);
    params.typeCode === '' && (params.typeCode = undefined);
    let result = await getFailureInfoList(params);
    callback && callback(result);
  };
  return (
    <>
      <Form.Search
        columns={formColumns}
        onRef={searchRef}
        searchData={getSearchData}
        requestFn={requestFn}
      />
      <Table.Pagination tableData={tableData} columns={columns} onChange={onChange} />
      <Modal.Dialog showDialod={showDialod} changeDialog={changeDialog}>
        <div
        // className={styles.detail}
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
      </Modal.Dialog>
    </>
  );
};

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
