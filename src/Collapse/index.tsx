import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import React from 'react';
import style from './index.module.scss';
const App = (props: CollapseProps) => {
  return <Collapse {...props}>{props.children}</Collapse>;
};
App.Panel=Collapse.Panel
export default App;
