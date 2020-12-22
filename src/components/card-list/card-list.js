import React from "react";
import { Card } from "../card/card";
import "./card-list.styles.css";

export const CardList = ({ myFav, monsters, clicked }) => {
  return (
    <div className="card-list">
      {monsters.map((monster) => {
        return (
          <Card
            clicked={(ev, id) => clicked(ev, id)}
            key={monster.id}
            monster={monster}
            isFav={myFav.includes(monster.id)}
          />
        );
      })}
    </div>
  );
};
