import { Table } from 'antd'
import type { TableProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: TableProps) => {
  return <Table {...props}>{props.children}</Table>
}

export default App
