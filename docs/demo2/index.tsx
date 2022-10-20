import { Layout, Button, Space, Badge, message, Descriptions, Modal, Input } from '../../src/.';
import React, { useState } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Edit from './Edit';
import View from './View';

interface DataType {
  code: number;
  work: string;
  operateArea: number;
  operateDistance: number;
  taskEndTime: string;
  taskStatus: number;
  evaluationState: number;
  option: [];
}
const App: React.FC = () => {
  const handleContinue = async (_: any, state: string) => {
    setCurState([true, state]);
  };
  const [curState, setCurState] = useState([false, 'view'] as [boolean, string]);
  // const requestFn = async (page: any, params: any, callback: Function) => {
  //   let defaultParams: any = {
  //     curPage: page.current,
  //     pageSize: page.pageSize,
  //     page: 1,
  //     index: 1,
  //     limit: 20,
  //   };
  //   params = { ...defaultParams, ...params };
  //   // let {
  //   //   result: { data, pageIndex, pageSize, total },
  //   // } = await getMachineWaringDetail(params);
  //   return {
  //     data: [
  //       {
  //         id: 1,
  //       },
  //       {
  //         id: 1,
  //       },
  //       {
  //         id: 1,
  //       },
  //       {
  //         id: 1,
  //       },
  //       {
  //         id: 1,
  //       },
  //     ] as ColumnsType<DataType>,
  //     page: { total: 5, pageSize: 20, current: 1 },
  //   };
  // };
  return (
    <>
      <Layout.PageTemplate
        title="设备品类"
        search={{
          template: [
            {
              name: 'name1',
              label: '农机型号',
              rules: [{ required: true, message: '农机型号必填' }],
              render: () => <Input placeholder="请输入" />,
            },
          ],
          button: [
            <Button.Image
              type="primary"
              htmlType="submit"
              icon={'add'}
              onClick={() => setCurState([false, 'edit'])}
            >
              新增农机
            </Button.Image>,
          ],
        }}
        table={{
          template: [
            {
              title: '序号',
              width: 150,
              fixed: 'left',
              align: 'left',
              render: (text, record, index) => {
                return index + 1;
              },
            },
            {
              title: '品类ID',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'id',
            },
            {
              title: '品类名称',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'name',
            },
            {
              title: '父级品类',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'categoryPath',
            },
            {
              title: '创建时间',
              width: 100,
              dataIndex: 'createTime',
              key: 'createTime',
            },
            {
              title: '更新时间',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'updateTime',
            },
            {
              title: '操作',
              width: 240,
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" block onClick={() => handleContinue(_, 'view')}>
                    查看
                  </Button>
                  <Button type="link" block onClick={() => handleContinue(_, 'edit')}>
                    编辑
                  </Button>
                </Space>
              ),
            },
          ] as ColumnsType<DataType>,
          data: {
            data: [
              {
                id: 1,
              },
              {
                id: 1,
              },
              {
                id: 1,
              },
              {
                id: 1,
              },
              {
                id: 1,
              },
            ] as ColumnsType<DataType>,
            page: { total: 5, pageSize: 20, current: 1 },
          },
        }}
        // request={requestFn}
      />
      <Modal.Dialog
        showDialog={curState[0]}
        changeDialog={(val: boolean) => setCurState([val, 'view'])}
        size={'big'}
      >
        {curState[1].includes('edit') && (
          <Edit onFinish={(val: boolean) => setCurState([val, 'edit'])} />
        )}
        {curState[1].includes('view') && (
          <View onFinish={(val: boolean) => setCurState([val, 'view'])} />
        )}
      </Modal.Dialog>
    </>
  );
};

export default App;
