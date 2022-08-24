import { Select } from 'antd'
import type { SelectProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: SelectProps) => {
  return <Select {...props}>{props.children}</Select>
}

export default App
