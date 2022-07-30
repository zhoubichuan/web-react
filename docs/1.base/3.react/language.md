---
nav:
  title: 基础知识
  order: 1
group:
  title: React 17.x 全家桶
  order: 4
title: Ant-design
order: 10
---

# 七.Ant-design
- echarts模板
```jsx
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
interface ChartsProps {
  id: any;
  option: any;
  actionRef?: any;
}

export default (props: ChartsProps) => {
  const { option, actionRef: propsActionRef, id } = props;
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: echarts.ECharts;
    if (chartRef.current && option) {
      chart = echarts.init(chartRef.current);
      chart.setOption(option);
      if (propsActionRef) {
        propsActionRef.current = chart;
      }
    }
    const resizeObserver = new ResizeObserver(
      _.debounce(() => {
        chart && chart.resize();
      }, 150),
    );
    resizeObserver.observe(document.getElementById(id) as Element);
    return () => {
      return resizeObserver.disconnect();
    };
  }, [option]);

  return <div style={{ height: '100%', width: '100%' }} ref={chartRef} />;
};
```
-使用
```jsx
export default () => {
  const chartRef = useRef<ECharts>(null)
  const [chartOption, setChartOption] = useState<any>(null);
  useEffect(() => {
    setChartOption({})
  }, [])
  return <Charts option={chartOption} actionRef={chartRef} />
}
```
