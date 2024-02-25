import DataTable, { TableColumn } from "components/datatable";
import { useModal } from "contexts/modalContext";
import { ArticleDto } from "interfaces/article/article";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ApiService from "services/apiService";
import { toast } from "react-toastify";
import endPoints from "EndPoints";

const Articles = () => {
  const { t } = useTranslation();
  const { showModal } = useModal();
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

  const deleteArticle = async (id: any) => {
    var res = await ApiService.delete<ArticleDto[]>(
      endPoints.DELETE_ARTICLE,
      id
    );
    if (res.success) {
      const newData = [...articles];
      const index = newData.indexOf(id);
      newData.splice(index, 1);
      setArticles(newData);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const handleDelete = (index: number) => {
    showModal("Seçili kayıtı silmek istiyor musunuz?", () => {
      var id = articles[index].id;
      deleteArticle(id);
    });
  };
  const columns: TableColumn<ArticleDto>[] = [
    { header: "Başlık", accessor: (row: ArticleDto) => row.title },
    { header: "İçerik", accessor: (row: ArticleDto) => row.content },
    { header: "Kullanıcı", accessor: (row: ArticleDto) => row.user?.firstName },
  ];
  return (
    <div className="container p-3">
      <div className="row">
        <h3>Makaleler</h3>

        <DataTable columns={columns} data={articles} onDelete={handleDelete} />
      </div>
      <div className="row"></div>
      <Link className="btn btn-success" to="/login">
        {t("New")}
      </Link>
    </div>
  );
};

export default Articles;
