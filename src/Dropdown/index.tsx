import { Dropdown } from 'antd';
import type { DropdownProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: DropdownProps) => {
  return <Dropdown {...props}>{props.children}</Dropdown>;
};

export default App;
