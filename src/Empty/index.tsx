import { Empty } from 'antd'
import type { EmptyProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: EmptyProps) => {
  return <Empty {...props}>{props.children}</Empty>
}

export default App
