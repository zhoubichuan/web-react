---
title: Search搜索
nav:
  path: /components
---
#  Search搜索
```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
import {TablePart,SearchPart,DialogPart} from 'webreactui';
const App: React.FC = () => {
    let searchRef = createRef<any>()
    const [showDialod, setVisible] = useState(false);
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
