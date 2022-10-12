import { Table } from 'antd';
import './index.module.scss';
import Pagination from './Pagination';
import Edit from './Edit';
const App = (props: any) => {
  return <Table {...props}>{props.children}</Table>;
};
App.Column = Table.Column;
App.ColumnGroup = Table.ColumnGroup;
App.Pagination = Pagination;
App.Edit = Edit;
export default App;
