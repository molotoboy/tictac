import React from "react";
import PropTypes from "prop-types";
export function Square(props) {
  return (
    <button
      className={props.activeSquare ? "square square_active" : "square"}
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
