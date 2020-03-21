import React from "react";
import PropTypes from "prop-types";
export function Square(props) {
  return (
    <button
      className={props.activeSquare ? "square square_active" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
Square.propTypes = {
  activeSquare: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string
};
