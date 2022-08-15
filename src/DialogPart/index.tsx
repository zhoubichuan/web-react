import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from "./index.module.scss";
import 'antd/lib/modal/style';
interface Props {
    showDialod: boolean,
    changeDialog: Function,
    children: any
}
const App = ({ showDialod, changeDialog, children }: Props) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(showDialod)
    }, [showDialod])
    return (
        <>
            <Modal
                className={styles.dialog}
                centered
                visible={visible}
                onOk={() => changeDialog(false)}
                onCancel={() => changeDialog(false)}
                width={1000}
                destroyOnClose={true}
                footer={null}
            >
                {children}
            </Modal>
        </>
    );
};

export default App;