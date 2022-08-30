---
nav:
  title: 基础知识
  order: 1
group:
  title: React 功能模块
  order: 3
title: 八.图表
order: 9
---

# 八.图表

- echarts 模板

```ts
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

- 使用模板

```tsx
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
interface ChartsProps {
  option: any;
  actionRef?: any;
  style?:any
}

const Charts = (props: ChartsProps) => {
  const { option, actionRef: propsActionRef } = props;
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
    resizeObserver.observe(chartRef.current as Element);
    return () => {
      return resizeObserver.disconnect();
    };
  }, [option]);

  return <div style={{ height: '100%', width: '100%' }} ref={chartRef} />;
};
const App = () => {
  const chartRef = useRef(null)
  const [chartOption, setChartOption] = useState({})
  useEffect(() => {
    let options = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {},
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }]
    }
    setChartOption(options)
  }, [])
  return (
    <div style={{height: '300px'}}>
      <Charts option={chartOption} actionRef={chartRef}/>
    </div>
  )
}
export default App
```
