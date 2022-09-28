import { Drawer } from 'antd';
import type { DrawerProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: DrawerProps) => {
  return <Drawer {...props}>{props.children}</Drawer>;
};

export default App;
