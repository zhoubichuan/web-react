import { Steps } from 'antd';
import type { StepsProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: StepsProps) => {
  return <Steps {...props}>{props.children}</Steps>;
};
App.Step=Steps.Step
export default App;
