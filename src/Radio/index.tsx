import { Radio } from 'antd';
import type { RadioProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: RadioProps) => {
  return (
    <span className={styles.radio}>
      <Radio {...props}>{props.children}</Radio>
    </span>
  );
};
App.Group = Radio.Group;
export default App;
