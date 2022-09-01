import { Badge } from 'antd'
import type { BadgeProps } from 'antd'
import styles from './index.module.scss'
import './index.module.scss'
const App = (props: BadgeProps) => {
  return <Badge className={styles.mybadge} {...props}>{props.children}</Badge>
}

export default App
