import React from "react";
import calculateWinner from "../game/calculateWinner";
import { nextMove } from "../game/nextMove";
import { Board } from "./Board";
import MoveList from "./MoveList";
import styled from "@emotion/styled/macro";

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
`;
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
      boardConfig: {
        boardW: 10,
        boardH: 10,
        goal: 5,
        players: ["O", "X"]
      },
      history: [
        {
          squares: [],
          position: null
        }
      ],
      winnerPositions: [],
      activeStep: 0,
      nextPlayer: 0
    };
    // console.log(this.state);
    this.state.history[0].squares.length =
      this.state.boardConfig.boardW * this.state.boardConfig.boardH;
    this.state.history[0].squares.fill(null);
    this.state.winnerPositions.length = this.state.boardConfig.goal;
    this.state.winnerPositions.fill(null);
  }
  jumpTo = step => {
    this.setState({
      activeStep: step,
      nextPlayer: step % 2
    });
  };
  squareClickHandler = i => {
    const { boardW, boardH, goal } = this.state.boardConfig;
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
    squares[i] = this.state.boardConfig.players[this.state.nextPlayer];
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: i
        }
      ]),
      activeStep: history.length,
      nextPlayer: (this.state.nextPlayer + 1) % 2
    });
  };

  render() {
    const { boardH, boardW, goal } = this.state.boardConfig;
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
    console.log(this.state);
    const squareRating = nextMove(
      this.state.nextPlayer,
      current.squares,
      this.state.boardConfig
    );

    let status;
    if (winner) {
      status = "Выиграл " + winner;
    } else if (this.state.activeStep === boardH * boardW) {
      status = "Ничья";
    } else {
      status =
        "Следующий ход: " +
        this.state.boardConfig.players[this.state.nextPlayer];
    }
    return (
      <StyledGame>
        <div>
          <Board
            boardW={boardW}
            boardH={boardH}
            squares={current.squares}
            squareClickHandler={this.squareClickHandler}
            activeSquare={current.position}
            winnerPositions={winnerPositions}
            squareRating={squareRating}
          />
        </div>
        <StyledInfo>
          <h2>{status}</h2>
          <MoveList
            history={history}
            boardW={boardW}
            boardH={boardH}
            jumpToMoveHandler={this.jumpTo}
            activeStep={this.state.activeStep}
            players={this.state.boardConfig.players}
          />
        </StyledInfo>
      </StyledGame>
    );
  }
}
