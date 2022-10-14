import { Input } from 'antd';
import type { InputProps } from 'antd';
import styles from './index.module.scss';
const App = (props: InputProps) => {
  return (
    <span className={styles.circle}>
      <Input {...props}>{props.children}</Input>
    </span>
  );
};
export default App;
