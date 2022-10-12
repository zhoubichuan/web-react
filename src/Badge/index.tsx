import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import styles from './index.module.scss';
import './index.module.scss';
const App = (props: BadgeProps) => {
  return (
    <span className={styles.badge}>
      <Badge {...props}>
        {props.children}
      </Badge>
    </span>
  );
};

export default App;
