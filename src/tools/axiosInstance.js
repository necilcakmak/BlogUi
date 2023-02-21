import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
  },
});
//#region request interceptor
axiosInstance.interceptors.request.use(async (request) => {
  const isApiUrl = request.baseURL.startsWith(process.env.REACT_APP_API_URL);
  if (isApiUrl) {
    request.headers.Authorization = `${localStorage.getItem("token")}`;
  }
  return request;
});
//#endregion

//#region response interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response.data?.success === false) {
      return err.response.data;
    }
    toast.error(err.message);
    return Promise.reject(err);
  }
);
//#endregion
