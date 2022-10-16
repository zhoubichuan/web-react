import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

export default {
  name: 'satellite',

  install(vm:any) {
    return new TileLayer({
      source: new XYZ({
        url: `https://t{0-7}.tianditu.gov.cn/DataServer?tk=d97ee4980a986e7d0c4f0a8c8f103a94&T=img_w&x={x}&y={y}&l={z}`,
      }),
    });
  },
};
