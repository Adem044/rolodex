import React, { useState } from "react";
import "./navBar.css";
function NavBar({
  navItems,
  clicked,
  added,
  handleNotif,
  recentNotif,
  showDrop,
}) {
  const [active, setActive] = useState("Monsters");
  const [showDropDown, setShowDropDown] = useState(false);
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
      <i
        data-notifs-count={recentNotif.length}
        className={`${!recentNotif.length ? "far" : "fas"} fa-bell`}
        onClick={() => {
          setShowDropDown(!showDropDown);
          handleNotif();
        }}
      >
        <div className="notifications" hidden={!showDrop}>
          <h4>
            Notifications <span>{added.length}</span>
          </h4>
          {added.map((fav, id) => (
            <div
              className="notif"
              key={id}
              style={{
                backgroundColor:
                  fav.type === "removed"
                    ? "tomato"
                    : "rgba(179, 202, 145, 0.787)",
              }}
            >
              <img
                alt="monster"
                src={`https://robohash.org/${fav.id}?set=set2&size=180x180`}
              />
              <div>
                <h5>{fav.name}</h5>
                <h6>{fav.email}</h6>
              </div>
            </div>
          ))}
        </div>
      </i>
    </div>
  );
}

export default NavBar;
