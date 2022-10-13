import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';

interface newButtonProps extends ButtonProps {
  playbtn?: string;
  imagestyle?: Array<number>;
}
const App = ({ playbtn, imagestyle = [16, 16], ...props }: newButtonProps) => {
  return (
    <Button type="default" className={'defaultBtn'} {...props}>
      {props.children}
    </Button>
  );
};
export default App;
