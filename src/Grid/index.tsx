import { Grid } from 'antd'
import type { GridProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: GridProps) => {
  return <Grid {...props}>{props.children}</Grid>
}

export default App
