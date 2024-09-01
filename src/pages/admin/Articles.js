import { useEffect, useState } from "react";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { httpService } from "../../tools/httpService";
import { Calendar } from "@fullcalendar/core";
import { Dialog } from "primereact/dialog";
import endPoints from "../../EndPoints";
import { toast } from "react-toastify";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { ArticleService } from "../../services/ArticleService";
import { object, string } from "yup";
import SelectInput from "components/SelectInput";

const Articles = () => {
  const articleService = new ArticleService();
  const [articles, setArticles] = useState(null);
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [newDialog, setNewDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    initFilters();
    getArticles();
  }, []);
  const getArticles = async () => {
    const response = await articleService.getArticleList();
    if (response.success) {
      setArticles(response.data);
      setLoading(false);
    }
  };
  const getCategories = async () => {
    const response = await httpService.get(endPoints.GET_CATEGORİES);
    if (response.success) {
      setCategories(response.data);
      setLoading(false);
    }
  };
  let validationSchema = object({
    categoryId:string().required("Lütfen seçim yapınız"),
    title: string()
      .required("Bu alan zorunludur!")
      .min(5, "En az 5 karakter olmalı")
      .max(50, "En fazla 50 karakter olabilir"),
    content: string()
      .required("Bu alan zorunludur!")
      .min(5, "En az 5 karakter olmalı")
      .max(5000, "En fazla 50 karakter olabilir"),
    slug: string()
      .required("Bu alan zorunludur!")
      .min(5, "En az 5 karakter olmalı")
      .max(150, "En fazla 50 karakter olabilir"),
    keywords: string()
      .required("Bu alan zorunludur!")
      .min(5, "En az 5 karakter olmalı")
      .max(250, "En fazla 50 karakter olabilir"),
  });

  const initFilters = () => {
    setFilters({
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      publishedDate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
  };
  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(new Date(rowData.publishedDate));
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="dd/mm/yy"
        placeholder="dd/mm/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const deleteArticle = async () => {
    const response = await articleService.deleteArticleById(article.id);
    if (response.success) {
      let items = articles.filter((val) => val.id !== article.id);
      setArticles(items);
      setDeleteDialog(false);
      setArticle(null);
      toast.success(response.message);
    } else {
      setDeleteDialog(false);
      toast.error(response.message);
    }
  };
  const deleteSelectedArticles = async () => {
    if (!selectedData) {
      deleteArticle();
    } else {
      let idList = selectedData.map((v) => v.id);
      const response = await articleService.deleteArticlesByIdList(idList);
      if (response.success) {
        let items = articles.filter((val) => !selectedData.includes(val));
        setArticles(items);
        setDeleteDialog(false);
        setSelectedData(null);
        toast.success(response.message);
      } else {
        setDeleteDialog(false);
        toast.error(response.message);
      }
    }
  };
  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };
  const confirmDelete = (article) => {
    setArticle(article);
    setDeleteDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDelete(rowData)}
        />
      </>
    );
  };
  const hideDialog = () => {
    setSubmitted(false);
    setNewDialog(false);
  };
  const openNew = () => {
    getCategories();
    setArticle(null);
    setSubmitted(false);
    setNewDialog(true);
  };
  const saveItem = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    let postItem = { ...article };
    try {
      await validationSchema.validate(postItem, { abortEarly: false });
    } catch (error) {
      let newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      toast.error("Bilgileri kontrol ediniz.");
      return;
    }
    const response = await httpService.post(endPoints.ADD_ARTICLE, postItem);
    if (response.success) {
      articles.push(response.data);
      setNewDialog(false);
      setArticle(null);
      toast.success(response.message);
    } else {
      setErrors(response.validationErrors);
      toast.error(response.message);
    }
  };
  const deleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteArticle}
      />
    </>
  );
 
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Articles</h5>
    </div>
  );
  const newDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveItem}
      />
    </>
  );
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDelete}
            disabled={!selectedData || !selectedData.length}
          />
        </div>
      </React.Fragment>
    );
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let item = { ...article };
    item[`${name}`] = val;
    setErrors((previousError) => ({
      ...previousError,
      [name]: undefined,
    }));
    setArticle(item);
  };
  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={articles}
            paginator
            selection={selectedData}
            onSelectionChange={(e) => setSelectedData(e.value)}
            className="datatable-responsive"
            showGridlines
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            loading={loading}
            header={header}
            responsiveLayout="scroll"
            emptyMessage="No articles found."
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "4rem" }}
            ></Column>
            <Column
              field="title"
              header="Title"
              filter
              filterPlaceholder="Search by title"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="user.email"
              header="Email"
              filter
              filterPlaceholder="Search by email"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Published Date"
              filterField="publishedDate"
              dataType="date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              header="Action"
              body={actionBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>
          <Dialog
            visible={newDialog}
            style={{ width: "450px" }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={newDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <SelectInput
                label="categories"
                name="categoryId"
                error={errors.categoryId}
                value={article?.categoryId}
           
                options={categories}
                onChange={(e) => onInputChange(e, "categoryId")}
              />
            </div>
            <div className="field">
              <label htmlFor="title">Title</label>
              <InputText
                id="title"
                value={article?.title}
                onChange={(e) => onInputChange(e, "title")}
                required
                autoFocus
                className={classNames({
                  "form-control is-invalid":
                    (submitted && !article?.title) || errors.title,
                })}
              />
              {submitted && errors.title && (
                <small className="invalid-feedback">{errors.title}</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="content">Content</label>
              <InputTextarea
                id="content"
                value={article?.content}
                onChange={(e) => onInputChange(e, "content")}
                required
                rows={3}
                cols={20}
                className={classNames({
                  "form-control is-invalid":
                    (submitted && !article?.content) || errors.content,
                })}
              />
              {submitted && errors.content && (
                <small className="invalid-feedback">{errors.content}</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="slug">Slug</label>
              <InputTextarea
                id="slug"
                value={article?.slug}
                onChange={(e) => onInputChange(e, "slug")}
                required
                rows={3}
                cols={20}
                className={classNames({
                  "form-control is-invalid":
                    (submitted && !article?.slug) || errors.slug,
                })}
              />
              {submitted && errors.slug && (
                <small className="invalid-feedback">{errors.slug}</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="keywords">Keywords</label>
              <InputTextarea
                id="keywords"
                value={article?.keywords}
                onChange={(e) => onInputChange(e, "keywords")}
                required
                rows={3}
                cols={20}
                className={classNames({
                  "form-control is-invalid":
                    (submitted && !article?.keywords) || errors.keywords,
                })}
              />
              {submitted && errors.content && (
                <small className="invalid-feedback">{errors.keywords}</small>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={deleteDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteDialogFooter}
            onHide={hideDeleteDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>Are you sure you want to delete?</span>
            </div>
          </Dialog>
          <Dialog
            visible={deleteDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteDialogFooter}
            onHide={hideDeleteDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Are you sure you want to delete the selected articles?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Articles;
