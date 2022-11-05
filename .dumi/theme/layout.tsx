import React from 'react';
import Layout from 'dumi-theme-default/src/layout';
import {ConfigProvider} from 'antd';
import 'antd/dist/antd.less';

export default ({children, ...props}) => {

  return (
    // @ts-ignore
    <Layout {...props}>
      <ConfigProvider>{children}</ConfigProvider>
    </Layout>
  );
}