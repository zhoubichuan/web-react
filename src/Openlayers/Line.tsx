import React, { useRef, useEffect, useState } from 'react';//eslint-disable-line
// import styles from "./index.module.scss";
import { IAMap } from "./IAMap/index";
interface HeadProps {
  ref?: any,
  line?: any
}
let map: any = null;
const App = ({ line = [] }: HeadProps) => {

  const mapRef = useRef<any>(null)
  const newMap = (point = []) => {
    map = new IAMap({
      target: mapRef.current,
      token: "018e93e7-de0f-4de2-b9e3-48535c1eb56b",
      plugins: ["satellite"],
      farmId: "1539126838737072130",
      code: '1',
    });
    map.insertLayer("line"); // 实时路径图层
  };
  useEffect(() => {
    if (!map) {
      newMap(line)
    } else {
      map.clear("line");
      map.insertIcon("line", {
        point: line,
        icon: 'wurenji.png',
        anchor: [0.48, 0.95]
      });
    }
  }, [line])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
};

export default App;