import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: CollapseProps) => {
  return <Collapse {...props}>{props.children}</Collapse>
}

export default App
