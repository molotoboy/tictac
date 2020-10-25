import React from "react";
import styled from "@emotion/styled/macro";

const StyledMoveList = styled.div`
  height: 100%;
`;
const StyledItem = styled.div`
  user-select: none;
  cursor: pointer;
  background-color: ${props => (props.active ? "coral" : "#fff")};
  &:hover {
    color: ${props => (!!!props.active ? "coral" : "#fff")};
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
      {history.map((step, move) => (
        <div key={move}>
          <StyledItem
            active={activeStep === move}
            onClick={() => jumpToMoveHandler(move)}
          >
            {move
              ? move +
                " ход " +
                players[(move + 1) % 2] +
                " " +
                positionToString(step.position, boardW, boardH)
              : "Старт"}
          </StyledItem>
        </div>
      ))}
    </StyledMoveList>
  );
}

function positionToString(position, boardW, boardH) {
  const x = position % boardW;
  const y = (position - x) / boardH;
  return `(${x + 1},${y + 1})`;
}
