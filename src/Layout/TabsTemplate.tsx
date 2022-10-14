import { Card, Tabs } from '@/antd';
import React, { useState } from 'react';
import styles from './index.module.scss';

const App = (props: any) => {
  let { children } = props;
  const [key, setKey] = useState('0');
  const handleOnChange = (key: string) => {
    setKey(key);
  };
  let { TabPane } = Tabs;
  return (
    <Card className={styles.tabsTemplate}>
      <Tabs defaultActiveKey="0" onChange={handleOnChange}>
        {React.Children.map(children, (item: any, index: number) => {
          let { title } = item.props;
          let targetKey = String(index);
          return (
            <TabPane tab={title} key={targetKey}>
              {item}
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default App;
