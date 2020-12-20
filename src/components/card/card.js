import React, { useState } from "react";
import "./card.styles.css";

export const Card = (props) => {
  const [fav, setFav] = useState(false);
  return (
    <div
      className="card-container"
      onClick={(ev) => props.clicked(ev, props.monster.id)}
    >
      <i
        className={fav ? "fas fa-bookmark" : "far fa-bookmark"}
        style={fav ? { top: "-10px", transition: "top 0.15s ease-in" } : null}
        onClick={() => {
          setFav((prevState) => !prevState);
        }}
      ></i>
      <img
        alt="monster"
        src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`}
      />
      <h2 className={props.monster.name.length < 18 ? "padding-added" : null}>
        {props.monster.name}
      </h2>
      <p>{props.monster.email}</p>
    </div>
  );
};
