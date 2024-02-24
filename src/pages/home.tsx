import endPoints from "EndPoints";
import { ArticleDto } from "interfaces/article/article";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "services/apiService";

const Home = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<ArticleDto[]>([]);

  useEffect(() => {
    getArticles();
  }, []);
  const getArticles = async () => {
    var response = await ApiService.get<ArticleDto[]>(endPoints.GET_ARTICLES);
    if (response.success) {
      setArticles(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const columns = [
    {
      name: "title",
      selector: (row: ArticleDto) => row.title,
    },
    {
      name: "content",
      selector: (row: ArticleDto) => row.content,
      sortable: true,
    },
  ];
  return (
    <div className="container p-3">
      <div className="row">
        <h3>Home Page</h3>
        <DataTable columns={columns} data={articles} pagination />
      </div>
      <div className="row"></div>
      <Link className="btn btn-success" to="/login">
        {t("Login")}
      </Link>
    </div>
  );
};

export default Home;
