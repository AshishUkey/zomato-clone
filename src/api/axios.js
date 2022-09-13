import axios from 'axios';
import {
  reqFulfil,
  reqError,
  resFulfil,
  resError
} from "./interceptors"
import config from "./config";

const axiosInstance = axios.create({
  baseURL:'http://localhost:9191',
  timeout:1000,
  ...config
});

axiosInstance.interceptors.request.use(reqFulfil,reqError);
axiosInstance.interceptors.response.use(resFulfil,resError);

export  {axiosInstance} ;