import React from "react";
import calculateWinner from "./calculateWinner";
import { Board } from "./Board";
import MoveList from "./blocks/MoveList";
export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardW: 6,
      boardH: 6,
      goal: 5,
      history: [
        {
          squares: [],
          position: null
        }
      ],
      winnerPositions: [],
      activeStep: 0,
      xIsNext: true
    };
    // console.log(this.state);
    this.state.history[0].squares.length =
      this.state.boardW * this.state.boardH;
    this.state.history[0].squares.fill(null);
    this.state.winnerPositions.length = this.state.goal;
    this.state.winnerPositions.fill(null);
  }
  jumpTo = step => {
    this.setState({
      activeStep: step,
      xIsNext: step % 2 === 0
    });
  };
  handleClick = i => {
    const { boardW, boardH, goal } = this.state;
    const history = this.state.history.slice(0, this.state.activeStep + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winnerPositions = calculateWinner(
      current.squares,
      boardW,
      boardH,
      goal
    );
    // console.log(i);
    if (squares[i] || winnerPositions) {
      return;
    }
    if (winnerPositions) {
      this.setState({
        winnerPositions: winnerPositions
      });
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: i
        }
      ]),
      activeStep: history.length,
      xIsNext: !this.state.xIsNext
    });
  };

  render() {
    const { boardH, boardW, goal } = this.state;
    const history = this.state.history;
    const current = history[this.state.activeStep];
    const winnerPositions = calculateWinner(
      current.squares,
      boardH,
      boardW,
      goal
    );
    let winner = null;
    if (winnerPositions) {
      winner = current.squares[winnerPositions[0]];
    }

    let status;
    if (winner) {
      status = "Выиграл " + winner;
    } else if (this.state.activeStep === boardH * boardW) {
      status = "Игра окончилась вничью";
    } else {
      status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardW={boardW}
            boardH={boardH}
            squares={current.squares}
            handleClick={this.handleClick}
            activeSquare={current.position}
            winnerPositions={winnerPositions}
          />
        </div>
        <div className="game-info">
          <h2>{status}</h2>
          <MoveList
            history={history}
            boardW={boardW}
            boardH={boardH}
            jumpToMoveHandler={this.jumpTo}
            activeStep={this.state.activeStep}
          />
        </div>
      </div>
    );
  }
}
