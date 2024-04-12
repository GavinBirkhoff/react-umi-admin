import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';
import React from 'react';
import { styled } from 'umi';

interface DataType {
  key: React.Key;
  rank: number;
  keyword: string;
  users: number;
  monthGrowth: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '排名',
    dataIndex: 'rank',
  },
  {
    title: '搜索关键词',
    dataIndex: 'keyword',
    filters: [
      {
        text: '手机',
        value: '手机',
      },
      {
        text: '笔记本电脑',
        value: '笔记本电脑',
      },
      {
        text: '平板电脑',
        value: '平板电脑',
      },
      {
        text: '智能手表',
        value: '智能手表',
      },
      {
        text: '智能家居设备',
        value: '智能家居设备',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.keyword.includes(value as string),
    width: '30%',
  },
  {
    title: '用户数',
    dataIndex: 'users',
  },
  {
    title: '月涨幅',
    dataIndex: 'monthGrowth',
    sorter: (a, b) => a.monthGrowth - b.monthGrowth,
  },
];

const data: DataType[] = [
  {
    key: '1',
    rank: 1,
    keyword: '手机',
    users: 320,
    monthGrowth: 10,
  },
  {
    key: '2',
    rank: 2,
    keyword: '笔记本电脑',
    users: 280,
    monthGrowth: 8,
  },
  {
    key: '3',
    rank: 3,
    keyword: '平板电脑',
    users: 200,
    monthGrowth: 5,
  },
  {
    key: '4',
    rank: 4,
    keyword: '智能手表',
    users: 180,
    monthGrowth: 3,
  },
  {
    key: '5',
    rank: 5,
    keyword: '智能家居设备',
    users: 150,
    monthGrowth: 2,
  },
];

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const TrendWrapper = styled.div`
  height: 357px;
`;

const Trend: React.FC = () => (
  <TrendWrapper>
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={false}
      scroll={{ y: 300 }}
    />
  </TrendWrapper>
);

export default Trend;
