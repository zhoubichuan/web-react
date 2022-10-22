import { Button, Form, Input, Select, Space, Radio, DatePicker, message } from '../.';
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
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  autoComplete: 'off',
};
interface FormProps {
  formItemData: any;
  mapPoint?: string;
  data?: any;
  onFinish: Function;
}
const App = ({ formItemData, mapPoint, data, onFinish: handleFinish }: FormProps) => {
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
    <Form {...layout} form={form} onFinish={onFinish} className={styles.electronForm}>
      {formItemData.map((item: any, index: number) => {
        let { render, ...rest } = item;
        return (
          <Form.Item {...rest} key={item.name}>
            {render()}
          </Form.Item>
        );
      })}
      <Space size={[10, 8]}>
        <Button
          size="large"
          htmlType="button"
          onClick={onReset}
          style={{ width: '168px', display: 'inline' }}
        >
          取消
        </Button>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: '168px', display: 'inline' }}
        >
          保存
        </Button>
      </Space>
    </Form>
  );
};

export default App;
