import { Rate } from 'antd'
import type { RateProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: RateProps) => {
  return <Rate {...props}></Rate>
}

export default App
