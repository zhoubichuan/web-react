import { Button } from 'antd';
import type { ButtonProps } from 'antd';
// import './index.module.scss';
// import styles from './index.module.scss';
import Default from './Default';
import Image from './Image';
import Rate from './Rate';

const App = (props: ButtonProps) => {
  return (
    <Button className={'mybtn'} {...props}>
      {props.children}
    </Button>
  );
};
App.Default = Default;
App.Image = Image;
App.Rate = Rate;
export default App;
