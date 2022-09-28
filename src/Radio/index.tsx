import { Radio } from 'antd';
import type { RadioProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: RadioProps) => {
  return <Radio {...props}>{props.children}</Radio>;
};
App.Group = Radio.Group;
export default App;
