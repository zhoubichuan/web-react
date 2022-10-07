import React from 'react';
import Layout from 'dumi-theme-default/src/layout';
import ConfigProvider from '../../src/ConfigProvider';
// import 'antd/es/style/index.less';
// import './style.less';
import './component.less';

export default ({children, ...props}) => {

  return (
    // @ts-ignore
    <Layout {...props}>
      <ConfigProvider>{children}</ConfigProvider>
    </Layout>
  );
}