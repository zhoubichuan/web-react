import { Grid } from 'antd'
import type { GridProps } from 'antd'
import React from 'react'
import  './index.module.scss'
const App = (props: GridProps) => {
  return <Grid {...props}>{props.children}</Grid>
}

export default App
