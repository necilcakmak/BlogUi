import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ArticleService } from "../../../services/ArticleService";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { t } = useTranslation();
  const articleService = new ArticleService();
  useEffect(() => {
    const articles = async () => {
      const response = await articleService.getArticleList();
      if (response.success) {
        setArticles(response.data);
      } else {
        toast.error(response.message);
      }
    };
    articles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container p-3">
      <h5 className="float-left p-2">Article List</h5>

      {articles?.map((a) => (
        <div className="card" key={a.id}>
          <div className="card-body">
            <h5 className="card-title">{a.title}</h5>
            <p className="card-text">{a.content}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {t("Author")}:{a.user.userName}
            </li>
            <li className="list-group-item">
              {t("Category")}:{a.category.name}
            </li>
          </ul>
          <div className="card-body">
            <Link className="btn btn-success" to={"/article/" + a.id}>
              {t("Detail")}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
