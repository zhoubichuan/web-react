import React, { useRef, useEffect, useState } from 'react';//eslint-disable-line
// import styles from "./index.module.scss";
import { IAMap } from "./IAMap/index";
import { transform } from "ol/proj";
interface HeadProps {
  ref?: any,
  point: any,
  children?: any
}
let map: any = null;
const App = ({ point = [], children }: HeadProps) => {
  point = transform(point, "EPSG:4326", "EPSG:3857");
  const mapRef = useRef<any>(null)
  const newMap = (point = []) => {
    let config: any = {
      target: mapRef.current,
      interaction: true,
      token: JSON.parse(localStorage.getItem('auth') || '')?.access_token,
      code: 'sanshui',
      controls: false,
      hideCenterCircle: true,
      worker: true
    }
    if (window.location.host.includes('localhost')) {
      config.url = 'https://smart-sit.farmbgy.com'
    }
    map = new IAMap(config);
    map.insertLayer("pointLayer");
  };
  useEffect(() => {
    if (!map) {
      newMap(point)
    }
    if (point.length) {
      map.clear("pointLayer");
      map.insertIcon("pointLayer", {
        point,
        icon: 'wurenji.png',
        anchor: [0.48, 0.95]
      });
    }
  }, [point])

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  )
};

export default App;