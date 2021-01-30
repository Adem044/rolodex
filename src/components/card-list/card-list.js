import React, { useState } from "react";
import { Card } from "../card/card";
import { useLocation, Route } from "react-router-dom";
import FullCardInfo from "../card/fullCardInfo";
import "./card-list.styles.css";

export const CardList = ({ myFav, monsters, clicked }) => {
  const [showDetails, setShowDetails] = useState(0);
  let monst = monsters.find((mon) => mon.id === showDetails);
  const location = useLocation();
  return (location.pathname === "/Favourites" && myFav.length) ||
    location.pathname !== "/Favourites" ? (
    <div className="card-list">
      {/* {monsters.map((monster) => (
        <Route key={monster.id} path={`/Monsters/${monster.id}`}>
          <FullCardInfo monster={monster} />
        </Route>
      ))} */}
      {showDetails
        ? [
            <h2 key="h1" className="close" onClick={() => setShowDetails(0)}>
              X
            </h2>,
            <FullCardInfo key="card" monster={monst} />,
          ]
        : monsters.map((monster) => {
            return (
              <Card
                clicked={(ev, id) => {
                  clicked(ev, id);
                  if (
                    ev.target.tagName !== "IMG" &&
                    !ev.target.className.includes("fa-bookmark")
                  )
                    setShowDetails(id);
                }}
                key={monster.id}
                monster={monster}
                isFav={myFav.includes(monster.id)}
              />
            );
          })}
    </div>
  ) : (
    <p>No Monsters Added to Favourites!</p>
  );
};
