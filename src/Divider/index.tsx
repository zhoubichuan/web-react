import { Divider } from 'antd'
import type { DividerProps } from 'antd'
import React from 'react'
import styles from './index.module.scss'
const App = (props: DividerProps) => {
  return <Divider className={styles.divider} {...props}>{props.children}</Divider>
}

export default App
