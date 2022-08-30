import { Select } from 'antd';
const App = (props: any) => (
  <Select.Option  {...props}>
    {props.children}
  </Select.Option>
)
export default App;