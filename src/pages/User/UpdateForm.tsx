import { addUser, updateUser } from '@/services/user';
import {
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Radio,
  Row,
  message,
} from 'antd';
import React, { useImperativeHandle, useState } from 'react';

interface UpdateFormProps {
  onCancel?: () => void;
  onOk?: () => void;
}

export interface UpdateFormRef {
  show: (title: string, data?: Record<string, any>) => void;
  hide: () => void;
  form: FormInstance;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const formItemFullLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

const UpdateFormFunction: React.ForwardRefRenderFunction<
  UpdateFormRef,
  UpdateFormProps
> = ({ onOk, onCancel }, ref) => {
  const [title, setTitle] = useState('未设置弹出层标题');
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // 重置弹出层表单
  const reset = () => {
    form.resetFields();
    setConfirmLoading(false);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      if (form.getFieldValue('userId') === undefined) {
        await addUser(values);
        message.success('新增成功');
      } else {
        await updateUser(values);
        message.success('修改成功');
      }
      setVisible(false);
      onOk?.();
      reset();
    } catch (errorInfo) {
      message.error('数据验证失败不能提交');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setVisible(false);
    reset();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        show: (title, data) => {
          setTitle(title);
          setVisible(true);
          reset();
          if (data) {
            form.setFieldsValue(data);
          }
        },
        hide: () => {
          setVisible(false);
          reset();
        },
        form,
      };
    },
    [],
  );

  return (
    <Modal
      destroyOnClose
      forceRender
      width={820}
      title={title}
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{ status: '0', postIds: [], roleIds: [] }}
      >
        <Form.Item name="userId" label="用户Id" hidden>
          <Input />
        </Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="nickName"
              label="用户昵称"
              rules={[{ required: true, message: '用户昵称不能为空' }]}
            >
              <Input placeholder="请输入用户昵称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="手机号码"
              rules={[
                {
                  validator: (_, phone) => {
                    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                    if (!phone || reg.test(phone)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error('请输入正确的手机号码'));
                    }
                  },
                },
              ]}
            >
              <Input placeholder="请输入手机号码" maxLength={11} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="邮箱" rules={[{ type: 'email' }]}>
              <Input placeholder="请输入邮箱" maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={form.getFieldValue('userId') !== undefined ? 0 : 12}>
            <Form.Item
              hidden={form.getFieldValue('userId') !== undefined}
              name="userName"
              label="用户名称"
              rules={[
                { required: true, message: '用户名称不能为空' },
                {
                  min: 2,
                  max: 20,
                  message: '用户名称长度必须介于 2 和 20 之间',
                },
              ]}
            >
              <Input placeholder="请输用户名称" maxLength={30} />
            </Form.Item>
          </Col>
          {form.getFieldValue('userId') === undefined && (
            <Col span={12}>
              <Form.Item
                name="password"
                label="用户密码"
                rules={[
                  { required: true, message: '用户密码不能为空' },
                  {
                    min: 5,
                    max: 20,
                    message: '用户密码长度必须介于 5 和 20 之间',
                  },
                ]}
              >
                <Input.Password placeholder="请输用户密码" maxLength={20} />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item name="status" label="用户状态">
              <Radio.Group>
                <Radio value={'0'} key={'normal'}>
                  正常
                </Radio>
                <Radio value={'1'} key={'blockUp'}>
                  停用
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="remark" label="备注" {...formItemFullLayout}>
              <Input.TextArea placeholder="请输入内容"></Input.TextArea>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const UpdateForm = React.forwardRef<UpdateFormRef, UpdateFormProps>(
  UpdateFormFunction,
);

UpdateForm.displayName = 'UpdateForm';

export default UpdateForm;
