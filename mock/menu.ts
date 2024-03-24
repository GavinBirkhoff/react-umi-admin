import { Request, Response } from 'express';
import { sleep } from 'ts-copilot';
export default {
  'GET /api/menu/list': async (_req: Request, res: Response) => {
    await sleep(800);
    res.json({
      success: true,
      code: 200,
      message: '菜单获取成功',
      data: [
        { key: 'user', icon: 'UserOutlined', label: 'menu.users' },
        { key: 'docs', icon: 'VideoCameraOutlined', label: 'menu.documents' },
      ],
    });
  },
};
