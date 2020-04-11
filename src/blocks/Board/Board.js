import React from "react";
import { Square } from "../Square/Square";
import { PropTypes } from "prop-types";
import styled from "styled-components";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.boardW}, 1fr);
  grid-template-rows: repeat(${props => props.boardH}, 1fr);
`;

export class Board extends React.Component {
  renderSquare(i) {
    let winSquare = false;
    if (this.props.winnerPositions) {
      winSquare = this.props.winnerPositions.includes(i);
    }
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        squareClickHandler={() => this.props.squareClickHandler(i)}
        activeSquare={this.props.activeSquare === i || winSquare}
      />
    );
  }
  renderRows(boardW, boardH) {
    const rows = [];
    for (let current = 0; current < boardH * boardW; current++) {
      rows.push(this.renderSquare(current));
    }
    return rows;
  }
  render() {
    const { boardW, boardH } = this.props;
    return (
      <BoardContainer boardW={boardW} boardH={boardH}>
        {this.renderRows(boardW, boardH)}
      </BoardContainer>
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
