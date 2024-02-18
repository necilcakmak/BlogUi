import  { AxiosResponse } from 'axios';
import { Result } from 'interfaces/result';
import axiosClient from './axios';

const client = axiosClient();

class ApiService {
  static async get<T>(url: string): Promise<Result<T>> {
    try {
      const response: AxiosResponse<Result<T>> = await client.get(`${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  }

  static async post<T>(url: string, payload: any): Promise<Result<T>> {
    try {
      const response: AxiosResponse<Result<T>> = await client.post(`${url}`, payload);
      return response.data;
    } catch (error) {
       debugger
      throw new Error(`API request failed: ${error}`);
    }
  }
}

export default ApiService;