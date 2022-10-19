import { Form } from 'antd';
import Item from './Item';
import Search from './Search';
import Search2 from './Search2';
import Submit from './Submit';
import Layout from './Layout';
import styles from './index.module.scss';
import React from 'react';

const App = (props: any) => {
  return <Form {...props}>{props.children}</Form>;
};
App.Item = Item;
App.useForm = Form.useForm;
App.Provider = Form.Provider;
App.Search = Search;
App.Search2 = Search2;
App.Submit = Submit;
App.Layout = Layout;
export default App;
