import { Request, Response } from 'express';
import { sleep } from 'ts-copilot';


export default {
  'POST /api/login': async (req: Request, res: Response) => {
    const { password, username } = req.body;
    await sleep(2000);
    if (password === '123456' && username === 'admin') {
      res.send({
        status: 'ok',
        token: 'admin',
      });
      return;
    }
    if (password === '123456' && username === 'user') {
      res.send({
        status: 'ok',
        token: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      token: 'guest',
    });
  },
  'GET /api/currentUser': async (req: Request, res: Response) => {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // 假设 token 是以 Bearer 认证方式传递的
      if (token === 'admin') {
        res.send({
          success: true,
          data: {
            name: 'Gavin',
            avatar:
              'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            userid: '00000001',
            email: 'gavinbirkhoff@gmail.com',
          },
        });
      } else {
        res.status(401).send('Unauthorized');
      }
    } else {
      // 如果 Authorization 头部不存在，可能需要返回 401 Unauthorized 错误
      res.status(401).send('Unauthorized');
    }
  },
};
