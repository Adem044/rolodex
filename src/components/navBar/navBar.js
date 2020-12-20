import React from "react";
import "./navBar.css";
function navBar(props) {
  let makeActive;
  return (
    <div className="nav-bar">
      {props.navItems.map((navItem, id) => {
        switch (id) {
          case 0:
            makeActive = props.active ? null : "active";
            break;
          case 1:
            makeActive = props.active ? "active" : null;
            break;
          default:
            makeActive = null;
        }
        return (
          <span
            className={makeActive}
            key={id}
            onClick={() => props.clicked(id)}
          >
            {navItem}
          </span>
        );
      })}
    </div>
  );
}

export default navBar;
