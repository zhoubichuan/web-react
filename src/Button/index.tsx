import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import './index.module.scss'
import styles from './index.module.scss'

interface newButtonProps extends ButtonProps {
  ratebtn?: boolean,
  playbtn?: string
}
const App = ({ ratebtn, playbtn, ...props }: newButtonProps) => {
  if (ratebtn) {
    return (
      <Button
        className={styles.ratebtn}
        {...props}>
        {props.children}
      </Button>
    )
  } else {
    return (
      <Button className={styles.mybtn} {...props}>
        {props.children}
      </Button>
    )
  }

}
export default App;