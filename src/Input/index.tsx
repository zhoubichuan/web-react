import { Input } from 'antd';
import type { InputProps } from 'antd';
import Circle from './Circle';
import React from 'react';
import styles from './index.module.scss';

const App = (props: InputProps) => {
  return (
    <div className={styles.input}>
      <Input {...props}>{props.children}</Input>
    </div>
  );
};
App.TextArea = Input.TextArea;
App.Password = Input.Password;
App.Circle = Circle;
export default App;
