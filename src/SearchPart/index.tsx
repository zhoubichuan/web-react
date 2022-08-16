import { Button, Form, Input, Row, Col } from 'antd';
import { useImperativeHandle, useEffect } from 'react';
// import styles from "./index.module.scss";
import 'antd/lib/button/style'
import 'antd/lib/form/style'
import 'antd/lib/input/style'
import 'antd/lib/row/style'
import 'antd/lib/col/style'
function urlJoinParams(url: String, obj: String) {
    let result = '';
    let item;
    if (url.includes("?")) {
        for (item in obj) {
            if (obj[item] && String(obj[item])) {
                result += `&${item}=${obj[item]}`;
            }
        }
    } else {
        result += "?"
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
    searchData: Function,
    requestUrl: String,
    className?: any
}
const App = (props: SearchProps) => {
    const [form] = Form.useForm();
    const handleSearch = (params: any = { name: '', type: '', current: 1, pageSize: 20 }) => {
        fetch(urlJoinParams(props.requestUrl, params))
            .then(response => response.json())
            .then(data => {
                props.searchData(data)
            })
    };
    useEffect(() => {
        handleSearch()
    }, [])
    const onFinish = (values: any) => {
        handleSearch({ name: values.name || '', type: values.type || '', current: 1, pageSize: 20 })
    }
    const onReset = () => {
        form.resetFields()
    }
    useImperativeHandle(props.onRef, () => {
        return {
            handleSearch: handleSearch
        }
    })
    return (
        <Form
            // className={styles.form}
            onFinish={onFinish}
            wrapperCol={{ span: 30, offset: 0 }}
            size='large'
            layout={'inline'}
            form={form}
            initialValues={{ layout: 'inline' }}
        >
            <Row gutter={24} style={{ width: '100%' }}>
                <Col span={4}>
                    <Form.Item name="name">
                        <Input placeholder="请输入号码" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="type">
                        <Input placeholder="请选择任务类型" />
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Form.Item >
                        <Button type="default" onClick={onReset}>重置</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default App;