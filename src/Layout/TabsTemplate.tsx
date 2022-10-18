import { Card, Tabs, Button } from '../.';
import React, { useState } from 'react';
import styles from './index.module.scss';

const App = (props: any) => {
  let { children, tabBarExtraContent, targetKey, keyChnage } = props;
  const handleOnChange = (key: string) => {
    keyChnage(key);
  };
  let { TabPane } = Tabs;
  return (
    <Card className={styles.tabsTemplate}>
      <Tabs defaultActiveKey="0" onChange={handleOnChange} tabBarExtraContent={tabBarExtraContent}>
        {React.Children.map(children, (item: any, index: number) => {
          let { title } = item.props;
          let key = String(index);
          return (
            <TabPane tab={title} key={key}>
              {targetKey.includes(key) && item}
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default App;
