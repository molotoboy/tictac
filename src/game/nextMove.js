import { number } from "prop-types";

export function nextMove(player, board) {
  const { squares, boardH, boardW, goal } = board;
  const boardLen = boardW * boardH;

  if (squares.length !== boardLen) {
    throw "Wrong squares array";
  }
  if (goal > boardH || goal > boardW || goal < 3) {
    throw "Wrong goal";
  }
  if (boardH <= 0 || boardW <= 0) {
    throw "Wrong board size";
  }
  const bestMove = [1, 1];

  let { opportunities, squareRating } = board;

  if (!opportunities) {
    opportunities = makeOpportunities(board);
  }

  if (!squareRating) {
    squareRating = makeSquareRating(board);
  }

  return bestMove;
}

function makeSequence(point, direction, board) {
  const [x, y] = point;
  const [dx, dy] = direction;
  const { boardW, boardH, goal } = board;

  const xg = x + dx * (goal - 1);
  const yg = y + dy * (goal - 1);

  if (xg >= boardW || yg >= boardH || xg < 0 || yg < 0) {
    return;
  }
  let sequence = [];
  for (let i = 0; i < goal; i++) {
    const curPoint = [x + dx * i, y + dy * i];
    sequence.push(locateSquare(curPoint, board));
  }
  return sequence;
}

function makeOpportunities(board) {
  const { boardW, boardH } = board;

  let opportunities = [
    {
      sequence: [],
      players: [0, 0],
      status: null
    }
  ];

  for (let y = 0; y < boardH; y++) {
    for (let x = 0; x < boardW; x++) {
      for (const dir of directions) {
        const s = makeSequence([x, y], dir, board);
        if (s) {
          opportunities.push({ sequence: s, players: [0, 0], status: null });
          console.log([x, y], dir, s);
        }
      }
    }
  }

  console.log(opportunities);

  return opportunities;
}

function makeSquareRating(board) {
  const { boardW, boardH } = board;
  const boardLen = boardW * boardH;

  let { opportunities } = board;

  if (!opportunities) {
    opportunities = makeOpportunities(board);
  }

  let squareRating = [];
  squareRating.length = boardLen;
  squareRating.fill(0);

  for (let i = 0; i < boardH * boardW; i++) {
    opportunities.forEach(o => {
      if (o.sequence.includes(i)) {
        squareRating[i]++;
      }
    });
  }

  console.log(squareRating);

  return squareRating;
}
