import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./navBar.css";
import Notifications from "../notifications/Notifications";

function NavBar({
  navItems,
  clicked,
  handleNotif,
  recentNotif,
  deleteHandler,
  toggleMode,
  mode,
}) {
  const [active, setActive] = useState("Monsters");
  const location = useLocation();

  if (location.pathname !== "/Favourites") {
    if (active !== "Monsters") {
      setActive("Monsters");
    }
  }
  if (location.pathname === "/Favourites") {
    if (active !== "Favourites") {
      setActive("Favourites");
    }
  }

  const navBarClassName = mode === "light" ? "nav-bar" : "nav-bar dark";
  return (
    <div className={navBarClassName}>
      {navItems.map((navItem, id) => {
        return (
          <Link
            className={active === navItem ? "active" : null}
            to={`/${navItem}`}
            onClick={() => {
              clicked(id);
              setActive(navItem);
            }}
            key={id}
          >
            {navItem}
          </Link>
        );
      })}
      <Icon
        data-notifs-count={recentNotif.length}
        className={`${!recentNotif.length ? "far" : "fas"} fa-bell`}
        onClick={(ev) => {
          handleNotif(ev.target.classList.contains("fa-bell"));
        }}
      >
        <Notifications deleteHandler={deleteHandler} mode={mode} />
      </Icon>
      <div className="toggle-mode">
        <i
          className={`${mode === "light" ? "far fa-sun" : "fas fa-moon"} mode`}
          onClick={toggleMode}
        ></i>
        <span className="toggle">
          {mode === "light" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>
    </div>
  );
}

export default NavBar;

const Icon = styled.i`
  &::after {
    display: ${(props) =>
      props["data-notifs-count"] ? "inline-block" : "none"};
  }
`;
