import { Button, Form, Row, Input, Col, Select } from 'antd';
import { useImperativeHandle, useEffect } from 'react';
import styles from './index.module.scss';
const Option = Select.Option;
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
  onRef: any;
  searchData: Function;
  requestUrl?: String;
  children?: any;
  className?: any;
  columns: any[];
  requestFn?: Function
}
const App = (props: SearchProps) => {
  const [form] = Form.useForm();

  const handleSearch = (params: any) => {
    if (props.requestFn) {
      props.requestFn((data: any) => {
        props.searchData(data);
      })
    } else {
      fetch(urlJoinParams(props.requestUrl, params))
        .then((response) => response.json())
        .then((data) => {
          props.searchData(data);
        });
    }

  };
  useEffect(() => {
    handleSearch({ current: 1, pageSize: 20 });
  }, []);
  const onFinish = (values: any) => {
    let targetField: any = {};
    props.columns.forEach((item) => {
      targetField[item.name] = values[item.name] || '';
    });
    handleSearch({ ...targetField, current: 1, pageSize: 20 });
  };
  const onReset = () => {
    form.resetFields();
  };
  useImperativeHandle(props.onRef, () => {
    return {
      handleSearch: handleSearch
    };
  });
  return (
    <Form
      className={styles.form}
      onFinish={onFinish}
      wrapperCol={{ span: 30, offset: 0 }}
      size="large"
      layout={'inline'}
      form={form}
      initialValues={{ layout: 'inline' }}>
      <Row gutter={24} style={{ width: '100%' }}>
        {props.columns.map((item, i) => (
          <Col span={4} key={item.name}>
            {item.type === undefined && (
              <Form.Item name={item.name}>
                <Input placeholder={item.placeholder} />
              </Form.Item>
            )}
            {item.type === 'select' && (
              <Form.Item name={item.name}>
                <Select placeholder={item.placeholder} style={{ width: '100%' }}>
                  {item.options.map((option: any) => (
                    <Option value={option.value} key={option.name}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {item.type === 'textarea' && (
              <Form.Item name={item.name}>
                <Input placeholder={item.placeholder} />
              </Form.Item>
            )}
          </Col>
        ))}
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="default" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Col>
        {props.children}
      </Row>
    </Form>
  );
};

export default App;
