import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: MenuProps) => {
  return <Menu {...props}>{props.children}</Menu>
}

export default App
