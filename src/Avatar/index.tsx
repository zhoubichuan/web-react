import { Avatar  } from 'antd'
import type { AvatarProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: AvatarProps) => {
  return <Avatar  {...props}>{props.children}</Avatar>
}

export default App
