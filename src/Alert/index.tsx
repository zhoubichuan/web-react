import { Alert } from 'antd'
import type { AlertProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: AlertProps) => {
  return <Alert {...props}></Alert>
}

export default App
