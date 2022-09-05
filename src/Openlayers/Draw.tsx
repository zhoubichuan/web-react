import React, { useRef, useEffect, useState } from 'react';//eslint-disable-line
// import styles from "./index.module.scss";
import { IAMap } from "./IAMap/index";
interface HeadProps {
  ref?: any,
  point?: any,
  type?: any,
  wkt?: any,
  geojson?: any,
  drawstart?: Function,
  drawend?: Function,
  change?: Function,
  clear?: Function,
  modifyend?: Function,
  remove?: Function,
}
let map: any = null;
let layer: any = null
const App = ({ ref, point = [], type = "coordinate", ...rest }: HeadProps) => {
  const drawstart = (val: any) => {
    if (rest.drawstart) {
      rest.drawstart(val)
    }
  }
  const drawend = (val: any) => {
    if (rest.drawend) {
      rest.drawend(val)
    }
  }
  const change = (val: any) => {
    if (rest.change) {
      rest.change(val)
    }
  }
  const clear = (val: any) => {
    if (rest.clear) {
      rest.clear(val)
    }
  }
  const remove = (val: any) => {
    if (rest.remove) {
      rest.remove(val)
    }
  }
  const mapRef = useRef<any>(null)
  const newMap = () => {
    map = new IAMap({
      target: mapRef.current,
      token: "018e93e7-de0f-4de2-b9e3-48535c1eb56b",
      plugins: ["satellite"],
      farmId: "1539126838737072130",
      code: '1'
    });
    layer = map.insertLayer("line"); // 实时路径图层
  };

  useEffect(() => {
    if (!map) {
      newMap()
    }
    map.clear("line");
    map.insertDraw("line", {
      point: point,
      icon: 'wurenji.png',
      anchor: [0.48, 0.95],
      drawstart,
      drawend,
      change,
      clear,
      remove,
      type
    });
    return () => {
      map = null
    }
  }, [point])
  const handleRemove = (map: any) => {

  }
  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
  )
};

export default App;