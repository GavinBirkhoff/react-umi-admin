import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { sleep } from 'ts-copilot';

const resultData = new Map();
let index = 39;
for (let i = 1; i <= index; i++) {
  resultData.set(i, {
    createBy: 'admin',
    createTime: new Date().getTime(),
    updateBy: null,
    updateTime: null,
    remark: '管理员',
    userId: i,
    userName: 'admin' + i,
    nickName: 'Gavin' + i,
    email: 'admin@gmail.com',
    phoneNumber: '1588888888' + (i % 10),
    sex: '1',
    status: i % 2 === 0 ? '0' : '1',
    delFlag: '0',
  });
}
export default {
  'GET /api/user/list': async (req: Request, res: Response) => {
    const { pageNum, pageSize, userName, phoneNumber, dateRange, status } =
      req.query;
    await sleep(500);
    if (false) {
      res.json({
        success: false,
        code: 500,
        message: '用户列表操作失败',
        data: null,
        showType: 1,
      });
      return;
    }
    const rows = [...resultData.values()].filter((item) => {
      let flag = true;
      if (userName) {
        flag = item.userName.includes(userName as string);
      }
      if (phoneNumber) {
        flag = item.phoneNumber.includes(phoneNumber as string);
      }
      if (status) {
        flag = item.status === status;
      }
      if (dateRange) {
        const [start, end] = (dateRange as string).split('_to_');
        // 将字符串形式的日期转换为 Day.js 对象
        const startDate = dayjs(start);
        const endDate = dayjs(end);

        // 判断 item.createTime 是否在范围内
        flag =
          dayjs(dayjs(item.createTime).format('YYYY MM-DD')).isSame(
            startDate,
          ) ||
          dayjs(dayjs(item.createTime).format('YYYY MM-DD')).isSame(endDate) ||
          (dayjs(dayjs(item.createTime).format('YYYY MM-DD')).isAfter(
            startDate,
          ) &&
            dayjs(dayjs(item.createTime).format('YYYY MM-DD')).isBefore(
              endDate,
            ));
      }
      return flag;
    });

    res.json({
      success: true,
      code: 200,
      message: '操作成功',
      data: {
        rows: rows.slice(
          (parseInt(pageNum as string) - 1) * parseInt(pageSize as string),
          (parseInt(pageNum as string) - 1) * parseInt(pageSize as string) +
            parseInt(pageSize as string),
        ),
        total: rows.length,
      },
    });
  },
  'DELETE /api/user/:id': async (req: Request, res: Response) => {
    const { id } = req.params;
    resultData.delete(parseInt(id));
    res.json({
      success: true,
      code: 200,
      message: '操作成功',
    });
  },
  'POST /api/user': async (req: Request, res: Response) => {
    const { ...rest } = req.body;
    const userId = ++index;
    resultData.set(userId, {
      createTime: new Date(),
      userId,
      ...rest,
    });
    res.json({
      success: true,
      code: 200,
      message: '操作成功',
    });
  },
  'PUT /api/user': async (req: Request, res: Response) => {
    const { userId, ...rest } = req.body;
    const oldUser = resultData.get(parseInt(userId));
    resultData.set(userId, {
      ...oldUser,
      ...rest,
      updateTime: new Date(),
      userId,
    });
    await sleep(1000);
    res.json({
      success: true,
      code: 200,
      message: '操作成功',
    });
  },
  'GET /api/user/:id': async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const user = resultData.get(parseInt(userId));
    res.json({
      success: true,
      code: 200,
      message: '操作成功',
      data: user,
    });
  },
};
