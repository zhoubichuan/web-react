import { Space } from 'antd'
import type { SpaceProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: SpaceProps) => {
  return <Space {...props}>{props.children}</Space>
}

export default App
