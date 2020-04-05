import React from "react";
import PropTypes from "prop-types";
import "./Square.css";

export function Square(props) {
  return (
    <button
      className={props.activeSquare ? "Square Square-active" : "Square"}
      onClick={props.squareClickHandler}
    >
      {props.value}
    </button>
  );
}
Square.propTypes = {
  activeSquare: PropTypes.bool,
  squareClickHandler: PropTypes.func,
  value: PropTypes.string
};
