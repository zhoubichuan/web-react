---
title: Openlayers
nav:
  path: /components
---

# Openlayers

```tsx
import { Openlayers } from 'myantd';
interface HeadProps {
  data?: any,
}
const drawstart = (val: any) => {

}
const drawend = (val: any) => {
console.log(val,'11111111111111')
}
const change = (val: any) => {

}
const clear = (val: any) => {

}
const App = ({ data }: HeadProps) => {
  return (
    <Openlayers.Edit
      wkb={'POLYGON((12564707.080045568 2697898.1333784987,12564765.004981065 2697810.3502288274,12564896.978287714 2697914.2568141525,12564799.640509507 2697932.7689069402,12564707.080045568 2697898.1333784987))'}
      drawstart={drawstart}
      drawend={drawend}
      change={change}
      clear={clear}
    />
  )
};

export default App;
```

### API
事件名称	说明	回调参数
drawstart	绘制开始时触发	事件对象
drawend	绘制结束时触发	事件对象，feature：Feature对象， userFeature：格式化后的图形数据（feature和userFeature放进对应图形的组件的data中都可以直接显示）
change	图形改变时触发	事件对象
clear	清除图形时触发	-
| 事件名称                  | 说明            | Type    | 回调参数 |
| --------------------- | ---------------------- | ------- | ------- |
| drawstart | 绘制开始时触发  | function | 事件对象   |
| drawend | 绘制结束时触发  | function | 事件对象，feature：Feature对象， userFeature：格式化后的图形数据（feature和userFeature放进对应图形的组件的data中都可以直接显示）   |
| change | 图形改变时触发  | function | 事件对象   |
| clear | 清除图形时触发  | function | -   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
