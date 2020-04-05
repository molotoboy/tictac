import React from "react";
import PropTypes from "prop-types";
import "./Square.css";

export function Square(props) {
  return (
    <button
      className={props.activeSquare ? "Square Square-active" : "Square"}
      onClick={props.handleClick}
    >
      {props.value}
    </button>
  );
}
Square.propTypes = {
  activeSquare: PropTypes.bool,
  handleClick: PropTypes.func,
  value: PropTypes.string
};
