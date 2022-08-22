import { List } from 'antd'
import type { ListProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: ListProps) => {
  return <List {...props}>{props.children}</List>
}

export default App
