import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: ButtonProps) => {
  return <Button {...props}>{props.children}</Button>;
};

export default App;
