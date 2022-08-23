---
title: Table表格
nav:
  path: /components
---
#  Table表格

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
import {TablePart,SearchPart,DialogPart} from 'myantd';
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
    const [showDialod, setVisible] = useState(false);
    const handleContinue = () => {
        setVisible(true)
    }
    const changeDialog = (state: boolean) => {
        setVisible(state)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '号码',
            dataIndex: 'name',
        },
        {
            title: '信息',
            dataIndex: 'a',
            sorter: {
                compare: (a, b) => a.a - b.a,
                multiple: 3,
            },
            showSorterTooltip: false,
        },
        {
            title: '名称',
            dataIndex: 'b',
            sorter: {
                compare: (a, b) => a.b - b.b,
                multiple: 2,
            },
            showSorterTooltip: false,
            width: 180,
        },
        {
            title: '年龄',
            dataIndex: 'c',
            sorter: {
                compare: (a, b) => a.c - b.c,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 180,
        },
        {
            title: '时间',
            dataIndex: 'd',
            sorter: {
                compare: (a, b) => a.d - b.d,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 150,
        },
        {
            title: '其他',
            dataIndex: 'e',
            sorter: {
                compare: (a, b) => a.e - b.e,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 150,
        },
        {
            title: '备注',
            dataIndex: 'f',
            sorter: {
                compare: (a, b) => a.f - b.f,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 150,
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
            ),
        },
    ];
    const [tableData, setTableData] = useState({ data: [{name:1}], page: { total: 0, pageSize: 20, current: 1 } })

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <TablePart tableData={tableData} columns={columns} onChange={onChange} />
            <DialogPart showDialod={showDialod} changeDialog={changeDialog}>
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
