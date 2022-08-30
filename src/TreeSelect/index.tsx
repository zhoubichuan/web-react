import { TreeSelect } from 'antd'
import type { TreeSelectProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: TreeSelectProps) => {
  return <TreeSelect {...props}></TreeSelect>
}

export default App
