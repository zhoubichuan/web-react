import { Form } from 'antd';
import { Button, Input, Cascader, Row, Col, Select } from '../.';
import { useImperativeHandle, useEffect, useState } from 'react';
import styles from './index.module.scss';
interface SearchProps {
  type?: any;
  onRef: any;
  searchData?: Function;
  requestUrl?: String;
  children?: any;
  className?: any;
  formItemData: any[];
  requestFn?: Function;
  btnHide?: Boolean;
  onChange?: Function;
}
const App = (props: SearchProps) => {
  const [form] = Form.useForm();
  const [formItemData, setFormItemData] = useState([] as any);
  useEffect(() => {
    setFormItemData(props.formItemData);
  }, [props.formItemData]);
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
    props.formItemData.forEach((item) => {
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
      handleSearch: handleSearch,
    };
  });
  const handleFieldChange = (changedValues: any, allValues: any) => {
    if (props.onChange) {
      props.onChange(allValues);
    }
  };
  return (
    <div className={styles.search}>
      <Form
        onFinish={onFinish}
        wrapperCol={{ span: 30, offset: 0 }}
        size="large"
        layout={'inline'}
        form={form}
        initialValues={{ layout: 'inline' }}
        onValuesChange={handleFieldChange}
      >
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
      </Form>
    </div>
  );
};

export default App;
