import React, { useState } from "react";
import "./navBar.css";
function NavBar({ navItems, clicked }) {
  const [active, setActive] = useState("Monsters");
  return (
    <div className="nav-bar">
      {navItems.map((navItem, id) => {
        return (
          <span
            className={active === navItem ? "active" : null}
            key={id}
            onClick={() => {
              clicked(id);
              setActive(navItem);
            }}
          >
            {navItem}
          </span>
        );
      })}
    </div>
  );
}

export default NavBar;
