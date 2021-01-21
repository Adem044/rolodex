import React, { useState, useContext } from "react";
import "./card.styles.css";
import { ModeContext } from "../../App";

export const Card = ({ clicked, isFav, monster: { id, name, email } }) => {
  const mode = useContext(ModeContext);
  console.log(mode);
  const [fav, setFav] = useState(isFav);
  const cardMode =
    mode === "light" ? "card-container" : "card-container dark-card";
  return (
    <div className={cardMode} onClick={(ev) => clicked(ev, id)}>
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
