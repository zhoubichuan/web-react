import { List } from 'antd';

const App = (props: any) => <List.Item.Meta {...props}>{props.children}</List.Item.Meta>;
export default App;
