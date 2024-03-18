import { Space, Table, TableProps } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface TableProProps extends TableProps<any> {
  request: () => Promise<any>;
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

  const handleList = async () => {
    try {
      setLogging(true);
      const { data } = await request();
      setListData([...data.rows]);
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
      <Space style={{ marginBottom: 16 }}>{toolbar}</Space>
      <Table
        columns={columns}
        dataSource={listData}
        loading={loading}
        {...rest}
      />
    </div>
  );
};

const TablePro = forwardRef(TableProFunction);

export default TablePro;
