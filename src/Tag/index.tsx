import { Tag } from 'antd';
import type { TagProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App = (props: TagProps) => {
  return <Tag {...props}>{props.children}</Tag>;
};

export default App;
