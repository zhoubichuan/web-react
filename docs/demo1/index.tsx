import { Card, Tabs } from 'antd';
import React from 'react';
import Content1 from './Content'
import Content2 from './Content'
import styles from "./index.module.scss";
import 'antd/lib/Card/style'; 
import 'antd/lib/Tabs/style'; 
const { TabPane } = Tabs;

const handleOnChange = (key: string) => {
    console.log(key);
};

const App: React.FC = () => {
    return (
        <Card className={styles.card}>
            <Tabs defaultActiveKey="1" onChange={handleOnChange}>
                <TabPane tab="页签一" key="1">
                    <Content1 />
                </TabPane>
                <TabPane tab="页签二" key="2">
                    <Content2 />
                </TabPane>
            </Tabs>
        </Card>
    )
};

export default App;