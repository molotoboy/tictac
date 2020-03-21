import React from "react";
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
