import { Mentions } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: any) => {
  return <Mentions {...props}>{props.children}</Mentions>;
};
App.Option = Mentions.Option;
export default App;
