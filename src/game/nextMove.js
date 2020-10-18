/**
 * return coordinate to make move
 * @param {*} player
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
    opportunities = makeOpportunities(boardConfig);
  }

  if (!squareRating) {
    squareRating = makeSquareRating(boardConfig);
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
 * @return {{
    sequence: any[];
    occupied: [number,number]; 
    status: any;
    }[] } array of win sequences, with occupied cells by 2 players and status? ?(open,closed) or (null,0,1pl,2pl)?
 */
function makeOpportunities(boardConfig) {
  const { boardW, boardH } = boardConfig;

  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1]
  ];

  let opportunities = [
    {
      sequence: [], // sequences to win
      occupied: [0, 0], // number of occupied cells by 2 players[1player, 2player]
      status: null //
    }
  ];

  for (let y = 0; y < boardH; y++) {
    for (let x = 0; x < boardW; x++) {
      for (const dir of directions) {
        const s = makeSequence([x, y], dir, boardConfig);
        if (s) {
          opportunities.push({ sequence: s, occupied: [0, 0], status: null });
        }
      }
    }
  }

  return opportunities;
}

/**
 * calculate rating of cells
 * @param {*} board
 * @returns {[number]} array of cells ratings (number of win rows on cell)
 */
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
  return squareRating;
}
