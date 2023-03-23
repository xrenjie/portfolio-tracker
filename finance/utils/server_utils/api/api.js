import { httpGet, httpPost, httpPut, http } from './http';

const BASE_URL = process.env.RESOURCE_API_URL;

export const apiRequest = (path, accessToken, method, body) => {
  console.log(method);
  const url = `${BASE_URL}${path}`;
  return http(url, accessToken, method, body);
};

export const apiGet = (path, accessToken) => {
  const url = `${BASE_URL}${path}`;
  return httpGet(url, accessToken);
};

export const apiPost = (path, accessToken, body) => {
  const url = `${BASE_URL}${path}`;
  return httpPost(url, accessToken, body);
};

export const apiPut = (path, accessToken, body) => {
  const url = `${BASE_URL}${path}`;
  return httpPut(url, accessToken, body);
};
