import { Layout, Button } from '../../src/.';
import React, { useState } from 'react';
import AlarmRecord from './AlarmRecord';
import FaultRecord from './FaultRecord';

const App: React.FC = () => {
  const [key, setKey] = useState('0');
  const [isShow, setVisible] = useState(false);
  return (
    <Layout.TabsTemplate
      targetKey={key}
      keyChnage={(key: any) => setKey(key)}
      tabBarExtraContent={
        <Button.Image
          size="large"
          style={{ position: 'absolute', right: '10px', top: '10px' }}
          type="primary"
          onClick={() => setVisible(true)}
          icon={'add'}
        >
          {key.includes('0') ? '新增围栏' : '新增阈值'}
        </Button.Image>
      }
    >
      <AlarmRecord
        title="围栏设置"
        showDialog={isShow}
        stateChange={(val: boolean) => setVisible(val)}
      />
      <FaultRecord
        title="阈值设置"
        showDialog={isShow}
        stateChange={(val: boolean) => setVisible(val)}
      />
    </Layout.TabsTemplate>
  );
};

export default App;
