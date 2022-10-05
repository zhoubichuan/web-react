import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: ProgressProps) => {
  return <Progress {...props}>{props.children}</Progress>;
};

export default App;