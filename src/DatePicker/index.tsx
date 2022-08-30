import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: DatePickerProps) => {
  return <DatePicker {...props}></DatePicker>
}

export default App
