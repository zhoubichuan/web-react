import { Form } from 'antd';
import type { FormItemProps } from 'antd';
const App = (props: FormItemProps) => {
  return <Form.Item {...props}>{props.children}</Form.Item>;
};
export default App;
