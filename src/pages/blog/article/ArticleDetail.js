import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ArticleService } from "../../../services/ArticleService";

const ArticleDetail = () => {
  let { id } = useParams();
  const articleService = new ArticleService();
  const [article, setArticle] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    const article = async () => {
      const response = await articleService.getArticleById(id);
      if (response.success) {
        setArticle(response.data);
      } else {
        toast.error(response.message);
      }
    };
    article();
  }, []);

  return (
    <div className="container p-3">
      <div className="card" key={article.id}>
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.content}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {t("Author")}:{article.user?.userName}
          </li>
          <li className="list-group-item">
            {t("Category")}:{article.category?.name}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArticleDetail;
