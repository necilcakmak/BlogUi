import { axiosInstance } from "../tools/axiosInstance";

export async function get(url) {
  return await axiosInstance.get(url);
}

export async function post(url, data) {
  return await axiosInstance.post(url, data);
}

export async function remove(url) {
  return await axiosInstance.delete(url);
}

export async function update(url, data) {
  return await axiosInstance.put(url, data);
}
