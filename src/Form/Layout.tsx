import { Button, Form } from '../.';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import React from 'react';
const layout = {
  name: 'wrap',
  labelCol: { flex: '110px' },
  colon: false,
  wrapperCol: { flex: 1 },
  autoComplete: 'off',
  labelWrap: true,
  labelAlign: 'left',
};
interface LayoutProps {
  formItemData: any;
  mapPoint?: string;
  data?: any;
  onFinish?: Function;
  children?: any;
  onRef?: any;
  request?: any;
}
const App: React.FC<LayoutProps> = ({
  formItemData,
  onFinish: handleFinish,
  children,
  request,
  data,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue(data);
  const onFinish = async (values: any) => {
    request?.(values);
  };
  const onReset = () => {
    form.resetFields();
    handleFinish?.(false);
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
                  <Form.Item {...rest}>
                    {render ? (
                      render(i.shouldUpdate ? form.getFieldValue(i.name) : null)
                    ) : (
                      <Form.Text />
                    )}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      })}
      {children}
      {request && (
        <Row justify="end">
          <Button size="large" htmlType="button" onClick={onReset}>
            取消
          </Button>
          <Button size="large" type="primary" htmlType="submit" style={{ margin: '0 0 0 20px' }}>
            保存
          </Button>
        </Row>
      )}
    </Form>
  );
};

export default App;
