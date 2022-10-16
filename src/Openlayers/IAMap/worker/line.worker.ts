import { transform } from 'ol/proj';

class Douglas {
  DMAX_UNIT: number;
  DOUBLE_VALUE_UNIT: number;
  constructor() {
    this.DMAX_UNIT = 2000;
    this.DOUBLE_VALUE_UNIT = 2000;
  }

  /**
   * 计算两点距离
   *
   * @param point1
   * @param point2
   * @return
   */
  calculationDistance(point1, point2) {
    let lat1 = point1['x'];
    let lat2 = point2['x'];
    let lng1 = point1['y'];
    let lng2 = point2['y'];
    let radLat1 = (lat1 * Math.PI) / 180.0;
    let radLat2 = (lat2 * Math.PI) / 180.0;
    let a = radLat1 - radLat2;
    let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
        ),
      );
    return s * 6370996.81;
  }

  /**
   * 计算点pX到点pA和pB所确定的直线的距离
   *
   * @param start
   * @param end
   * @param center
   * @return
   */
  distToSegment(start, end, center) {
    let a = Math.abs(this.calculationDistance(start, end));
    let b = Math.abs(this.calculationDistance(start, center));
    let c = Math.abs(this.calculationDistance(end, center));
    let p = (a + b + c) / 2.0;
    let s = Math.sqrt(Math.abs(p * (p - a) * (p - b) * (p - c)));
    return (s * 2.0) / a;
  }

  /**
   * 递归方式压缩轨迹
   *
   * @param coordinate
   * @param result
   * @param start
   * @param end
   * @param dMax
   * @return
   */
  compressLine(coordinate, result, start, end, dMax) {
    if (start < end) {
      let maxDist = 0;
      let currentIndex = 0;
      let startPoint = coordinate[start];
      let endPoint = coordinate[end];
      for (let i = start + 1; i < end; i++) {
        let currentDist = this.distToSegment(startPoint, endPoint, coordinate[i]);
        if (currentDist > maxDist) {
          maxDist = currentDist;
          currentIndex = i;
        }
      }
      if (maxDist >= dMax) {
        //将当前点加入到过滤数组中
        result.push(coordinate[currentIndex]);
        //将原来的线段以当前点为中心拆成两段，分别进行递归处理
        this.compressLine(coordinate, result, start, currentIndex, dMax);
        this.compressLine(coordinate, result, currentIndex, end, dMax);
      }
    }
    return result;
  }

  /**
   * @param coordinate 原始轨迹Array<{latitude,longitude}>
   * @param dMax       允许最大距离误差
   * @return douglasResult 抽稀后的轨迹
   */
  douglasPeucker(coordinate, dMax) {
    //抽稀点数量需要大于2
    if (coordinate == null || coordinate.length <= 2) {
      return null;
    }

    let coordinate2 = [];
    for (let i = 0; i < coordinate.length; i++) {
      let point = {
        x: coordinate[i]['x'],
        y: coordinate[i]['y'],
        idx: i,
      };
      coordinate2.push(point);
    }

    let result = [];
    result = this.compressLine(coordinate2, result, 0, coordinate2.length - 1, dMax);
    result.push(coordinate2[0]);
    result.push(coordinate2[coordinate2.length - 1]);

    result.sort((u1, u2) => {
      if (u1['idx'] > u2['idx']) {
        return 1;
      } else if (u1['idx'] < u2['idx']) {
        return -1;
      }
      return 0;
    });
    return result;
  }

  /**
   * 获取geopoint集合
   *
   * @param coordinate
   * @param dMax
   * @param isTransform 是否需要坐标转换
   * @param original 原始坐标系
   * @param target 目标坐标系
   * @return
   */
  getList({ coordinate, dMax, isTransform, original, target }) {
    if (null == coordinate) {
      return null;
    }
    let doubleValue = null;
    if (coordinate.length > this.DOUBLE_VALUE_UNIT) {
      doubleValue = this.douglasPeucker(coordinate, dMax);
    } else {
      doubleValue = coordinate;
    }

    if (!isTransform) {
      return doubleValue.map((item) => {
        return [item.x, item.y];
      });
    } else {
      let geoPointList = [];
      for (let i = 0; i < doubleValue.length; i++) {
        let value = doubleValue[i];
        let geoPoint = transform([value['x'], value['y']], original, target);
        geoPointList.push(geoPoint);
        // if (OsmUtil.isValidate(geoPoint.getLatitude(), geoPoint.getLongitude())) {
        //   geoPointList.push(geoPoint);
        // }
      }
      return geoPointList;
    }
  }

  /**
   * 根据size获取系数值
   *
   * @param size
   * @return
   */
  getValue(size) {
    let value = 1;
    if (size > this.DOUBLE_VALUE_UNIT) {
      value = size / this.DOUBLE_VALUE_UNIT;
    }
    return value;
  }
}

onmessage = function (event) {
  console.log('[worker]: 消息', event);
  const { data } = event;
  let dou = new Douglas();
  let value = dou.getValue(data.length);
  let points = dou.getList({
    coordinate: data,
    isTransform: false,
    dMax: value * dou.DMAX_UNIT,
    original: localStorage.originalEPSG || 'EPSG:32649',
    target: 'EPSG:3857',
  });
  console.log('[worker]: 结果', points);

  this.postMessage(points);
};
