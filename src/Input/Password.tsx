import { Input } from 'antd';
import type { InputProps } from 'antd';
import styles from './index.module.scss';
const App = (props: InputProps) => {
  return (
    <span className={styles.password}>
      <Input.Password {...props}>{props.children}</Input.Password>
    </span>
  );
};
export default App;
