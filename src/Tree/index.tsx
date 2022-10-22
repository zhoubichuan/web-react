import { Tree } from 'antd';
import type { TreeProps } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
// const App = (props: TreeProps) => {
//   return <Tree {...props}>{children}</Tree>;
// };
const App = ({ onChange, title, ...rest }: any) => {
  const [value, setValue] = useState<any>([]);
  useEffect(() => {
    onChange?.(value);
  }, []);
  const onSelect = (selectedKeys: any, info: any) => {
    setValue(info.checkedNodes);
    onChange?.(info.checkedNodes);
  };
  return (
    <>
      {title}
      <Tree checkable onSelect={onSelect} onCheck={onSelect} {...rest} />
    </>
  );
};
App.DirectoryTree = Tree.DirectoryTree;
export default App;
