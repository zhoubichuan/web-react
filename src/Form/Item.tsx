import { Form } from 'antd';
import Item from './Item'
import './index.module.scss'

const App = (props: any) => {
  return (
    <Form  {...props}>
      {props.children}
    </Form>
  )
}
App.Item = Item
App.useForm = Form.useForm
App.Provider = Form.Provider;
export default App;