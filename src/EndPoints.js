const endPoints = {
  //article
  GET_ARTICLES: "article/getlist",
  GET_ARTICLE: "article/get/",
  DELETE_ARTICLE: "article/delete/",
  DELETE_ARTICLES: "article/deleteList",
  ADD_ARTICLE: "article/add",
  //categories
  GET_CATEGORİES:"category/getlist",
  //user
  DELETE_USER: "user/delete/",
  DELETE_USERS: "user/deleteList",
  GET_USERS: "user/getlist",
  UPDATE_PROFİLE: "user/UpdateMyInformation",
  GET_MYINFORMATİON: "user/getmyinformation",
  //comments
  GET_COMMENTS:"comment/getlist",
  
  LOGIN_URL: "auth/login",
  REGISTER_URL: "auth/register",
};

export default endPoints;
