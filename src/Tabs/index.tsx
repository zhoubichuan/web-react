import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: TabsProps) => {
  return (
    <div className={styles.tabs}>
      <Tabs {...props}>{props.children}</Tabs>
    </div>
  );
};
App.TabPane = Tabs.TabPane;
export default App;
