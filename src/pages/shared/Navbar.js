import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();

  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setIsLoggedIn(localStorage.getItem("token"));
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const questLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          {t("Login")}
        </Link>
      </li>
    </Fragment>
  );
  const authLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={{ cursor: "pointer" }}
          to="/"
          onClick={logout}
        >
          {t("Logout")}
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {t("Home")}
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
                <Link className="nav-link" to="/articles">
                  {t("Articles")}
                </Link>
              </li>

              {isLoggedIn ? authLinks() : questLinks()}
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => onChangeLang("tr")}
                  style={{ cursor: "pointer" }}
                >
                  tr
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => onChangeLang("en")}
                  style={{ cursor: "pointer" }}
                >
                  en
                </span>
              </li>
            </ul>
          </div>
          <form className="form-inline">
            <span>{user?.userName}</span>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
