import { Popover } from 'antd';
import type { PopoverProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: PopoverProps) => {
  return <Popover {...props}>{props.children}</Popover>;
};

export default App;