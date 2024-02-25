import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const axiosClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
    withCredentials: false,
  });

  // Axios istek interceptor'ı
  client.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("token");
      if (token) {

        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  // Axios cevap interceptor'ı
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        return error.response;
      } else if (error.response?.status === 0) {
        error.response.data = { message: error.message, success: false };
        return error.response;
      } else {
        return error.response;
      }
    }
  );
  // client.interceptors.request.use((config: any) => {
  //   const token = localStorage.getItem("token") ?? "";
  //   config.headers = config.headers || {};
  //   if (token) {
  //     config.headers.Authorization = { token };
  //   }
  //   return config;
  // });

  // client.interceptors.response.use(
  //   (response: AxiosResponse<Result<any>>) => {
  //     return response;
  //   },
  //   (err: AxiosError) => {
  //     if (err.response?.status === 401) {
  //       localStorage.removeItem("token");
  //       return err.response;
  //     }
  //     else if (err.response?.status === 0) {
  //       err.response.data = { message: err.message, success: false };
  //       return err.response;
  //     }else{
  //       return err.response;
  //     }
  //   }
  // );

  return client;
};

export default axiosClient;
