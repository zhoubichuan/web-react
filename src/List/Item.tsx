import { List } from 'antd';
import Meta from './Meta'
const App = (props: any) => (
  <List.Item  {...props}>
    {props.children}
  </List.Item>
)
App.Meta=Meta
export default App;