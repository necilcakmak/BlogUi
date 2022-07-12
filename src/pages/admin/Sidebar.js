import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/sidebar.css";
import { SidebarData } from "./SidebarData";
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <i className="fa-solid fa-bars" onClick={showSidebar}></i>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" >
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <i className="fa-solid fa-xmark" onClick={showSidebar}></i>
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <i className={item.icon}></i>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
