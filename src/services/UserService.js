import endPoints from "../EndPoints";
import { httpService } from "../tools/httpService";

export class UserService {
  async getUserList() {
    return await httpService.get(endPoints.GET_USERS);
  }
  async deleteUserById(id) {
    return await httpService.delete(endPoints.DELETE_USER + id);
  }
  async deleteUsersByIdList(idList) {
    return await httpService.post(endPoints.DELETE_USERS, idList);
  }
  async getMyInformation() {
    return await httpService.get(endPoints.GET_MYINFORMATİON);
  }
  async updateMyProfile(data) {
    return await httpService.put(endPoints.UPDATE_PROFİLE, data);
  }
}
