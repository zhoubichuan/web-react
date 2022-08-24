import { Segmented } from 'antd'
import type { SegmentedProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: SegmentedProps) => {
  return <Segmented {...props}></Segmented>
}

export default App
