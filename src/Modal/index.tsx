import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import React from 'react';
import './index.module.scss';
import Dialog from './Dialog';
const App = (props: ModalProps) => {
  return <Modal {...props}>{props.children}</Modal>;
};
App.Dialog = Dialog;
export default App;
