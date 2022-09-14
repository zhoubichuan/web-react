---
title: Echarts
nav:
  path: /components
---

# Echarts

- Pie

```tsx
/**
 * Echarts.Pie: 折线图
 * option: 相关参数
 */
import React, { useRef, useState, useEffect } from 'react'
import { Echarts } from 'myantd'
const App: React.FC = () => {
  const chartRef = useRef<ECharts>(null)
  const [chartOption, setChartOption] = useState<any>(null)
  useEffect(() => {
    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    }
    setChartOption(option)
  }, [])
  return (
    <Echarts.Pie
      option={chartOption}
      actionRef={chartRef}
      style={{ height: '300px' }}
    />
  )
}
export default App
```

- Bar

```tsx
/**
 * Echarts.Bar: 折线图
 * option: 相关参数
 */
import React, { useRef, useState, useEffect } from 'react'
import { Echarts } from 'myantd'
const App: React.FC = () => {
  const chartRef = useRef<ECharts>(null)
  const [chartOption, setChartOption] = useState<any>(null)
  useEffect(() => {
    let option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    setChartOption(option)
  }, [])
  return (
    <Echarts.Bar
      option={chartOption}
      actionRef={chartRef}
      style={{ height: '300px' }}
    />
  )
}
export default App
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |
