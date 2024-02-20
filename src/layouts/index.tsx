import { logout } from '@/services/login';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  message,
  theme,
} from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import storetify from 'storetify';
import { Outlet, history, useModel } from 'umi';
import SideMenu from './components/SideMenu';
import styles from './index.less';

const { Header, Sider, Content } = Layout;

export default function BaseLayout(props: any) {
  console.log(props, 'layout props');
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(initialState, 'initialState');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    const msg = await logout();
    if (msg.success) {
      message.success(msg.message);
      storetify.remove(TOKEN_KEY);
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: undefined,
        }));
      });
      history.push('/login');
    } else {
      message.error(msg.message);
    }
  };

  const handleDropdownMenuClick: MenuProps['onClick'] = async ({ key }) => {
    switch (key) {
      case 'logout':
        handleLogout();
        break;
      default:
        history.push('/' + key);
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      label: '个人中心',
      key: 'profile',
    },
    {
      label: '退出登录',
      key: 'login',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
        components: {
          Button: {
            colorPrimary: '#00b96b',
          },
        },
        algorithm: true ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout>
        <SideMenu collapsed={collapsed} />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className={styles.header}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <div className={styles.right}>
                <Space size={16} wrap>
                  <Dropdown
                    menu={{ items, onClick: handleDropdownMenuClick }}
                  >
                    <div className={styles.action}>
                      <Avatar
                        src={
                          <img
                            src={initialState?.currentUser.user.avatar}
                            alt="avatar"
                          />
                        }
                      />
                      <span style={{ marginLeft: 8 }}>{initialState?.currentUser.user.name}</span>
                    </div>
                  </Dropdown>
                </Space>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
