import { login } from '@/services/login';
import {
  AlipayCircleFilled,
  GithubFilled,
  LockOutlined,
  UserOutlined,
  WechatFilled,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import storetify from 'storetify';
import { FormattedMessage, useModel, useNavigate } from 'umi';
import LoginBg from './components/LoginBg';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 20 },
  },
};

const LoginPage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isLogging, setLogging] = useState(false);

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo);
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: any) => {
    setLogging(true);
    try {
      const res = await login({ ...values });
      storetify(TOKEN_KEY, res.data.accessToken);
      await fetchUserInfo();
      message.success(res.message);
      navigate('/');
    } catch (error) {
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className={styles.page}>
      <LoginBg>
        <div className={styles.content}>
          <div className={styles.title}>欢迎开启新世界</div>
          <Form
            {...formItemLayout}
            name="login"
            size="large"
            initialValues={{ remember: true }}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            <Form.Item
              name="username"
              label={<span>用户名</span>}
              colon={false}
              rules={[
                { required: true, message: '请您输入手机号/用户名/邮箱' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="手机号/用户名/邮箱"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="密　码"
              colon={false}
              rules={[{ required: true, message: '请您输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: '5px' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  <FormattedMessage id={'pages.login.rememberMe'} />
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>
                {isLogging ? (
                  <FormattedMessage id={'pages.login.logging'} />
                ) : (
                  <FormattedMessage id={'pages.login.login'} />
                )}
              </Button>
            </Form.Item>
          </Form>
          <Space size={20} style={{ fontSize: '28px', color: '#888' }}>
            <span style={{ fontSize: '14px' }}>第三方账号登录</span>
            <GithubFilled />
            <AlipayCircleFilled />
            <WechatFilled />
          </Space>
        </div>
      </LoginBg>
    </div>
  );
};

export default LoginPage;
