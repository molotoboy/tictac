import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled/macro";

const StyledSquare = styled.div`
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  width: 34px;
  padding: 0;
  text-align: center;
  user-select: none;

  background-color: ${props => (props.activeSquare ? "coral" : "#fff")};
  &:focus {
    outline: none;
  }
  &:hover {
    border: 1px solid red;
  }
`;

export function Square(props) {
  return (
    <StyledSquare
      activeSquare={props.activeSquare}
      onClick={props.squareClickHandler}
    >
      {props.value}
    </StyledSquare>
  );
}
Square.propTypes = {
  activeSquare: PropTypes.bool,
  squareClickHandler: PropTypes.func,
  value: PropTypes.string
};
