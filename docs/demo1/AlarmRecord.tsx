import { Layout, Space, Badge, Button, message, Descriptions, Modal } from '../../src/.';
import type { ColumnsType, TableProps } from 'antd/es/table';
// import type { queryTaskInfoListParams, machineryStatusParams } from '@/api';
// import { getMachineWaringRail } from '@/services/api/device';
import { useState, useEffect } from 'react';
import ElectronAdd from './ElectronAdd';
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

const App = (props: any) => {
  const handleContinue = async (_: any) => {};
  const [tableData, setTableData] = useState({
    data: [] as ColumnsType<DataType>,
    page: { total: 0, pageSize: 20, pageIndex: 1 },
  });
  const requestFn = async (page: any, params: any, callback: Function) => {
    let defaultParams: any = {
      current: page.current,
      pageSize: page.pageSize,
      page: 1,
      index: 1,
      limit: 20,
    };
    params = { ...defaultParams, ...params };
    params.taskId === '' && (params.taskId = undefined);
    params.typeName === '' && (params.typeName = undefined);
    params.startTime === '' && (params.startTime = undefined);
    // let {
    //   result: { data, pageIndex, pageSize, total },
    // } = await getMachineWaringRail(params);
    // setTableData({ data, page: { pageIndex, pageSize, total } });
    // return { data, page: { current: pageIndex, pageSize, total } };
  };
  return (
    <>
      <Layout.PageContent
        search={false}
        table={{
          template: [
            {
              title: '序号',
              width: 50,
              textWrap: 'word-break',
              fixed: 'left',
              align: 'left',
              render: (text: any, record: any, index: any) => {
                return index + 1;
              },
            },
            {
              title: '围栏名称',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'railName',
            },
            {
              title: '设置地点',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'railArea',
            },
            {
              title: '报警条件',
              width: 120,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'warningTypeName',
            },
            {
              title: '报警时间',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'warningTime',
            },
            {
              title: '修改时间',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'updateTime',
            },
            {
              title: '备注',
              width: 140,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'remark',
            },
            {
              title: '操作',
              width: 240,
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" block onClick={() => handleContinue(false, _)}>
                    修改
                  </Button>
                  <Button type="link" block onClick={() => handleContinue(false, _)}>
                    删除
                  </Button>
                </Space>
              ),
            },
          ] as ColumnsType<DataType>,
          data: tableData,
        }}
        request={requestFn}
      />
      <Modal.Dialog
        showDialog={props.showDialog}
        changeDialog={(val: boolean) => props.stateChange(val)}
        size={'big'}
      >
        <ElectronAdd onFinish={(val: boolean) => props.stateChange(val)} />
      </Modal.Dialog>
    </>
  );
};

export default App;
