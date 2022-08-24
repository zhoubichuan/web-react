import { Tree } from 'antd'
import type { TreeProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: TreeProps) => {
  return <Tree {...props}>{props.children}</Tree>
}

export default App
