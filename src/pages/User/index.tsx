import { PageContainer, TablePro } from '@/components';
import { TableProRef } from '@/components/TablePro';
import {
  addUser,
  deleteUser,
  getUser,
  listUser,
  updateUser,
} from '@/services/user';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  TableProps,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import styles from './index.less';

interface DataType {
  createBy: string;
  createTime: string;
  updateBy?: string;
  updateTime?: string;
  remark: string;
  userId: number;
  userName: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  sex: string;
  status: string;
  delFlag: string;
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

const UserPage = () => {
  // 弹窗
  const [title, setTitle] = useState('弹出层标题');
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const tableProRef = useRef<TableProRef>(null);

  const handleTableReload = () => {
    tableProRef.current?.reload();
  };

  // 重置弹出层表单
  const reset = () => {
    form.resetFields();
    setConfirmLoading(false);
  };

  const handleAdd = async () => {
    setTitle('添加用户');
    setVisible(true);
  };

  const handleDelete = async (record: DataType) => {
    Modal.confirm({
      title: `系统提示`,
      icon: <ExclamationCircleOutlined />,
      content: `是否确认删除用户编号为"${record.userId}"的数据项？`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return deleteUser(record.userId)
          .then(() => {
            handleTableReload();
            message.success(`删除成功`);
          })
          .catch(() => {});
      },
    });
  };

  const handleUpdate = async (record: DataType) => {
    reset();
    const userId = record.userId;
    try {
      const msg = await getUser(userId);
      setVisible(true);
      setTitle(`修改用户`);
      form.setFieldsValue({
        ...msg.data,
      });
    } catch (error) {}
  };

  const submitForm = async () => {
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
      handleTableReload();
    } catch (errorInfo) {
      message.error('数据验证失败不能提交');
    } finally {
      setConfirmLoading(false);
    }
  };

  // 对话取消按钮
  const handleCancel = () => {
    setVisible(false);
    reset();
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '用户编号',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '手机号码',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: (time: string) => {
        return dayjs(time).format('YYYY MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
          <Space size={0}>
            <Button type="link" onClick={() => handleUpdate(record)}>
              修改
            </Button>
            <Button danger type="link" onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer overlayClassName={styles.page}>
      <TablePro
        rowKey={'userId'}
        toolbarRender={() => (
          <>
            <Button type="primary" onClick={handleAdd}>
              新增用户
            </Button>
          </>
        )}
        ref={tableProRef}
        columns={columns}
        request={listUser}
      />
      {/* 用户新增修改弹出层 */}
      <Modal
        width={820}
        title={title}
        open={visible}
        onOk={submitForm}
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
                        return Promise.reject(
                          new Error('请输入正确的手机号码'),
                        );
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
            <Col span={24}>
              <Form.Item name="remark" label="备注" {...formItemFullLayout}>
                <Input.TextArea placeholder="请输入内容"></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </PageContainer>
  );
};
export default UserPage;
