import storetify from 'storetify';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  const token = storetify('tokenKey');
  return fetch('/api/currentUser', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}
