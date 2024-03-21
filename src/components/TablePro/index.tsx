import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  Pagination,
  Space,
  Table,
  TableProps,
  Tooltip,
} from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import AdvancedSearchForm from './components/AdvancedSearchForm';

interface TableProProps<T> extends TableProps<T> {
  request: (params: any, options?: { [key: string]: any }) => Promise<any>;
  toolbarRender?: () => React.ReactNode;
}

export interface TableProRef {
  reload: () => void;
}

const TableProFunction: React.ForwardRefRenderFunction<
  TableProRef,
  TableProProps<any>
> = (props, ref) => {
  const { columns, request, toolbarRender = () => null, ...rest } = props;
  const [loading, setLogging] = useState(false);
  const [listData, setListData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  // 高级搜索
  const [showSearch, setShowSearch] = useState(true);

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
        current: undefined,
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

  // 高级搜索
  const handleAdvancedQuery = (values: Record<string, any>) => {
    const newParams = { ...paramsRef.current, current: 1, ...values };
    paramsRef.current = newParams;
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
      {showSearch && !!columns && (
        <AdvancedSearchForm
          searchFields={columns.filter(
            (item: any) => item.advancedSearch !== undefined,
          )}
          onSearchFinish={handleAdvancedQuery}
        ></AdvancedSearchForm>
      )}
      <Flex justify="space-between" align="center">
        <Space style={{ marginBottom: 16 }}>{toolbar}</Space>
        <Space>
          <Tooltip title={showSearch ? '隐藏搜索' : '显示搜索'}>
            <Button
              shape="circle"
              icon={<SearchOutlined />}
              onClick={() => setShowSearch(!showSearch)}
            />
          </Tooltip>
          <Tooltip title="刷新">
            <Button
              shape="circle"
              onClick={() => reload()}
              icon={<ReloadOutlined />}
            />
          </Tooltip>
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
TablePro.displayName = 'TablePro';
export default TablePro;
