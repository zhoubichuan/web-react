import { Layout } from 'antd'
import type { LayoutProps } from 'antd'
import './index.module.scss'
const { Header, Footer, Content, Sider } = Layout
const App = (props: LayoutProps) => {
  return <Layout {...props}>{props.children}</Layout>
}
App.Header = Header;
App.Footer = Footer;
App.Content = Content;
App.Sider = Sider;
export default App
