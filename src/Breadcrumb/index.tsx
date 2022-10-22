import { Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: BreadcrumbProps) => {
  return <Breadcrumb {...props}>{props.children}</Breadcrumb>;
};
App.Item = Breadcrumb.Item;
export default App;
