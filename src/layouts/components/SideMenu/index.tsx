import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { history } from 'umi';
import LogPanel from '../LogPanel';
import styles from './index.less';

const { Sider } = Layout;

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    history.push('/' + e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <LogPanel/>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        // defaultSelectedKeys={['1']}
        items={[
          {
            key: 'user',
            icon: <UserOutlined />,
            label: '用户管理',
          },
          {
            key: 'docs',
            icon: <VideoCameraOutlined />,
            label: '文档中心',
          },
        ]}
      />
    </Sider>
  );
};

export default SideMenu;
