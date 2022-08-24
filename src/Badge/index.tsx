import { Badge } from 'antd'
import type { BadgeProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: BadgeProps) => {
  return <Badge {...props}>{props.children}</Badge>
}

export default App
