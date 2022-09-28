import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: SliderSingleProps) => {
  return <Slider {...props}></Slider>;
};

export default App;
