import { Button, Form, Input, Select, Space, Radio, DatePicker, message } from '../.';
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import type {
  addAlarmElectronicFenceParams,
  getPageParams,
  updateAlarmElectronicFenceParams,
} from '@/api';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const layout = {
  name: 'wrap',
  labelCol: { flex: '110px' },
  colon: false,
  wrapperCol: { flex: 1 },
  autoComplete: 'off',
  labelWrap: true,
  labelAlign: 'left',
};
interface FormProps {
  formItemData: any;
  mapPoint?: string;
  data?: any;
  onFinish: Function;
}
const App = ({ formItemData, mapPoint, data, onFinish: handleFinish }: FormProps) => {
  const [machineOptions, setMachineOptions] = useState([]);
  useEffect(() => {
    let pageParams: getPageParams = {
      pageIndex: '1',
      pageSize: '300',
    };
    // getPage(pageParams).then((res1) => {
    //   setMachineOptions(res1.data);
    // });
  }, []);
  const [form] = Form.useForm();
  if (data) {
    let formValue = {
      ...data,
      time: [
        moment(data.constraintsTimeStart, dateFormat),
        moment(data.constraintsTimeEnd, dateFormat),
      ],
    };
    form.setFieldsValue(formValue);
  } else {
    form.setFieldsValue({ type: 0 });
  }

  const onGenderChange = (value: string) => {};
  const onFinish = async (values: any) => {
    let { machineCodes, name, remark, time = ['', ''], type, code } = values;
    let [constraintsTimeStart, constraintsTimeEnd] = time;
    if (constraintsTimeEnd) {
      constraintsTimeEnd = constraintsTimeEnd?.format(dateFormat);
    }
    if (constraintsTimeStart) {
      constraintsTimeStart = constraintsTimeStart?.format(dateFormat);
    }
    if (data) {
      let parmas: updateAlarmElectronicFenceParams = {
        code,
        id: data.id,
        machineCodes,
        name,
        remark,
        constraintsTimeEnd,
        constraintsTimeStart,
        type,
        fence: mapPoint,
      };
    } else {
      let parmas: addAlarmElectronicFenceParams = {
        machineCodes,
        name,
        remark,
        constraintsTimeEnd,
        constraintsTimeStart,
        type,
        fence: mapPoint,
      };
      if (!parmas.fence) {
        message.warning('请设置围栏边界');
        return false;
      }
    }
  };

  const onReset = () => {
    // form.resetFields();
    handleFinish(false);
  };

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish} className={styles.layout}>
      {formItemData.map((item: any, index: number) => {
        return (
          <Row key={index} gutter={16}>
            {item.map((i: any, childIndex: number) => {
              let { render, ...rest } = i;
              let span = 24 / item.length;
              return (
                <Col key={childIndex} span={span}>
                  <Form.Item {...rest}>{render()}</Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      })}
      <Row justify="end">
        <Button size="large" htmlType="button" onClick={onReset}>
          取消
        </Button>
        <Button size="large" type="primary" htmlType="submit" style={{ margin: '0 0 0 20px' }}>
          保存
        </Button>
      </Row>
    </Form>
  );
};

export default App;
