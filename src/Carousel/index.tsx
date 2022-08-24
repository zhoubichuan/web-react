import { Carousel } from 'antd'
import type { CarouselProps } from 'antd'
import React from 'react'
// import {styles} from './index.module.scss'
const App = (props: CarouselProps) => {
  return <Carousel {...props}>{props.children}</Carousel>
}

export default App
