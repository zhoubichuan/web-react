import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';

const App = (props: InputNumberProps) => (
  <InputNumber   {...props}>
    {props.children}
  </InputNumber>
)
export default App;