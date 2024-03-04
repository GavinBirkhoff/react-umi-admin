import storetify from 'storetify';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  const token = storetify(TOKEN_KEY);
  return fetch('/api/currentUser', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function listUser() {
  return fetch('/api/user/list', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${storetify(TOKEN_KEY)}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function deleteUser(userId: number) {
  return fetch(`/api/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${storetify(TOKEN_KEY)}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function addUser(values: any) {
  return fetch('/api/user', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${storetify(TOKEN_KEY)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((response) => {
    return response.json();
  });
}

export function updateUser(values: any) {
  return fetch('/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${storetify(TOKEN_KEY)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((response) => {
    return response.json();
  });
}

export function getUser(userId: number) {
  return fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${storetify(TOKEN_KEY)}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}
