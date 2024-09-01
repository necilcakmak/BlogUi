import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import endPoints from "../../EndPoints";
import { httpService } from "tools/httpService";

const AdminHome = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState({});
  const [articles, setArticles] = useState({});
  const [comments, setComments] = useState({});
  useEffect(() => {
    getUsers();
    getArticles();
    getComments();
  }, []);
  const getArticles = async () => {
    const response = await httpService.get(endPoints.GET_ARTICLES);
    if (response.success) {
      setArticles(response.data);
    }
  };
  const getComments = async () => {
    const response = await httpService.get(endPoints.GET_COMMENTS);
    if (response.success) {
      setComments(response.data);
    }
  };
  const getUsers = async () => {
    const response = await httpService.get(endPoints.GET_USERS);
    if (response.success) {
      setUsers(response.data);
    }
  };
  return (
    <div className="grid">
      <div className="col-4 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Articles</span>
              <div className="text-900 font-medium text-xl">
                {articles.lenght}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-shopping-cart text-blue-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">24 new </span>
          <span className="text-500">since last visit</span>
        </div>
      </div>

      <div className="col-4 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Users</span>
              <div className="text-900 font-medium text-xl">{users.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-inbox text-cyan-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">520 </span>
          <span className="text-500">newly registered</span>
        </div>
      </div>
      <div className="col-4 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Comments</span>
              <div className="text-900 font-medium text-xl">
                {comments.lenght}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-comment text-purple-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">85 </span>
          <span className="text-500">responded</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
