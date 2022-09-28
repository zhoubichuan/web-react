import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: CheckboxProps) => {
  return <Checkbox {...props}>{props.children}</Checkbox>;
};

export default App;
