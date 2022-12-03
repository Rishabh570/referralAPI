import axios, { AxiosRequestConfig, Method } from 'axios';

export const performHTTPRequest = (reqData: {
  method: Method;
  url: string;
  config?: AxiosRequestConfig;
  data?: object;
  headers?: object;
}) => {
  const { method, url, config, data, headers } = reqData;

  let reqConfig: AxiosRequestConfig = {
    method,
    url,
    headers,
  };

  if (config) {
    reqConfig = { ...reqConfig, ...config };
  }

  if (['POST', 'PUT'].includes(method) && data !== null) {
    reqConfig.data = data;
  }

  return axios(reqConfig);
};
