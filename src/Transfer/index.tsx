import { Transfer } from 'antd';
import type { TransferProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: any) => {
  return <Transfer {...props}>{props.children}</Transfer>;
};

export default App;
