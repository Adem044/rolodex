import React from "react";
import { Card } from "../card/card";
import "./card-list.styles.css";

export const CardList = (props) => (
  <div className="card-list">
    {props.monsters.map((monster) => (
      <Card
        clicked={(ev, id) => props.clicked(ev, id)}
        key={monster.id}
        monster={monster}
      />
    ))}
  </div>
);
