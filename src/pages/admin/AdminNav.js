import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const AdminNav = () => {
  const { t } = useTranslation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">
          {t("Admin")}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                {t("Users")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/articles">
                {t("Articles")}
              </Link>
            </li>
          </ul>
        </div>
        <Link className="navbar-brand" to="/">
          Site
        </Link>
      </div>
    </nav>
  );
};

export default AdminNav;
