import { Typography } from 'antd';
import type { TypographyProps } from 'antd';

const App = (props: any) => <Typography {...props}></Typography>;
const { Text, Link, Title, Paragraph } = Typography;
App.Text = Text;
App.Link = Link;
App.Title = Title;
App.Paragraph = Paragraph;
export default App;
