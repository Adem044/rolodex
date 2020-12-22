import React, { useState } from "react";
import "./card.styles.css";

export const Card = ({ clicked, isFav, monster: { id, name, email } }) => {
  const [fav, setFav] = useState(isFav);
  return (
    <div className="card-container" onClick={(ev) => clicked(ev, id)}>
      <i
        className={fav ? "fas fa-bookmark" : "far fa-bookmark"}
        style={fav ? { top: "-10px", transition: "top 0.15s ease-in" } : null}
        onClick={() => {
          setFav((prevState) => !prevState);
        }}
      ></i>
      <img
        alt="monster"
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
      />
      <h2 className={name.length < 18 ? "padding-added" : null}>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
