import endPoints from "../EndPoints";
import { httpService } from "../tools/httpService";

export class ArticleService {
  async getArticleList() {
    return await httpService.get(endPoints.GET_ARTICLES);
  }
  async deleteArticleById(id) {
    return await httpService.delete(endPoints.DELETE_ARTICLE + id);
  }
  async deleteArticlesByIdList(idList) {
    return await httpService.post(endPoints.DELETE_ARTICLES, idList);
  }
  async getArticleById(id) {
    return await httpService.get(endPoints.GET_ARTICLE + id);
  }
}
