import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import store from "@/store"
import { message } from '@/antd';
interface HttpParams {
  [x: string]: any;
}

// axios实例
const instance = axios.create({
  baseURL: process.env.HX_HTTP_SERVER,
  timeout: 50000
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if (config.headers.token === null || config.headers.token === undefined || config.headers.token === '') {
    //   config.headers.token = `${localStorage.getItem('token')}`
    //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // } else if (config.headers.token === 'token_not_required') {
    //   delete config.headers.token
    // }
    // return config
  },
  (error: any) => {
    console.error(error);
    Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.status === 200) {
      return res.data;
    } else {
      // if (res.data.code === 401 || res.data.status === 401) {
      //   message({
      //     message: '登录过期，请重新登录',
      //     type: 'error',
      //     duration: 5 * 1000,
      //   })
      //   // store.dispatch('LogOut')
      // } else {
      //   message({
      //     message: res.data.message,
      //     type: 'error',
      //     duration: 5 * 1000,
      //   })
      // }
    }
  },
  (error: any) => {
    // message({
    //   message: error.response.data.message ? error.response.data.message : error.message,
    //   type: 'error',
    //   duration: 5 * 1000,
    // })
    // console.error(error)
    // Promise.reject(error)
  }
);

export function post(url: string, params?: HttpParams, config?: AxiosRequestConfig) {
  return instance.post(url, params, config);
}

export function get(url: string, params?: HttpParams) {
  return instance.get(url, {
    params: params
  });
}
