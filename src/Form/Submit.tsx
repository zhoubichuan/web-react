import { Button, Form, Input, Select, Space, Radio, DatePicker, message } from '@/antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
// import { addAlarmElectronicFence, getPage, updateAlarmElectronicFence } from '@/api';
import type {
  addAlarmElectronicFenceParams,
  getPageParams,
  updateAlarmElectronicFenceParams,
} from '@/api';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  autoComplete: 'off',
};
interface FormProps {
  mapPoint?: string;
  data?: any;
  onFinish: Function;
}
const App = ({ mapPoint, data, onFinish: handleFinish }: FormProps) => {
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
      // let res = await updateAlarmElectronicFence(parmas);
      // if (res) {
      //   message.success('数据更新成功');
      //   handleFinish(false);
      // }
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
      // let res = await addAlarmElectronicFence(parmas);
      // if (res) {
      //   message.success('数据创建成功');
      //   handleFinish(false);
      // }
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
      <Form.Item
        labelCol={{ span: 6, offset: 0 }}
        name="name"
        label="围栏名称"
        rules={[{ required: true, message: '围栏名称必填' }]}
      >
        <Input placeholder="请输入围栏名称" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6, offset: 0 }}
        name="type"
        label="报警类型"
        rules={[{ required: true, message: '报警类型必填' }]}
      >
        <Radio.Group onChange={onChange}>
          <Radio value={0}>进入报警</Radio>
          <Radio value={1}>退出报警</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6, offset: 0 }}
        name="machineCodes"
        label="约束农机"
        rules={[{ required: true, message: '约束农机必填' }]}
      >
        <Select placeholder="请选择农机" onChange={onGenderChange} allowClear>
          {machineOptions.map((item: any) => (
            <Option value={item.code} key={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6, offset: 0 }}
        name="time"
        label="约束时间"
        rules={[{ required: true, message: '约束时间必填' }]}
      >
        <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item labelCol={{ span: 6, offset: 0 }} name="remark" label="备注">
        <Input.TextArea />
      </Form.Item>
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
