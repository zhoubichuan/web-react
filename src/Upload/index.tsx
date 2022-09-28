import { Upload } from 'antd';
import type { UploadProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: UploadProps) => {
  return <Upload {...props}></Upload>;
};

export default App;
