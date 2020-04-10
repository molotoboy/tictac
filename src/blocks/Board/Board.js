import React from "react";
import { Square } from "../Square/Square";
import { PropTypes } from "prop-types";
import styles from "./Board.module.css";

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
      <div className={styles.Board}>{this.renderRows(boardW, boardH)}</div>
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
