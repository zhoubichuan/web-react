import { Switch } from 'antd';
import type { SwitchProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: SwitchProps) => {
  return <Switch {...props}></Switch>;
};

export default App;
