import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: TooltipProps) => {
  return <Tooltip {...props}>{props.children}</Tooltip>;
};

export default App;
