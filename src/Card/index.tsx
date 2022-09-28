import { Card } from 'antd';
import type { CardProps } from 'antd';
import Meta from './Meta';
const App = (props: CardProps) => <Card {...props}>{props.children}</Card>;
App.Meta = Meta;
export default App;
