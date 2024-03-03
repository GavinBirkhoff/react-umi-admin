import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { FormattedMessage, history } from 'umi';
import LogPanel from '../LogPanel';

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
      <LogPanel />
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        // defaultSelectedKeys={['1']}
        items={[
          {
            key: 'user',
            icon: <UserOutlined />,
            label: <FormattedMessage id="menu.users" />,
          },
          {
            key: 'docs',
            icon: <VideoCameraOutlined />,
            label: <FormattedMessage id="menu.documents" />,
          },
        ]}
      />
    </Sider>
  );
};

export default SideMenu;
