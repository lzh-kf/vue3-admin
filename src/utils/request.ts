import axios from 'axios';
import { setSession } from "@/utils/cache";
import { ElMessage } from "element-plus";

axios.defaults.baseURL = process.env.VUE_APP_API;

let token: string

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

axios.interceptors.response.use((response) => {
  if (response.data.err_code === 0) {
    return response.data;
  } else {
    ElMessage({
      message: response.data.error.message,
      type: "error"
    });
    return Promise.reject(response.data)
  }
}, (error) => {
  return Promise.reject(error);
});

export default axios