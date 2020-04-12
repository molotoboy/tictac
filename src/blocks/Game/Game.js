import React from "react";
import calculateWinner from "../../calculateWinner";
import { Board } from "../Board/Board";
import MoveList from "../MoveList/MoveList";
import styled from "styled-components";

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledBoard = styled.div``;
const StyledInfo = styled.div`
  margin-left: 2rem;
  h2 {
    color: red;
    margin: 0;
    padding: 0;
  }
`;
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
  squareClickHandler = i => {
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
      status = "Ничья";
    } else {
      status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <StyledGame>
        <StyledBoard>
          <Board
            boardW={boardW}
            boardH={boardH}
            squares={current.squares}
            squareClickHandler={this.squareClickHandler}
            activeSquare={current.position}
            winnerPositions={winnerPositions}
          />
        </StyledBoard>
        <StyledInfo>
          <h2>{status}</h2>
          <MoveList
            history={history}
            boardW={boardW}
            boardH={boardH}
            jumpToMoveHandler={this.jumpTo}
            activeStep={this.state.activeStep}
          />
        </StyledInfo>
      </StyledGame>
    );
  }
}
