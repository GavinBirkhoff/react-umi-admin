import { ReloadOutlined } from '@ant-design/icons';
import { Button, Flex, Pagination, Space, Table, TableProps } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface TableProProps extends TableProps<any> {
  request: (params: any, options?: { [key: string]: any }) => Promise<any>;
  toolbarRender?: () => React.ReactNode;
}

export interface TableProRef {
  reload: () => void;
}

const TableProFunction: React.ForwardRefRenderFunction<
  TableProRef,
  TableProProps
> = (props, ref) => {
  const { columns, request, toolbarRender = () => null, ...rest } = props;
  const [loading, setLogging] = useState(false);
  const [listData, setListData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const paramsRef = useRef<any>({
    current: 1,
    pageSize: 10,
  });

  const handleList = async () => {
    try {
      setLogging(true);
      const { data } = await request({
        ...paramsRef.current,
        pageNum: paramsRef.current.current,
      });

      setListData([...data.rows]);
      setTotal(data.total);
    } catch (error: any) {
      console.log(error.info);
      setListData([]);
    } finally {
      setLogging(false);
    }
  };

  const reload = () => {
    handleList();
  };

  useImperativeHandle(
    ref,
    () => ({
      reload,
    }),
    [],
  );

  useEffect(() => {
    handleList();
  }, []);

  const toolbar = toolbarRender();
  return (
    <div>
      <Flex justify="space-between" align="center">
        <Space style={{ marginBottom: 16 }}>{toolbar}</Space>
        <Space>
          <Button
            type="dashed"
            onClick={() => reload()}
            icon={<ReloadOutlined />}
          >
            刷新
          </Button>
        </Space>
      </Flex>
      <Table
        columns={columns}
        dataSource={listData}
        loading={loading}
        pagination={false}
        {...rest}
      />
      {total > 0 && total > paramsRef.current.pageSize && (
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          defaultCurrent={paramsRef.current.current}
          defaultPageSize={paramsRef.current.pageSize}
          showTotal={(total) => `共 ${total} 条`}
          onChange={(page, pageSize) => {
            paramsRef.current.current = page;
            paramsRef.current.pageSize = pageSize;
            handleList();
          }}
          style={{ textAlign: 'right', marginTop: '10px' }}
        />
      )}
    </div>
  );
};

const TablePro = forwardRef(TableProFunction);

export default TablePro;
