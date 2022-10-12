import React, { useRef, useEffect, useState } from 'react';
import { IAMap } from './IAMap/index';
interface HeadProps {
  ref?: any;
  point?: any;
  type?: any;
  wkt?: any;
  geojson?: any;
  drawstart?: Function;
  drawend?: Function;
  change?: Function;
  clear?: Function;
  modifyend?: Function;
  remove?: Function;
}
const App = ({ ref, point = [], type = 'coordinate', ...rest }: HeadProps) => {
  const drawstart = (val: any) => {
    if (rest.drawstart) {
      rest.drawstart(val);
    }
  };
  const drawend = (val: any) => {
    if (rest.drawend) {
      rest.drawend(val);
    }
  };
  const change = (val: any) => {
    if (rest.change) {
      rest.change(val);
    }
  };
  const clear = (val: any) => {
    if (rest.clear) {
      rest.clear(val);
    }
  };
  const remove = (val: any) => {
    if (rest.remove) {
      rest.remove(val);
    }
  };
  const mapRef = useRef<any>(null);
  const drawMap = useRef<any>(null);
  const drawLayer = useRef<any>(null);
  useEffect(() => {
    let {
      ffarmRespVO: { code }
    } = JSON.parse(localStorage.getItem('userInfo') || '{}');
    let config: any = {
      target: mapRef.current,
      interaction: true,
      token: JSON.parse(localStorage.getItem('auth') || '')?.access_token,
      code,
      controls: false,
      hideCenterCircle: true,
      worker: true,
      plugins: [
        'tile', // 卫星地图
        'tilePlugin', // 影像底图
        'field' // 田块
      ]
    };
    if (window.location.host.includes('localhost')) {
      config.url = 'https://smart-sit.farmbgy.com';
    }
    drawMap.current = new IAMap(config);
    drawLayer.current = drawMap.current.insertLayer('line', { zIndex: 1006 });
  }, []);

  useEffect(() => {
    drawMap.current.clear('line');
    drawMap.current.insertDraw('line', {
      point: point,
      drawstart,
      drawend,
      change,
      clear,
      remove,
      type
    });
  }, [point]);
  const handleRemove = (map: any) => {};
  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default App;
