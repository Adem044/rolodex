import React from "react";
import "./dropDownMenu.css";

function DropDownMenu({ selected }) {
  return (
    <div className="dropdown">
      <span className="sort">Sort by</span>
      <span>
        <select
          onChange={(ev) => {
            selected(ev.target.value);
          }}
          name="sorted"
        >
          <option value="default">Default</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </span>
    </div>
  );
}

export default DropDownMenu;
