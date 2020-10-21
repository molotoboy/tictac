/**
 * return coordinate to make move
 * @param {number} player
 * @param {[number]} squares array of cells on board
 * @param {*} boardConfig
 */
export function nextMove(player, squares, boardConfig) {
  const { boardH, boardW, goal } = boardConfig;
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
  let bestMove = 0; //[1, 1];

  let { opportunities, squareRating } = boardConfig;

  if (!opportunities) {
    opportunities = makeOpportunities(squares, boardConfig);
  }

  if (!squareRating) {
    squareRating = makeSquareRating(
      player,
      opportunities,
      squares,
      boardConfig
    );
  }

  let maxRate = 0;
  let mapSquareRating = new Map();
  for (let i = 0; i < boardLen; i++) {
    let prev = mapSquareRating.get(squareRating[i]);
    let next;
    if (squareRating[i] > maxRate) maxRate = squareRating[i];
    if (prev) {
      next = [...prev, i];
    } else {
      next = [i];
    }
    mapSquareRating.set(squareRating[i], next);
  }

  const mapSort = new Map(
    [...mapSquareRating.entries()].sort((a, b) => b[0] - a[0])
  );
  const flatArr = [...mapSort.entries()].map(([a, b]) => b).flatMap(a => a);

  //bestMove = locateSquareByNumber(flatArr[0], boardConfig);
  bestMove = flatArr[0];

  return bestMove;
}

/**
 * convert number of cell to array coordinates
 * @param {number} numberCell of cell on board
 * @param {*} boardConfig board config {boardW, boardH, goal}
 * @returns {[number,number]} point array coordinates
 */
function locateSquareByNumber(numberCell, boardConfig) {
  const x = numberCell % boardConfig.boardW;
  const y = (numberCell - x) / boardConfig.boardW;
  return [x, y];
}

/**
 * convert array coordinates to number of cell
 * @param {[number,number]} point array coordinates
 * @param {*} boardConfig board config {boardW, boardH, goal}
 * @returns {number} number of cell on board
 */
function locateSquareByArray(point, boardConfig) {
  const [x, y] = point;
  return x + y * boardConfig.boardW;
}

/**
 * make single sequence from point to direction
 * @param {[number,number]} point start point of sequence
 * @param {[number,number]} direction direction of sequence
 * @param {*} boardConfig board config {boardW, boardH, goal}
 * @returns {[number]} sequence of win cells numbers
 */
function makeSequence(point, direction, boardConfig) {
  const [x, y] = point;
  const [dx, dy] = direction;
  const { boardW, boardH, goal } = boardConfig;

  const xg = x + dx * (goal - 1);
  const yg = y + dy * (goal - 1);

  if (xg >= boardW || yg >= boardH || xg < 0 || yg < 0) {
    return;
  }
  let sequence = [];
  for (let i = 0; i < goal; i++) {
    const curPoint = [x + dx * i, y + dy * i];
    sequence.push(locateSquareByArray(curPoint, boardConfig));
  }
  return sequence;
}

/**
 * fill sequences win cells numbers
 * @param {*} boardConfig board config {boardW, boardH, goal}
 * @param {any[]} squares occupied by players cells on board
 * @return {{
    sequence: any[];
    occupied: [number,number]; 
    status: any;
    }[] } array of win sequences, with occupied cells by 2 players and status (-1,null,0,1)
 */
function makeOpportunities(squares, boardConfig) {
  const { boardW, boardH, players } = boardConfig;

  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1]
  ];

  let opportunities = [];
  // [
  //   {
  //     sequence: [], // sequences to win
  //     occupied: [0, 0], // number of occupied cells by 2 players[1player, 2player]
  //     status: null //
  //   }
  // ];

  for (let y = 0; y < boardH; y++) {
    for (let x = 0; x < boardW; x++) {
      for (const dir of directions) {
        const s = makeSequence([x, y], dir, boardConfig);
        if (s) {
          let newSequence = { sequence: s, occupied: [0, 0], status: null };
          for (const cellNumber of s) {
            if (squares[cellNumber]) {
              const player = players.indexOf(squares[cellNumber]);
              if (player > -1) {
                newSequence.occupied[player]++;
                if (newSequence.status === null) {
                  newSequence.status = player;
                } else {
                  if (newSequence.status !== player) {
                    newSequence.status = -1;
                  }
                }
              }
            }
          }
          opportunities.push(newSequence);
        }
      }
    }
  }
  console.log(opportunities);
  return opportunities;
}

/**
 * calculate rating of cells
 * @param {number} player number of player (0 or 1)
 * @param {*} opportunities array of win sequences
 * @param {*} squares array of cells
 * @param {*} boardConfig
 * @returns {[number]} array of cells ratings (number of win rows on cell)
 */
function makeSquareRating(player, opportunities, squares, boardConfig) {
  const { boardW, boardH } = boardConfig;
  const boardLen = boardW * boardH;

  if (player === null) {
    throw "player is absent";
  }

  let squareRating = [];
  squareRating.length = boardLen;
  squareRating.fill(0);

  const otherPlayer = (player + 1) % 2;

  for (let i = 0; i < boardH * boardW; i++) {
    if (squares[i] === null) {
      opportunities
        .filter(o => o.sequence.includes(i))
        .forEach(o => {
          if (o.status === null || o.status === -1) squareRating[i] += 1;
          if (o.status === player)
            squareRating[i] += o.occupied[player] * boardConfig.goal * 3;
          if (o.status === otherPlayer)
            squareRating[i] += o.occupied[otherPlayer] * boardConfig.goal * 2;
        });
    }
  }
  console.log(squareRating);
  return squareRating;
}
