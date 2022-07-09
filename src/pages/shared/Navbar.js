import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();

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
          Login
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
          Logout
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
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
                  Articles
                </Link>
              </li>

              {isLoggedIn ? authLinks() : questLinks()}
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
