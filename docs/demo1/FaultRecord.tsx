import { Layout, Space, Badge, Button, message, Descriptions, Modal } from '../../src/.';
import type { ColumnsType, TableProps } from 'antd/es/table';
// import type { queryTaskInfoListParams, machineryStatusParams } from '@/api';
// import { getMachineWaringDetail } from '@/services/api/device';
import ThresholdAdd from './ThresholdAdd';
import { useEffect, useState } from 'react';
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
      curPage: page.current,
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
    // } = await getMachineWaringDetail(params);
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
              fixed: 'left',
              align: 'left',
              render: (text, record, index) => {
                return index + 1;
              },
            },
            {
              title: '农机型号',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'machineModel',
            },
            {
              title: '农机类型',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'machineCategoryName',
            },
            // {
            //   title: '所属单位',
            //   width: 120,
            //   textWrap: 'word-break',
            //   align: 'left',
            //   dataIndex: '111111',
            // },
            {
              title: '农机数量（台）',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'machineNumb',
            },
            {
              title: '设置工况类型',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'operatingConditionType',
            },
            {
              title: '可设置工况阈值',
              width: 140,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'threshold',
            },
            {
              title: '当前设置阈值数',
              textWrap: 'word-break',
              width: 150,
              align: 'left',
              dataIndex: 'realNumb',
            },
            {
              title: '修改时间',
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
        size={'middle'}
      >
        <ThresholdAdd
          onFinish={(val: boolean) => props.stateChange(val)}
          type={'add'}
          title={'新增阈值报警'}
        />
      </Modal.Dialog>
    </>
  );
};

export default App;
