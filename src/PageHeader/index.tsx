import { PageHeader } from 'antd';
import type { PageHeaderProps } from 'antd';

const App = (props:PageHeaderProps)  => (
  <PageHeader {...props}>
    {props.children}
  </PageHeader>
);

export default App;