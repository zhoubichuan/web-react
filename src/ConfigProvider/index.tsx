import React from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {PREFIX_CLS} from '../constant';
import {ConfigProviderProps} from 'antd/lib/config-provider';

function HljConfigProvider(props: ConfigProviderProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      prefixCls={PREFIX_CLS}
      autoInsertSpaceInButton={false}
      {...props}
    />
  );
}

export default HljConfigProvider;
