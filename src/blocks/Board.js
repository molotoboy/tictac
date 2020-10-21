import React from "react";
import { Square } from "./Square";
import { PropTypes } from "prop-types";
import styled from "@emotion/styled/macro";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.boardW}, 1fr);
  grid-template-rows: repeat(${props => props.boardH}, 1fr);
`;

export class Board extends React.Component {
  renderSquare(i, squareRating, sortedSquareRating) {
    let isWinSquare = false;
    if (this.props.winnerPositions) {
      isWinSquare = this.props.winnerPositions.includes(i);
    }
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        squareClickHandler={() => this.props.squareClickHandler(i)}
        activeSquare={this.props.activeSquare === i || isWinSquare}
        squareRating={squareRating[i]}
        sortedSquareRating={sortedSquareRating[0]}
      />
    );
  }
  renderRows(boardW, boardH, squareRating, sortedSquareRating) {
    const rows = [];
    for (let current = 0; current < boardH * boardW; current++) {
      rows.push(this.renderSquare(current, squareRating, sortedSquareRating));
    }
    return rows;
  }
  render() {
    const {
      boardW,
      boardH,
      squareRating: { squareRating, sortedSquareRating }
    } = this.props;
    return (
      <StyledBoard boardW={boardW} boardH={boardH}>
        {this.renderRows(boardW, boardH, squareRating, sortedSquareRating)}
      </StyledBoard>
    );
  }
}
Board.propTypes = {
  winnerPositions: PropTypes.array,
  squareClickHandler: PropTypes.func,
  squares: PropTypes.array,
  activeSquare: PropTypes.number,
  boardW: PropTypes.number,
  boardH: PropTypes.number
};
