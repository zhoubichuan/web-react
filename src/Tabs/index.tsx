import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: TabsProps) => {
  return <Tabs {...props}>{props.children}</Tabs>
}

export default App
