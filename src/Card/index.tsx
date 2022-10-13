import { Card } from 'antd';
import type { CardProps } from 'antd';
import Meta from './Meta';
import styles from './index.module.scss';
const App = (props: CardProps) => {
    return (
        <div className={styles.card}>
            <Card {...props}>{props.children}</Card>
        </div>
    )
};
App.Meta = Meta;
export default App;
