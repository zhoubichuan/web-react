import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import './index.module.scss'
import styles from './index.module.scss'
import a from './1.png'
import b from './2.png'
import c from './3.png'

const img: any = { a, b, c }
interface newButtonProps extends ButtonProps {
  ratebtn?: string,
  playbtn?: string
}
const App = ({ ratebtn, playbtn, ...props }: newButtonProps) => {
  if (ratebtn) {
    return (
      <Button
        className={styles.ratebtn}
        icon={<img src={img[ratebtn]} />}
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