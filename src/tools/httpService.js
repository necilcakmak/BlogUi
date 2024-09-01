import axios, { AxiosError, HttpStatusCode } from "axios";
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
    if (err.code == AxiosError.ERR_NETWORK) {
      toast.error("Sunucuya ulaşılamadı");
    }

    return Promise.reject(err);
  }
);
//#endregion
