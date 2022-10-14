import { Select } from 'antd';
import type { SelectProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';
const App = (props: SelectProps) => {
  return <Select {...props}>{props.children}</Select>;
};
App.Option = Select.Option;
App.OptGroup = Select.OptGroup;
export default App;
