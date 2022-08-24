import { Card } from 'antd'
import type { CardProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: CardProps) => {
  return <Card {...props}>{props.children}</Card>
}
export default App
