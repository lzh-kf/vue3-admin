/* eslint-disable */

import axios from 'axios';
import { setSession } from "@/utils/cache";
import { ElMessage } from "element-plus";
import { refreshToken } from '@/apis/login/index'

axios.defaults.baseURL = process.env.VUE_APP_API;

let token: string

const handleError = (message: string, data: any): Promise<never> => {
  ElMessage({
    message,
    type: "error"
  });
  return Promise.reject(data)
}

axios.interceptors.request.use((config) => {
  if (token) {
    config.headers.common["Authorization"] = token
  } else {
    token = setSession.token as string
    config.headers.common["Authorization"] = token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
  if (response.data.err_code === 0) {
    return response.data;
  } else if (response.data.err_code === 1001) {
    // token过期
    const responseData: any = await refreshToken({ userAccount: setSession.user.userAccount });
    response.config.headers.Authorization = setSession.token = token = responseData.data.token;
    const refreshResponse: any = await axios(response.config);
    if (refreshResponse.err_code === 0) {
      return refreshResponse;
    } else {
      return handleError(refreshResponse.error.message, refreshResponse)
    }
  } else {
    return handleError(response.data.error.message, response.data)
  }
}, (error) => {
  return Promise.reject(error);
});

export default axios