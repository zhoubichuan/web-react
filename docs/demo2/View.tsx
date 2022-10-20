import { Button, Form, Input, Select, Space, Radio, DatePicker, message } from '../../src/.';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Row, Col } from 'antd';
// import { addAlarmElectronicFence, getPage, updateAlarmElectronicFence } from '@/api';
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
  const formItemData = [
    [
      {
        name: 'name1',
        label: '农机型号',
        rules: [{ required: true, message: '农机型号必填' }],
        render: () => <Input placeholder="请输入" />,
      },
      {
        name: 'name',
        label: '农机类型',
        rules: [{ required: true, message: '农机类型必填' }],
        render: () => <Input placeholder="请输入" />,
      },
    ],
    [
      {
        name: 'machineCodes1',
        label: '工矿分类',
        rules: [{ required: true, message: '工矿分类必填' }],
        render: () => (
          <Select placeholder="请选择" onChange={onGenderChange} allowClear>
            {machineOptions.map((item: any) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        name: 'name2',
        label: '农机数量',
        rules: [{ required: true, message: '农机数量必填' }],
        render: () => <Input placeholder="请输入" addonAfter="台" />,
      },
    ],
    [
      {
        name: 'time1',
        label: '工矿分类',
        rules: [{ required: true, message: '约束时间必填' }],
        render: () => (
          <Input.Group>
            <Row>
              <Col flex={1}>
                <Input placeholder="请输入" style={{ width: '168px' }} />
              </Col>
              <Col flex={'20px'} style={{ textAlign: 'center', marginTop: '6px' }}>
                -
              </Col>
              <Col flex={1}>
                <Input placeholder="请输入" style={{ width: '168px' }} />
              </Col>
            </Row>
          </Input.Group>
        ),
      },
      {
        name: 'machineCodes2',
        label: '数值单位',
        rules: [{ required: true, message: '约束农机必填' }],
        render: () => (
          <Select placeholder="请选择农机" onChange={onGenderChange} allowClear>
            {machineOptions.map((item: any) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
    ],
    [
      {
        name: 'time',
        label: '设置报警工矿',
        rules: [{ required: true, message: '约束时间必填' }],
        render: () => (
          <Input.Group>
            <Row>
              <Col flex={1}>
                <Input placeholder="请输入" style={{ width: '168px' }} />
              </Col>
              <Col flex={'20px'} style={{ textAlign: 'center', marginTop: '6px' }}>
                -
              </Col>
              <Col flex={1}>
                <Input placeholder="请输入" style={{ width: '168px' }} />
              </Col>
            </Row>
          </Input.Group>
        ),
      },
      {
        name: 'machineCodes',
        label: '报警类型',
        rules: [{ required: true, message: '约束农机必填' }],
        render: () => (
          <Select placeholder="请选择农机" onChange={onGenderChange} allowClear>
            {machineOptions.map((item: any) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
    ],
    [
      {
        name: 'remark',
        label: '报警内容',
        rules: [{ required: true, message: '围栏名称必填' }],
        render: () => <Input.TextArea />,
      },
    ],
  ];
  return (
    <>
      <Row>
        <h2>新增阈值报警</h2>
      </Row>
      <Form.Layout formItemData={formItemData}></Form.Layout>
    </>
  );
};

export default App;
