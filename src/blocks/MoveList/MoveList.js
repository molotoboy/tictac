import React from "react";
import "./MoveList.module.css";
export default function MoveList({
  history,
  boardW,
  boardH,
  jumpToMoveHandler,
  activeStep
}) {
  return (
    <div className="MoveList">
      <ol start="0">
        {history.map((step, move) => (
          <li key={move}>
            <button
              className={activeStep === move ? "MoveList-active" : ""}
              onClick={() => jumpToMoveHandler(move)}
            >
              {move
                ? "Перейти к ходу #" +
                  move +
                  " " +
                  (move % 2 ? "X" : "O") +
                  positionToString(step.position, boardW, boardH)
                : "К началу игры"}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function positionToString(position, boardW, boardH) {
  const x = position % boardW;
  const y = (position - x) / boardH;
  return `(${x + 1},${y + 1})`;
}
