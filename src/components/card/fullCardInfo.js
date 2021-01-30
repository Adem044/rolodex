import React, { useEffect, useState } from "react";
import { Spring, config } from "react-spring/renderprops";

import "./fullCardInfo.css";
import { useParams } from "react-router-dom";

const FullCardInfo = ({ monster }) => {
  const Id = useParams().id;

  const [monsters, updateMonsters] = useState(null);

  useEffect(() => {
    if (Id) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          return response.json();
        })
        .then((user) =>
          updateMonsters(user.find((mon) => mon.id === Number(Id)))
        );
    }
  }, [Id]);

  const arr = Object.entries(Id && monsters ? monsters : monster);
  const filteredArr = arr.filter((arr) => {
    return arr[0] !== "username" && typeof arr[1] === "string";
  });
  return (
    <Spring
      // reset
      // reverse
      from={{ background: "#95dada", borderRadius: "2%" }}
      to={{ background: "thistle", borderRadius: "5%" }}
      config={(key) => (key === "background" ? config.slow : { duration: 500 })}
    >
      {(props) => (
        <div style={props} className="full-card-container">
          <img
            alt="monster"
            src={`https://robohash.org/${
              Id && monsters ? monsters.id : monster.id
            }?set=set2&size=180x180`}
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
      )}
    </Spring>
  );
};

export default FullCardInfo;
