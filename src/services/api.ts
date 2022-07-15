import request from '@/utils/request';

export const query = (url: string, params: any): Promise<any> =>
  request(url, {
    method: 'GET',
    params,
  });

export const queryPost = (url: string, data: any): Promise<any> =>
  request(url, {
    method: 'POST',
    data,
  });

export const queryAsyncPost = (url: string): Promise<any> =>
  request(url, {
    method: 'POST',
  });

export const queryAsync = (url: string): Promise<any> =>
  request(url, {
    method: 'GET',
  });
