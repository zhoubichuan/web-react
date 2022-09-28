import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: PaginationProps) => {
  return <Pagination {...props}></Pagination>;
};

export default App;
