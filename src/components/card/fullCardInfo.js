import React from "react";
import "./fullCardInfo.css";
import { useParams } from "react-router-dom";

const FullCardInfo = ({ monster }) => {
  // const Id = useParams().id;
  // let monst = monster.filter((mon) => mon.id == Id);

  const arr = Object.entries(monster);
  const filteredArr = arr.filter((arr) => {
    return arr[0] !== "username" && typeof arr[1] === "string";
  });
  return (
    <div className="full-card-container">
      <img
        alt="monster"
        src={`https://robohash.org/${monster.id}?set=set2&size=180x180`}
      />
      <div className="infos">
        {filteredArr.map((a, i) => (
          <h3 key={i}>
            {a[0]}
            <span>{a[1]}</span>
          </h3>
        ))}
      </div>
    </div>
  );
};

export default FullCardInfo;
