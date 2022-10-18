import { Timeline } from 'antd';
import type { TimelineProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: TimelineProps) => {
  return <Timeline {...props}>{props.children}</Timeline>;
};

export default App;
