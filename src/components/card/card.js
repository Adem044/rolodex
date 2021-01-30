import React, { useState, useContext, useRef } from "react";
import { Spring, config } from "react-spring/renderprops";
import "./card.styles.css";
import { ModeContext } from "../../App";

export const Card = ({ clicked, isFav, monster: { id, name, email } }) => {
  const paraRef = useRef(null);
  const mode = useContext(ModeContext);
  const [fav, setFav] = useState(isFav);
  const cardMode =
    mode === "light" ? "card-container" : "card-container dark-card";
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 500 }}
    >
      {(props) => (
        <div
          style={props}
          className={cardMode}
          onClick={(ev) => clicked(ev, id)}
        >
          <i
            className={fav ? "fas fa-bookmark" : "far fa-bookmark"}
            style={
              fav ? { top: "-10px", transition: "top 0.15s ease-in" } : null
            }
            onClick={() => {
              setFav((prevState) => !prevState);
            }}
          ></i>
          <img
            alt="monster"
            src={`https://robohash.org/${id}?set=set2&size=180x180`}
          />
          <h2 className={name.length < 18 ? "padding-added" : null}>{name}</h2>
          <p ref={paraRef}>{email}</p>
        </div>
      )}
    </Spring>
  );
};
