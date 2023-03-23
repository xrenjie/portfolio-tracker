import { getAccessTokenFromCookie } from '../../utils/client_utils';

export const fetchUser = async () => {
  const accessToken = getAccessTokenFromCookie();
  const res = await fetch('/api/users/getUser', {
    headers: {
      authorization: accessToken,
    },
  });
  const resJson = (await res.json())?.data || {};
  return resJson;
};

export const updateUser = async (user) => {
  const accessToken = getAccessTokenFromCookie();
  const res = await fetch('/api/users/updateUser', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: accessToken,
    },
    body: user ? JSON.stringify(user) : null,
  });
  const resJson = (await res.json())?.data || {};
  return resJson;
};
