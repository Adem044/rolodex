import React, { useState, useContext, useRef } from "react";
import styled, { css } from "styled-components";
import { Spring, config } from "react-spring/renderprops";
import "./card.styles.css";
import { ModeContext } from "../../App";

export const Card = ({ clicked, isFav, monster: { id, name, email } }) => {
  const paraRef = useRef(null);
  const mode = useContext(ModeContext);
  const [fav, setFav] = useState(isFav);

  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 500 }}
    >
      {(props) => (
        <CardContainer
          style={props}
          mode={mode}
          className="card-container"
          onClick={(ev) => clicked(ev, id)}
        >
          <Icon
            className={fav ? "fas fa-bookmark" : "far fa-bookmark"}
            fav={fav}
            onClick={() => {
              setFav((prevState) => !prevState);
            }}
          ></Icon>
          <img
            alt="monster"
            src={`https://robohash.org/${id}?set=set2&size=180x180`}
          />
          <H2 addPadding={name.length < 18}>{name}</H2>
          <p ref={paraRef}>{email}</p>
        </CardContainer>
      )}
    </Spring>
  );
};

const Icon = styled.i`
  ${(props) =>
    props.fav &&
    css`
      top: -10px !important;
      transition: top 0.15s ease-in !important;
    `}
`;

const H2 = styled.h2`
  padding: ${(props) => props.addPadding && "0 27px"};
`;

const CardContainer = styled.div`
  ${({ mode }) =>
    mode !== "light" &&
    css`
      background-color: rgb(110, 110, 110);
      border: 1px solid #95dada;
    `}
`;
