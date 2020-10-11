let board = {
  squares: [],
  boardW: 3,
  boardH: 3,
  goal: 3
};
let boardConfig = {
  boardW: 3,
  boardH: 3,
  goal: 3
};

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1]
];

function locateSquare(point, boardConfig) {
  const [x, y] = point;
  return x + y * boardConfig.boardH;
}

console.log(locateSquare([2, 2], boardConfig));

function makeSequence(point, direction, boardConfig) {
  const [x, y] = point;
  const [dx, dy] = direction;
  const { boardW, boardH, goal } = boardConfig;

  const xg = x + dx * (goal - 1);
  // console.log(xg);
  const yg = y + dy * (goal - 1);
  // console.log(yg);
  if (xg >= boardW || yg >= boardH || xg < 0 || yg < 0) {
    return;
  }
  let sequence = [];
  for (let i = 0; i < goal; i++) {
    const curPoint = [x + dx * i, y + dy * i];
    sequence.push(locateSquare(curPoint, boardConfig));
  }
  return sequence;
}

const s = makeSequence([0, 0], directions[3], boardConfig);
console.log(s);

let opportunities = [
  {
    sequence: [],
    players: [0, 0],
    status: null
  }
];

for (let y = 0; y < boardConfig.boardH; y++) {
  console.log(y);
  for (let x = 0; x < boardConfig.boardW; x++) {
    console.log(x);
    for (const dir of directions) {
      // console.log()
      const s = makeSequence([x, y], dir, boardConfig);
      if (s) {
        opportunities.push({ sequence: s, players: [0, 0], status: null });
        console.log([x, y], dir, s);
      }
    }
  }
}

console.log(opportunities);

let squareRating = [];
squareRating.length = boardConfig.boardH * boardConfig.boardW;
squareRating.fill(0);

for (let i = 0; i < boardConfig.boardH * boardConfig.boardW; i++) {
  opportunities.forEach(o => {
    if (o.sequence.includes(i)) {
      squareRating[i]++;
    }
  });
}

console.log(squareRating);
