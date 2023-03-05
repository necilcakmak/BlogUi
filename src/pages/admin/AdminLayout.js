import React, { useState, useRef } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import Topbar from "./Topbar";
import { AppMenu } from "./AppMenu";
import Footer from "./Footer";

const AdminLayout = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  PrimeReact.ripple = true;

  const menu = [
    {
      label: "Home",
      items: [
        {
          label: "Admin",
          icon: "pi pi-fw pi-home",
          to: "/admin",
        },
      ],
    },
    {
      label: "User Components",
      icon: "pi pi-fw pi-sitemap",
      items: [
        {
          label: "Users",
          icon: "pi pi-fw pi-id-card",
          to: "/admin/users",
        },
      ],
    },
    {
      label: "Article Components",
      icon: "pi pi-fw pi-sitemap",
      items: [
        {
          label: "Articles",
          icon: "pi pi-fw pi-id-card",
          to: "/admin/articles",
        },
      ],
    },
  ];

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  return (
    <>
      <div className={wrapperClass} onClick={onWrapperClick}>
        <Tooltip
          ref={copyTooltipRef}
          target=".block-action-copy"
          position="bottom"
          content="Copied to clipboard"
          event="focus"
        />

        <Topbar
          onToggleMenuClick={onToggleMenuClick}
          layoutColorMode={layoutColorMode}
          mobileTopbarMenuActive={mobileTopbarMenuActive}
          onMobileTopbarMenuClick={onMobileTopbarMenuClick}
          onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
        />

        <div className="layout-sidebar" onClick={onSidebarClick}>
          <AppMenu
            model={menu}
            onMenuItemClick={onMenuItemClick}
            layoutColorMode={layoutColorMode}
          />
        </div>
        <div className="layout-main-container">
          <div className="layout-main">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
