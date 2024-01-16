import { ModalContext, useModal } from "contexts/modalContext";
import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { t } = useTranslation();
  const { onClose, toggleModal, setBodyy, onConfirm } = useModal();

  const handleModal = () => {
    toggleModal();
    setBodyy("test");
    onClose();
  };
  const columns = [
    {
      name: "Title",
      selector: (row: any) => row.title,
    },
    {
      name: "Year",
      selector: (row: any) => row.year,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 3,
      title: "Beetlejuice",
      year: "1980",
    },
  ];
  return (
    <div className="container p-3">
      <div className="row">
        <h3>Home Page</h3>
        <DataTable columns={columns} data={data} pagination />
      </div>
      <div className="row"></div>
      <Link className="btn btn-success" to="/login">
        {t("Login")}
      </Link>
      <button className="btn btn-warning" onClick={handleModal}>
        modal
      </button>
    </div>
  );
};

export default Home;
