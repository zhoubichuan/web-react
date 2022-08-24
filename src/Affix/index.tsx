import { Affix } from 'antd'
import type { AffixProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: AffixProps) => {
  return <Affix {...props}>{props.children}</Affix>
}

export default App
