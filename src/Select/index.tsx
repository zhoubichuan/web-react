import { Select } from 'antd';
import type { SelectProps } from 'antd';
import './index.module.scss';
import React from 'react';
// import {styles} from './index.module.scss'
const App = (props: SelectProps) => {
  return <Select {...props}>{props.children}</Select>;
};
App.Option = Select.Option;
App.OptGroup = Select.OptGroup;
export default App;
