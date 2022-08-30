import { Cascader } from 'antd'
import type { CascaderProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: CascaderProps<any>) => {
  return <Cascader {...props}>{props.children}</Cascader>
}

export default App
