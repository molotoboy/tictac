import React from "react";
import calculateWinner from "../game/calculateWinner";
import { nextMove } from "../game/nextMove";
import { Board } from "./Board";
import MoveList from "./MoveList";
import styled from "@emotion/styled/macro";
import BoardConfigForm from "./BoardConfigForm";

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  min-height: 100%;
  h2 {
    color: red;
    margin: 0;
    padding: 1rem 0 1rem 0;
    text-align: center;
  }
`;
const ContainerBoard = styled.div``;
const StyledInfo = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  overflow-y: scroll;
  width: 200px;
`;
const StyledConfig = styled.div`
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  width: 200px;
`;
export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardConfig: {
        boardW: 3,
        boardH: 3,
        goal: 3,
        players: ["O", "X"]
      },
      newBoardConfig: {
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
      winnerPositions: null,
      activeStep: 0,
      nextPlayer: 0
    };
    // console.log(this.state);
    this.state.history[0].squares.length =
      this.state.boardConfig.boardW * this.state.boardConfig.boardH;
    this.state.history[0].squares.fill(null);
  }

  changeBoard = () => {
    const newHistory = [
      {
        squares: [],
        position: null
      }
    ];
    newHistory[0].squares.length =
      this.state.newBoardConfig.boardW * this.state.newBoardConfig.boardH;
    newHistory[0].squares.fill(null);

    this.setState({
      boardConfig: { ...this.state.newBoardConfig },
      history: newHistory,
      winnerPositions: null,
      activeStep: 0,
      nextPlayer: 0
    });
  };

  validateSize = (value, goal) => {
    if (
      (goal === 3 && value === 3) ||
      (goal > 3 && goal <= value && value > 3 && value <= 20)
    )
      return { error: null };
    else
      return {
        error: "Размер должен быть 3 если цель 3, или больше 3 и меньше 20"
      };
  };
  validateGoal = (goal, boardW, boardH) => {
    if (
      (goal === 3 && boardW === 3 && boardH === 3) ||
      (goal > 3 && goal <= boardH && goal <= boardW)
    )
      return { error: null };
    else
      return {
        error:
          "Цель может быть 3, если поле 3х3 или больше, но не больше ширины и высоты"
      };
  };

  onChange = e => {
    e.persist();
    const name = e.target.name;
    const value = +e.target.value;
    const BoardConfig = { ...this.state.newBoardConfig };
    if (name === "boardW" || name === "boardH") {
      this.setState(this.validateSize(value, BoardConfig.goal));
    }
    if (name === "goal") {
      this.setState(
        this.validateGoal(value, BoardConfig.boardH, BoardConfig.boardW)
      );
    }
    BoardConfig[name] = value;
    this.setState(state => ({
      newBoardConfig: BoardConfig
    }));
  };

  onSubmit = e => {
    if (!!!this.error) this.changeBoard();
    e.preventDefault();
  };

  jumpTo = step => {
    this.setState({
      activeStep: step,
      nextPlayer: step % 2,
      winnerPositions: null
    });
  };

  squareClickHandler = i => {
    if (
      this.state.history[this.state.activeStep].squares[i] ||
      this.state.winnerPositions
    ) {
      return;
    }

    this.setState(state => this.setSquare(i, state));

    //next (automat) player move
    this.nextPlayer();
  };

  setSquare = (i, state) => {
    const squares = state.history[state.activeStep].squares
      .slice(0, i)
      .concat(state.boardConfig.players[state.nextPlayer])
      .concat(state.history[state.activeStep].squares.slice(i + 1));
    const winnerPositions = calculateWinner(squares, state.boardConfig);
    return {
      ...state,
      history: state.history.slice(0, state.activeStep + 1).concat([
        {
          squares: squares,
          position: i
        }
      ]),
      activeStep: state.activeStep + 1,
      nextPlayer: (state.nextPlayer + 1) % 2,
      winnerPositions: winnerPositions
    };
  };

  nextPlayer = () => {
    const { boardH, boardW, goal } = this.state.boardConfig;
    const history = this.state.history;
    const current = history[this.state.activeStep];

    // console.log(this.state);
    const squareRating = nextMove(
      this.state.nextPlayer,
      current.squares,
      this.state.boardConfig
    );
  };

  render() {
    const { boardH, boardW, goal } = this.state.boardConfig;
    const history = this.state.history;
    const current = history[this.state.activeStep];

    // console.log(this.state);
    const squareRating = nextMove(
      this.state.nextPlayer,
      current.squares,
      this.state.boardConfig
    );

    let winner = null;
    const winnerPositions = this.state.winnerPositions;
    if (winnerPositions) winner = current.squares[winnerPositions[0]];

    let status;
    if (winnerPositions) {
      status = "Выиграл " + winner;
    } else if (this.state.activeStep === boardH * boardW) {
      status = "Ничья";
    } else {
      status = "Ход: " + this.state.boardConfig.players[this.state.nextPlayer];
    }
    return (
      <StyledGame>
        <StyledConfig>
          <BoardConfigForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            newBoardConfig={this.state.newBoardConfig}
            error={this.state.error}
          />
        </StyledConfig>
        <ContainerBoard>
          <h2>{status}</h2>
          <Board
            boardW={boardW}
            boardH={boardH}
            squares={current.squares}
            squareClickHandler={this.squareClickHandler}
            activeSquare={current.position}
            winnerPositions={winnerPositions}
            squareRating={squareRating}
          />
        </ContainerBoard>
        <StyledInfo>
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
