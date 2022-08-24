import { Statistic } from 'antd'
import type { StatisticProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: StatisticProps) => {
  return <Statistic {...props}></Statistic>
}

export default App
