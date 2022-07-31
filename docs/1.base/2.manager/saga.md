---
nav:
  title: 基础知识
  order: 1
group:
  title: React 功能模块
  order: 3
title: 项目优化
order: 9
---

# 八.图表

- echarts 模板

```js
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

```js
export default () => {
  const chartRef = useRef < ECharts > null
  const [chartOption, setChartOption] = useState < any > null
  useEffect(() => {
    setChartOption({})
  }, [])
  return <Charts option={chartOption} actionRef={chartRef} />
}
```
