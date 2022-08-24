---
title: Echarts
nav:
  path: /components
---

# Echarts

```tsx
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
    <Echarts
      option={chartOption}
      actionRef={chartRef}
      style={{ height: '800px' }}
    />
  )
}
export default App
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
