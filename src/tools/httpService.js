import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
export const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});
//#region request interceptor
httpService.interceptors.request.use(async (request) => {
  const isApiUrl = request.baseURL.startsWith(process.env.REACT_APP_API_URL);
  if (isApiUrl) {
    request.headers.Authorization = localStorage.getItem("token") ?? "";
  }
  return request;
});
//#endregion

//#region response interceptor
httpService.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response?.status === HttpStatusCode.Unauthorized) {
      localStorage.removeItem("token");
      toast.error(err.response.data.message);
    }
    if (err.response?.data?.success === false) {
      return err.response.data;
    }

    toast.error(err.message);
    return Promise.reject(err);
  }
);
//#endregion
