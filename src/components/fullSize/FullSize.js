import React from "react";
import "./FullSize.css";

const FullSize = ({ closeFull, clickedImg }) => {
  return (
    <div className="show-full" onClick={closeFull}>
      <img
        alt="monster"
        src={`https://robohash.org/${clickedImg}?set=set2&size=180x180`}
      />
    </div>
  );
};

export default FullSize;
