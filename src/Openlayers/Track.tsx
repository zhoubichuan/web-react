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
let line: any = []
const App = ({ point = [], children }: HeadProps) => {
  point = transform(point, "EPSG:4326", "EPSG:3857");
  point.length && line.push(point)
  const mapRef = useRef<any>(null)
  const newMap = (point = []) => {
    map = new IAMap({
      target: mapRef.current,
      token: "018e93e7-de0f-4de2-b9e3-48535c1eb56b",
      plugins: ["satellite"],
      farmId: "1539126838737072130",
      code: '1',
    });
    map.insertLayer("trackLayer");
    map.insertLayer("pointLayer");
  };
  useEffect(() => {
    if (!map) {
      newMap(point)
    } else {
      map.clear("pointLayer");
      map.insertIcon("pointLayer", {
        point,
        icon: 'tractor.svg',
        anchor: [0.48, 0.95]
      });
      console.log(line, 'line')
      map.clear("trackLayer");
      map.insertLine('trackLayer', {
        color: '#FF7A46',
        width: 5,
        point: line,
      })
    }
  }, [point])

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  )
};

export default App;