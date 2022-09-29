import { Mentions } from 'antd';
import type { any } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: any) => {
  return <Mentions {...props}>{props.children}</Mentions>;
};
App.Option=Mentions.Option
export default App;
