import { Form } from 'antd';
import Item from './Item';
import Search from './Search';
import './index.module.scss';

const App = (props: any) => {
  return <Form {...props}>{props.children}</Form>;
};
App.Item = Item;
App.useForm = Form.useForm;
App.Provider = Form.Provider;
App.Search = Search;
export default App;
