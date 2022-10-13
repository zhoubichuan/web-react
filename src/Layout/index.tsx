import { Layout } from 'antd';
import type { LayoutProps } from 'antd';
import './index.module.scss';
import styles from './index.module.scss';
import React from 'react';
// import Page from './Page'
const { Header, Footer, Content, Sider } = Layout;
const App = (props: LayoutProps) => {
  return (
    <span className={styles.layout}>
      <Layout {...props}>
        {props.children}
      </Layout>
    </span>

  );
};
App.Header = Header;
App.Footer = Footer;
App.Content = Content;
App.Sider = Sider;
// App.Page = Page;
export default App;
