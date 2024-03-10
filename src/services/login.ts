import { request } from 'umi';

/** 登录接口 POST /login */
export async function login(body: any, options?: { [key: string]: any }) {
  return request('/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /logout */
export async function logout(options?: { [key: string]: any }) {
  return request('/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
