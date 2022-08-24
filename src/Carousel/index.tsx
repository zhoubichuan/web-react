import { Carousel } from 'antd'
import type { CarouselProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: CarouselProps) => {
  return <Carousel {...props}>{props.children}</Carousel>
}

export default App
