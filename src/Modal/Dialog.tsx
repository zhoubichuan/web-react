import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
enum sizeEnum {
  big = 1500,
  middle = 1000,
  small = 800
}
type sizeTYPES = keyof typeof sizeEnum;
interface Props {
  showDialog: boolean;
  changeDialog: Function;
  children: any;
  size?: sizeTYPES;
}
const App = ({ showDialog, changeDialog, children, size = 'middle' }: Props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(showDialog);
  }, [showDialog]);
  return (
    <>
      <Modal
        className={styles.dialog}
        centered
        visible={visible}
        onOk={() => changeDialog(false)}
        onCancel={() => changeDialog(false)}
        width={sizeEnum[size]}
        destroyOnClose={true}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default App;
