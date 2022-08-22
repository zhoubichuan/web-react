import { Layout } from 'antd'
import type { LayoutProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: LayoutProps) => {
  return <Layout {...props}>{props.children}</Layout>
}

export default App
