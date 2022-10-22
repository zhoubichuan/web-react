import { Card, Tabs } from '../.';
import PageContent from './PageContent';
import styles from './index.module.scss';
import React from 'react';

const handleOnChange = (key: string) => {
  console.log(key);
};
interface PageProps {
  title: string;
  search: any;
  table: object;
  request?: Function;
  tabBarExtraContent?: any;
  style?: any;
}
const App: React.FC<PageProps> = (props) => {
  let {
    title,
    search = { template: [], data: [], button: [] },
    table = {
      template: [],
      data: {
        data: [],
        page: { total: 0, pageSize: 20, current: 1 },
      },
    },
    request,
    tabBarExtraContent,
  } = props;
  return (
    <Card className={styles.pageTemplate} style={props.style}>
      <Tabs defaultActiveKey="2" onChange={handleOnChange} tabBarExtraContent={tabBarExtraContent}>
        <Tabs.TabPane tab={title} key="1">
          <PageContent search={search} table={table} request={request} button={search.button} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default App;
