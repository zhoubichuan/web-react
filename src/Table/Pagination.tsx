import { Table } from 'antd';
import type { TableProps } from 'antd'; //eslint-disable-line
import React from 'react';
import styles from './index.module.scss';

interface tableProps {
  tableData: any;
  onChange: any;
  columns: any;
  className?: any;
  y?: number;
  components?: any;
  rowKey?: any;
}

const App = (props: tableProps) => {
  let {
    y,
    columns,
    onChange,
    tableData: { data, page },
    ...rest
  } = props;
  return (
    <Table
      key="pagination"
      className={styles.pagination}
      scroll={{ scrollToFirstRowOnChange: true, y: y || 564 }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{
        locale: {
          items_per_page: '条/页',
          jump_to: '跳至',
          page: '页'
        },
        className: 'tablePagination',
        total: page.total,
        pageSize: page.pageSize,
        showSizeChanger: true,
        current: +page.current,
        showQuickJumper: true,
        pageSizeOptions: ['10', '50', '100', '200'],
        showTotal: (total) => `共 ${total} 条数据`
      }}
      {...rest}
    />
  );
};

export default App;
