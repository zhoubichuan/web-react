import { Input } from 'antd';
import type { InputProps } from 'antd';
import styles from './index.module.scss';
const App = (props: InputProps) => {
  return (
    <Input className={styles.circle} {...props}>
      {props.children}
    </Input>
  );
};
export default App;
