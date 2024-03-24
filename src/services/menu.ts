import { request } from 'umi';

export async function getMenus(options?: { [key: string]: any }) {
  return request('/menu/list', {
    method: 'GET',
    ...(options || {}),
  });
}
