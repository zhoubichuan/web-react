---
title: Openlayers
nav:
  path: /components
---

# Openlayers

```tsx
import { Openlayers, Button } from 'myantd'
interface DrawProps {
  point?: any
  drawstart?: any
  drawend?: any
  change?: any
  clear?: any
  modifyend?: any
}
const point =
  'POLYGON((12564707.080045568 2697898.1333784987,12564765.004981065 2697810.3502288274,12564896.978287714 2697914.2568141525,12564799.640509507 2697932.7689069402,12564707.080045568 2697898.1333784987))'
const drawend = (val: any) => {
  setMapPoint(val)
}
const change = (val: any) => {
  console.log(val, '333333333')
}
const modifyend = (val: any) => {
  setMapPoint(val)
}
const App = ({
  point = point,
  drawstart = drawstart,
  drawend = drawend,
  change = change,
  clear,
  modifyend = modifyend
}: DrawProps) => {
  const onDrawstart = (val: any) => {
    drawstart && drawstart(val)
  }
  const onDrawend = (val: any) => {
    drawend && drawend(val)
  }
  const onChange = (val: any) => {
    change && change(val)
  }
  const onClear = (val: any) => {
    clear && clear(val)
  }
  const onModifyend = (val: any) => {
    modifyend && modifyend(val)
  }
  const handleRemove = (map: any) => {}
  return (
    <>
      <Openlayers.Draw
        type="wkt"
        point={point}
        drawstart={onDrawstart}
        drawend={onDrawend}
        change={onChange}
        clear={onClear}
        modifyend={onModifyend}
        remove={handleRemove}
      ></Openlayers.Draw>
    </>
  )
}

export default App
```

### API

事件名称 说明 回调参数 drawstart 绘制开始时触发 事件对象 drawend 绘制结束时触发 事件对象，feature：Feature 对象， userFeature：格式化后的图形数据（feature 和 userFeature 放进对应图形的组件的 data 中都可以直接显示） change 图形改变时触发 事件对象 clear 清除图形时触发 - | 事件名称 | 说明 | Type | 回调参数 | | --------------------- | ---------------------- | ------- | ------- | | drawstart | 绘制开始时触发 | function | 事件对象 | | drawend | 绘制结束时触发 | function | 事件对象，feature：Feature 对象， userFeature：格式化后的图形数据（feature 和 userFeature 放进对应图形的组件的 data 中都可以直接显示） | | change | 图形改变时触发 | function | 事件对象 | | clear | 清除图形时触发 | function | - |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
