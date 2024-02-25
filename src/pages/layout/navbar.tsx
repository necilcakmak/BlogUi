import { useAuth } from "contexts/authContext";
import { UserDto } from "interfaces/user/userDto";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import tr from "../../assets/tr.png";
import uk from "../../assets/uk.png";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, login, logout } = useAuth();
  const onChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    const user = localStorage.getItem("user") as UserDto | null;
    if (user) {
      login(user);
    }
  }, [login]);

  const logoutt = () => {
    logout();
  };
  const questLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          {t("Register")}
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
          onClick={logoutt}
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
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <img
                src={tr}
                alt="Turkey flag"
                onClick={() => onChangeLang("tr")}
                style={{ cursor: "pointer", width: 24, height: 24 }}
              />
            </li>
            <li className="nav-item">
              <img
                src={uk}
                alt="English"
                onClick={() => onChangeLang("en")}
                style={{ cursor: "pointer", width: 24, height: 24 }}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
