import React from "react";
import PropTypes from "prop-types";
import styles from "./Square.module.css";

export function Square(props) {
  return (
    <button
      className={
        props.activeSquare
          ? `${styles.Square} ${styles.Square_active}`
          : styles.Square
      }
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
