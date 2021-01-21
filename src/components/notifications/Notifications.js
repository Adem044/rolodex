import React, { useContext } from "react";
import "./Notifications.css";
import { NotifsContext } from "../../App";

const Notifications = ({ deleteHandler, mode }) => {
  const value = useContext(NotifsContext);
  const notificationMode =
    mode === "light" ? "notifications" : "notifications dark-notifications";
  return (
    <div className={notificationMode} hidden={!value.showDrop}>
      <h4>
        Notifications <span>{value.added.length}</span>
        <span className="delete-all" onClick={deleteHandler}>
          X
        </span>
      </h4>
      {value.added.map((fav, id) => (
        <div
          className="notif"
          key={id}
          style={{
            backgroundColor:
              fav.type === "removed" ? "tomato" : "rgba(179, 202, 145, 0.787)",
          }}
        >
          <img
            alt="monster"
            src={`https://robohash.org/${fav.id}?set=set2&size=180x180`}
          />
          <div>
            <h5>
              {fav.name}
              <span>{` (${fav.type})`}</span>
            </h5>
            <h6>{fav.email}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
