import { Form } from 'antd'
import type { FormProps } from 'antd'
import React from 'react'
import './index.module.scss'
const App = (props: FormProps) => {
  return <Form {...props}>{props.children}</Form>
}

export default App
