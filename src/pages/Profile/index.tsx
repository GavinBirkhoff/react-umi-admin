import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';
import styles from './index.less';

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };

const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };

export default function ProfilePage() {
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  const userInfo = initialState?.currentUser.user;
  return (
    <div>
      <h1 className={styles.title}>基本信息:</h1>
      <Form
        {...formItemLayout}
        layout={'horizontal'}
        form={form}
        initialValues={{ nickName: userInfo.name }}
        // onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600 }}
        disabled={true}
      >
        <Form.Item name="nickName" label="昵称">
          <Input />
        </Form.Item>
        <Form.Item label="原密码">
          <Input />
        </Form.Item>
        <Form.Item label="新密码">
          <Input />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">保存修改</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
