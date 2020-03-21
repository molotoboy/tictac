import React from "react";
import { Square } from "./Square";
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
        onClick={() => this.props.onClick(i)}
        activeSquare={this.props.activeSquare === i || winSquare}
      />
    );
  }
  renderRows(boardW, boardH) {
    const rows = [];
    let current = 0;
    for (let j = 0; j < boardH; j++) {
      const cols = [];
      for (let i = 0; i < boardW; i++) {
        cols.push(this.renderSquare(current++));
      }
      rows.push(
        <div key={j} className="board-row">
          {cols}
        </div>
      );
    }
    return rows;
  }
  render() {
    const { boardW, boardH } = this.props;
    return <div>{this.renderRows(boardW, boardH)}</div>;
  }
}
