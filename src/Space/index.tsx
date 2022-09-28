import { Space } from 'antd';
import type { SpaceProps } from 'antd';

const App = (props: SpaceProps) => <Space {...props}>{props.children}</Space>;
export default App;
