import React from "react";
import styled from "@emotion/styled/macro";

const StyledMoveList = styled.div``;
const StyledItem = styled.div`
  user-select: none;
  cursor: pointer;
  background-color: ${props => (props.active ? "coral" : "#fff")};
  &:hover {
    color: #7d1907;
  }
`;

export default function MoveList({
  history,
  boardW,
  boardH,
  jumpToMoveHandler,
  activeStep,
  players
}) {
  return (
    <StyledMoveList>
      <ol start="0">
        {history.map((step, move) => (
          <li key={move}>
            <StyledItem
              active={activeStep === move}
              onClick={() => jumpToMoveHandler(move)}
            >
              {move
                ? "ход " +
                  players[(move + 1) % 2] +
                  " " +
                  positionToString(step.position, boardW, boardH)
                : "Старт"}
            </StyledItem>
          </li>
        ))}
      </ol>
    </StyledMoveList>
  );
}

function positionToString(position, boardW, boardH) {
  const x = position % boardW;
  const y = (position - x) / boardH;
  return `(${x + 1},${y + 1})`;
}
