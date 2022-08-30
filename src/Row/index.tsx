import { Row  } from 'antd';
import type { RowProps } from 'antd';
  
const App= (props:RowProps) => (
  <Row  {...props}>
    {props.children}
  </Row>
)
export default App;