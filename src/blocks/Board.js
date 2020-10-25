import React from "react";
import { Square } from "./Square";
import { PropTypes } from "prop-types";
import styled from "@emotion/styled/macro";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.boardW}, 1fr);
  grid-template-rows: repeat(${props => props.boardH}, 1fr);
  padding-left: 1rem;
  padding-right: 1rem;
`;

export class Board extends React.Component {
  renderSquare(i, squareRating, maxRate) {
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
        maxRate={maxRate}
      />
    );
  }
  renderRows(boardW, boardH, squareRating, maxRate) {
    const rows = [];
    for (let current = 0; current < boardH * boardW; current++) {
      rows.push(this.renderSquare(current, squareRating, maxRate));
    }
    return rows;
  }
  render() {
    const {
      boardW,
      boardH,
      squareRating: { squareRating, maxRate }
    } = this.props;
    return (
      <StyledBoard boardW={boardW} boardH={boardH}>
        {this.renderRows(boardW, boardH, squareRating, maxRate)}
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
