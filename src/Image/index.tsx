import { Image } from 'antd'
import type { ImageProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: ImageProps) => {
  return <Image {...props}>{props.children}</Image>
}

export default App
