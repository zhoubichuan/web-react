import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import Item from './Item';

const App = (props: DescriptionsProps) => (
  <Descriptions  {...props}>
    {props.children}
  </Descriptions>
)
App.Item = Item
export default App;