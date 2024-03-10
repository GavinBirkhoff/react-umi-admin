import { login } from '@/services/login';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import storetify from 'storetify';
import { FormattedMessage, useModel, useNavigate } from 'umi';
import styles from './index.less';

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
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <FormattedMessage id={'pages.login.rememberMe'} />
            </Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {isLogging ? (
              <FormattedMessage id={'pages.login.logging'} />
            ) : (
              <FormattedMessage id={'pages.login.login'} />
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
