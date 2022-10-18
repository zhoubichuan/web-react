import { Col, Row } from '../../src/.';
import React, { useState } from 'react';
import ElectronForm from './ElectronForm';
import ElectronMap from './ElectronMap';
interface Props {
  onFinish: Function;
}
const App = ({ onFinish }: Props) => {
  let [mapPoint, setMapPoint] = useState('');
  const drawend = (val: any) => {
    setMapPoint(val);
    console.log(val, 'val');
  };
  const modifyend = (val: any) => {
    setMapPoint(val);
  };
  return (
    <div className={'../../src/. '}>
      <Row>
        <h2>新增围栏报警</h2>
      </Row>
      <Row gutter={0} style={{ backgroundColor: '#f6f6f6' }}>
        <Col span={6}>
          <ElectronForm mapPoint={mapPoint} onFinish={onFinish} />
        </Col>
        <Col span={18} style={{ padding: 0 }}>
          <ElectronMap point={''} drawend={drawend} modifyend={modifyend} />
        </Col>
      </Row>
    </div>
  );
};

export default App;
