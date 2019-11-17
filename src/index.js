import React from 'react';
import ReactDOM from 'react-dom';
import calculateWinner from './calculateWinner';
import './index.css';
function Square(props) {
  return (
    <button
      className={props.activeSquare ? 'square active' : 'square'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
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
        <div key={j} className='board-row'>
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

class Game extends React.Component {
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
      stepNumber: 0,
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
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };
  handleClick = i => {
    const { boardW, boardH, goal } = this.state;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
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

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  };

  positionToString(position) {
    const { boardW, boardH } = this.state;
    const x = position % boardW;
    const y = (position - x) / boardH;
    return `(${x + 1},${y + 1})`;
  }

  render() {
    const { boardH, boardW, goal } = this.state;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
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

    const moves = history.map((step, move) => {
      const desc = move
        ? 'Перейти к ходу #' +
          move +
          ' ' +
          (move % 2 ? 'X' : 'O') +
          this.positionToString(step.position)
        : 'К началу игры';
      return (
        <li key={move}>
          <button
            className={this.state.stepNumber === move ? 'active' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Игра окончилась вничью';
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            boardW={boardW}
            boardH={boardH}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            activeSquare={current.position}
            winnerPositions={winnerPositions}
          />
        </div>
        <div className='game-info'>
          <h2>{status}</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

// function oldCalculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return [a, b, c];
//     }
//   }
//   return null;
// }
