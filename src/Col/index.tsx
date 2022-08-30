import { Col } from 'antd';
import type { ColProps } from 'antd';

const App = (props: ColProps) => (
  <Col  {...props}>
    {props.children}
  </Col>
)
export default App;