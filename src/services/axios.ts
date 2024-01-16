import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { Result } from "interfaces/result";

const axiosClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("token") ?? "";
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = { token };
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse<Result<any>>) => {
      return response;
    },
    (err: AxiosError) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        return err.response;
      }
      else if (err.response?.status === 0) {
        err.response.data = { message: err.message, success: false };
        return err.response;
      }else{
        return err.response;
      }
    }
  );

  return client;
};

export default axiosClient;
