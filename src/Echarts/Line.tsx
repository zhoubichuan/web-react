import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.scss';

interface Props {
  op: any;
  style?: any
}
const App = ({ op }: Props) => {
  var myChart;
  const chartRef = useRef<any>(null);
  useEffect(() => {
    mapOption();
  }, [op]);
  const mapOption = () => {
    myChart = echarts.init(chartRef.current);
    myChart.setOption(op);
  };
  return <div className={styles.pieChart} ref={chartRef}></div>;
};
export default App