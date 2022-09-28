import { Dropdown } from 'antd';
import type { DropdownProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: DropdownProps) => {
  return <Dropdown {...props}>{props.children}</Dropdown>;
};

export default App;
