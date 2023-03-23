const getBearerToken = (accessToken) =>
  accessToken ? `Bearer ${accessToken}` : '';

export const http = async (url, token, method, body) => {
  let formattedBody = null;
  if (body && method !== 'GET') {
    formattedBody = typeof body === 'string' ? body : JSON.stringify(body);
  }
  try {
    const response = await fetch(url, {
      method,
      headers: {
        authorization: getBearerToken(token),
        'Content-Type': 'application/json',
      },
      body: formattedBody,
    });
    if (response) return response.json();
    return {};
  } catch (e) {
    return e;
  }
};

export const httpGet = async (url, token) => {
  const res = await http(url, token, 'GET');
  return res || {};
};

export const httpPost = async (url, token, body) => {
  const formattedBody = typeof body === 'string' ? body : JSON.stringify(body);
  const res = await http(url, token, 'POST', formattedBody);
  return res || {};
};

export const httpPut = async (url, token, body) => {
  const formattedBody = typeof body === 'string' ? body : JSON.stringify(body);
  const res = await http(url, token, 'PUT', formattedBody);
  return res || {};
};

export const httpDelete = async (url, token, body) => {
  const formattedBody = typeof body === 'string' ? body : JSON.stringify(body);
  const res = await http(url, token, 'DELETE', formattedBody);
  return res || {};
};
