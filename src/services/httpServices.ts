import axiosClient from "./axios";
import { Result } from "interfaces/result";
import { toast } from "react-toastify";

const client = axiosClient();
export const get = async <R>(url: string) => {
  await client
    .get<Result<R>>(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("catch error");
    });
};

export const post = async <R>(url: string, data: any): Promise<Result<R>> => {
  var res = await client.post<Result<R>>(url, data);
  if (res.data.success === false) {
    toast.error(res.data.message);
  }
  return res.data;
};
