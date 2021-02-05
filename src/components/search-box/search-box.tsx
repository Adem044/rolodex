import React from "react";

import "./search-box.styles.css";

interface Props {
  placeholder?: string;
  handleChange: () => any;
}

export const SearchBox: React.FC<Props> = ({ placeholder, handleChange }) => (
  <input
    className="search"
    type="search"
    placeholder={placeholder}
    onChange={handleChange}
  />
);
