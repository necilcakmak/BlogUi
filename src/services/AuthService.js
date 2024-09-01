import endPoints from "../EndPoints";
import { httpService } from "../tools/httpService";

export class AuthService {
  async login(data) {
    return await httpService.post(endPoints.LOGIN_URL, data);
  }
  async register(data) {
    return await httpService.post(endPoints.REGISTER_URL, data);
  }
}
