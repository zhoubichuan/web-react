import { Input } from 'antd';
import type { InputProps } from 'antd';
import Circle from './Circle';

const App = (props: InputProps) => {
  return <Input {...props}>{props.children}</Input>;
};
App.TextArea = Input.TextArea;
App.Password = Input.Password;
App.Circle = Circle;
export default App;
