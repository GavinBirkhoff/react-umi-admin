import { Request, Response } from 'express';
import { sleep } from 'ts-copilot';

export default {
  'POST /api/login': async (req: Request, res: Response) => {
    const { password, username } = req.body;
    await sleep(2000);
    if (password === '123456' && username === 'admin') {
      res.send({
        success: true,
        code: 200,
        message: '登陆成功',
        data: {
          accessToken: 'admin',
          refreshToken: 'admin',
        },
      });
      return;
    }
    if (password === '123456' && username === 'user') {
      res.send({
        success: true,
        code: 200,
        message: '登陆成功',
        data: {
          accessToken: 'user',
          refreshToken: 'user',
        },
      });
      return;
    }

    res.send({
      success: false,
      code: 500,
      message: '用户不存在/密码错误',
    });
  },
  'POST /api/logout': async (req: Request, res: Response) =>{
    res.send({
      success: true,
      code: 200,
      message: '退出成功',
    });
  },
  'GET /api/currentUser': async (req: Request, res: Response) => {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // 假设 token 是以 Bearer 认证方式传递的
      if (token === 'admin') {
        res.send({
          success: true,
          code: 200,
          message: '操作成功',
          data: {
            user: {
              name: 'Gavin',
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              userid: '00000001',
              email: 'gavinbirkhoff@gmail.com',
            },
          },
        });
        return;
      }
    }
    // 如果 Authorization 头部不存在，可能需要返回 401 Unauthorized 错误
    // res.status(401).send('Unauthorized');
    res.send({
      success: false,
      code: 401,
      message: '认证失败，无法访问系统资源',
    });
  },
};
