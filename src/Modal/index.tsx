import { Modal } from 'antd'
import type { ModalProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: ModalProps) => {
  return <Modal {...props}>{props.children}</Modal>
}

export default App
