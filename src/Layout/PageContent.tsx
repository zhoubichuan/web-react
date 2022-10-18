import { Form, Table, Modal } from '../.';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useEffect, useState } from 'react';
import styles from './index.module.scss';
import _ from 'lodash';

const App = (props: any) => {
  let {
    search: { template: searchTemplate, data: searchData },
    table: { template: tableTemplate, data: initTableData },
    request,
    children,
  } = props;
  let searchRef = createRef<any>();
  const [formColumns, setFormColumns] = useState(searchTemplate);
  const [tableData, setTableData] = useState(initTableData);
  const getSearchData = ({ data, pageIndex, pageSize, total }: any) => {
    setTableData({ data: data, page: { total: total, pageSize: pageSize, current: pageIndex } });
  };
  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    let { current, pageSize } = pagination;
    window.location.hash = `#${pageSize}/${current}`;
    searchRef.current?.handleSearch({ curPage: current, pageSize: pageSize });
  };
  const requestFn = async (params: any, callback?: Function) => {
    let data = await request(tableData.page, params, callback);
    setTableData(data);
  };
  useEffect(() => {
    if (!props.search) {
      requestFn({});
    }
  }, []);
  return (
    <div className={styles.content}>
      {props.search && (
        <Form.Search
          columns={formColumns}
          onRef={searchRef}
          searchData={getSearchData}
          requestFn={requestFn}
        />
      )}
      <Table.Pagination
        rowKey={(record: any, index: number) => index}
        tableData={tableData}
        columns={tableTemplate}
        onChange={onChange}
      />
    </div>
  );
};

export default App;
