import { List } from 'antd';
import Item from './Item'
const App = (props: any) => (
  <List  {...props}>
    {props.children}
  </List>
)
App.Item = Item
export default App;