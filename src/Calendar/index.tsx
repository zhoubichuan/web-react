import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: CalendarProps<any>) => {
  return <Calendar {...props}></Calendar>;
};

export default App;
