import { Comment } from 'antd'
import type { CommentProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: CommentProps) => {
  return <Comment {...props}>{props.children}</Comment>
}

export default App
