import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: DescriptionsProps) => {
  return <Descriptions {...props}>{props.children}</Descriptions>
}

export default App
