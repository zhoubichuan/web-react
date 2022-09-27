import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import Item from './Item';
import './index.module.scss'
import styles from './index.module.scss'
const App = (props: DescriptionsProps) => (
  <Descriptions  {...props}>
    {props.children}
  </Descriptions>
)
App.Item = Item
const TableInput = ({
  title = '',
  table = []
}: any) => {
  return (
    <Descriptions
      className={styles.tableInput}
      title={title}
    >
      {table.map((item: any, index: number) => <Descriptions.Item key={index}>{item}</Descriptions.Item>)}
    </Descriptions>
  )
}
App.TableInput = TableInput
const Row = ({
  title = '',
  content = []
}: any) => {
  return (
    <Descriptions
      className={styles.row}
      title={title}
    >
      {content.map((item: any, index: number) => <Descriptions.Item key={index}>{item}</Descriptions.Item>)}
    </Descriptions>
  )
}
App.Row = Row
export default App;