import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const PopUp = ({ showPopUp }) => {
  const [show, setShow] = useState(false);

  const prevInput = useRef(showPopUp);

  useEffect(() => {
    let id = null;
    if (prevInput.current < showPopUp) {
      setShow(true);
      id = setTimeout(() => {
        setShow(false);
      }, 1250);
    } else {
      setShow(false);
    }
    prevInput.current = showPopUp;
    return () => clearTimeout(id);
  }, [showPopUp]);

  return (
    show && (
      <PopUpDiv>
        <h4>Added to favourites</h4>
      </PopUpDiv>
    )
  );
};

export default PopUp;

const PopUpDiv = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 20px;
  right: 20px;
  background-color: greenyellow;
  border: 1px solid grey;
  padding: 5px;
  h4 {
    margin: 0;
  }
`;
