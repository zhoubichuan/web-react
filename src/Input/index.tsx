import { Input } from 'antd';
import type { InputProps } from 'antd';
import styles from './index.module.scss';

interface newInputProps extends InputProps {
  circle?: boolean;
}
const App = ({ circle, ...props }: newInputProps) => {
  if (circle) {
    return (
      <Input className={styles.circle} {...props}>
        {props.children}
      </Input>
    );
  } else {
    return <Input {...props}>{props.children}</Input>;
  }
};
App.TextArea = Input.TextArea;
App.Password = Input.Password;
export default App;
