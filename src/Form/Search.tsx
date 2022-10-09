import { Form } from 'antd';
import { Button, Input, Cascader, Row, Col, Select } from '../.';
import { useImperativeHandle, useEffect, useState } from 'react';
import styles from './index.module.scss';
function urlJoinParams(url: any, obj: any) {
  let result = '';
  let item;
  if (url.includes('?')) {
    for (item in obj) {
      if (obj[item] && String(obj[item])) {
        result += `&${item}=${obj[item]}`;
      }
    }
  } else {
    result += '?';
    for (item in obj) {
      if (obj[item] && String(obj[item])) {
        result += `&${item}=${obj[item]}`;
      }
    }
  }
  return url + result;
}
interface SearchProps {
  type?: any;
  onRef: any;
  searchData?: Function;
  requestUrl?: String;
  children?: any;
  className?: any;
  columns: any[];
  requestFn?: Function;
  btnHide?: Boolean;
  onChange?: Function;
}
const SelectComponent = (item: any) => {
  if (!item.fieldNames) {
    item.fieldNames = { label: 'label', value: 'value' };
  }
  return (
    <Form.Item name={item.name} key={item.name}>
      <Select allowClear placeholder={item.placeholder} style={{ width: '100%' }}>
        {item.options.map((option: any, index: number) => (
          <Select.Option value={option.code} key={index}>
            {option.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
const InputComponent = (item: any) => {
  return (
    <Form.Item name={item.name} key={item.name}>
      <Input
        allowClear
        placeholder={item.placeholder}
        disabled={item.disabled}
        defaultValue={item.defaultValue}
      />
    </Form.Item>
  );
};
const TextAreaComponent = (item: any) => {
  return (
    <Form.Item name={item.name} key={item.name}>
      <Input allowClear placeholder={item.placeholder} />
    </Form.Item>
  );
};
const CascaderComponent = (item: any) => {
  return (
    <Form.Item name={item.name} key={item.name}>
      <Cascader
        allowClear
        options={item.options}
        placeholder={item.placeholder}
        fieldNames={{ label: 'name', value: 'id' }}
      />
    </Form.Item>
  );
};
const App = (props: SearchProps) => {
  const [form] = Form.useForm();
  const [formItemData, setFormItemData] = useState([] as any);
  useEffect(() => {
    setFormItemData(props.columns);
  }, [props.columns]);
  const handleSearch = (params: any) => {
    if (props.requestFn) {
      props.requestFn(params, (data: any) => {
        if (props.searchData) {
          props.searchData(data);
        }
      });
    }
  };
  useEffect(() => {
    if (props.type !== 'select') {
      handleSearch({});
    }
  }, []);
  const onFinish = (values: any) => {
    let targetField: any = {};
    props.columns.forEach((item) => {
      if (values[item.name] !== undefined || '') {
        if (item.type === 'cascader') {
          targetField[item.name] = values[item.name][values[item.name].length - 1];
        } else {
          targetField[item.name] = values[item.name];
        }
      }
    });
    handleSearch({ ...targetField });
  };
  const onReset = () => {
    form.resetFields();
    handleSearch({});
  };
  useImperativeHandle(props.onRef, () => {
    return {
      handleSearch: handleSearch
    };
  });
  const handleFieldChange = (changedValues: any, allValues: any) => {
    if (props.onChange) {
      props.onChange(allValues);
    }
  };
  return (
    <Form
      className={'myantd ' + styles.form}
      onFinish={onFinish}
      wrapperCol={{ span: 30, offset: 0 }}
      size="large"
      layout={'inline'}
      form={form}
      initialValues={{ layout: 'inline' }}
      onValuesChange={handleFieldChange}>
      <Row gutter={24} style={{ width: '100%' }}>
        {formItemData.map((item: any, index: number) => (
          <Col span={6} key={index}>
            {item.type === undefined && InputComponent(item)}
            {item.type === 'select' && SelectComponent(item)}
            {item.type === 'textarea' && TextAreaComponent(item)}
            {item.type === 'cascader' && CascaderComponent(item)}
          </Col>
        ))}
        {!props.type && (
          <>
            <Form.Item>
              <Button.Image type="primary" htmlType="submit" icon={'search'}>
                查询
              </Button.Image>
            </Form.Item>
            <Form.Item>
              <Button.Image type="default" onClick={onReset} icon={'refresh'}>
                重置
              </Button.Image>
            </Form.Item>
          </>
        )}
        {props.children}
      </Row>
    </Form>
  );
};

export default App;
