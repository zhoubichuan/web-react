import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import locale from 'antd/lib/locale-provider/zh_CN';
const App = (props: DatePickerProps) => {
  return <DatePicker {...props}></DatePicker>;
};
App.RangePicker = DatePicker.RangePicker;
export default App;
