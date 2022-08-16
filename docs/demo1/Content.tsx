import { Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
import {TablePart,SearchPart,DialogPart} from 'webreactui';
import styles from "./index.module.scss";
import 'antd/lib/button/style'; 
import 'antd/lib/space/style'; 
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
    let searchRef = createRef<any>()
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
            width: 100,
        },
        {
            title: '信息',
            dataIndex: 'a',
            sorter: {
                compare: (a, b) => a.a - b.a,
                multiple: 3,
            },
            showSorterTooltip: false,
            width: 100,
        },
        {
            title: '名称',
            dataIndex: 'b',
            sorter: {
                compare: (a, b) => a.b - b.b,
                multiple: 2,
            },
            showSorterTooltip: false,
            width: 100,
        },
        {
            title: '年龄',
            dataIndex: 'c',
            sorter: {
                compare: (a, b) => a.c - b.c,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 100,
        },
        {
            title: '时间',
            dataIndex: 'd',
            sorter: {
                compare: (a, b) => a.d - b.d,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 100,
        },
        {
            title: '其他',
            dataIndex: 'e',
            sorter: {
                compare: (a, b) => a.e - b.e,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 100,
        },
        {
            title: '备注',
            dataIndex: 'f',
            sorter: {
                compare: (a, b) => a.f - b.f,
                multiple: 1,
            },
            showSorterTooltip: false,
            width: 100,
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
    const [tableData, setTableData] = useState({ data: [], page: { total: 0, pageSize: 20, current: 1 } })
    const getSearchData = ({ data, current, pageSize, total }: any) => {
        setTableData({ data: data, page: { total: total, pageSize: pageSize, current: current } })
    }
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        searchRef.current?.handleSearch({ current: pagination.current, pageSize: pagination.pageSize })
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <SearchPart onRef={searchRef} searchData={getSearchData} requestUrl="http://zhoubichuan.com/antdpro-express/api/rule" />
            <TablePart tableData={tableData} columns={columns} onChange={onChange} />
            <DialogPart showDialod={showDialod} changeDialog={changeDialog}>
                <div 
                className={styles.detail}
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