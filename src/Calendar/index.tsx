import { Calendar } from 'antd'
import type { CalendarProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: CalendarProps) => {
  return <Calendar {...props}>{props.children}</Calendar>
}

export default App
