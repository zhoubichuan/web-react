import { Card, Tabs } from '../.';
import React from 'react';
import PageContent from './PageContent';
import styles from './index.module.scss';

const handleOnChange = (key: string) => {
  console.log(key);
};

const App = (props: any) => {
  let {
    title,
    search = { template: [], data: [] },
    table = {
      template: [],
      data: {
        data: [],
        page: { total: 0, pageSize: 20, current: 1 },
      },
    },
    request,
  } = props;
  return (
    <div className={styles.pageTemplate}>
      <Tabs defaultActiveKey="2" onChange={handleOnChange}>
        <Tabs.TabPane tab={title} key="1">
          <PageContent search={search} table={table} request={request} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default App;
