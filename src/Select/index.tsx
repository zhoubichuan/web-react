import { Select } from 'antd'
import type { SelectProps } from 'antd'
import React from 'react'
import Option from './Option'
// import {styles} from './index.module.scss'
const App = (props: SelectProps) => {
  return <Select {...props}>{props.children}</Select>
}
App.Option = Option
export default App
