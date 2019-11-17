function calculateWinner(squares, boardW = 3, boardH = 3, goal = 3) {
  const boardLen = boardW * boardH;

  if (squares.length !== boardLen) {
    // console.log('Skipped wrong size board');
    return []; //or throw??
  }

  let winRow = [];
  let testLineRes;
  for (let cur = 0; cur < boardLen; cur++) {
    if (!squares[cur]) continue;
    winRow = [];
    testLineRes = true;
    //---
    for (let i = 0; i < boardW - (cur % boardW) && testLineRes; i++) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        // console.log(cur, i, winRow);
        if (winRow.length === goal) return winRow;
      } else {
        winRow = [];
        testLineRes = false;
      }
    }

    //|
    winRow = [];
    testLineRes = true;
    for (let i = 0; i < boardLen && testLineRes; i += boardW) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        // console.log(cur, i, winRow);
        if (winRow.length === goal) return winRow;
      } else {
        winRow = [];
        testLineRes = false;
      }
    }

    // \
    winRow = [];
    testLineRes = true;
    for (
      let i = 0;
      i < boardW - (cur % boardW) && testLineRes;
      i += boardW + 1
    ) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        // console.log(cur, i, winRow);
        if (winRow.length === goal) return winRow;
      } else {
        winRow = [];
        testLineRes = false;
      }
    }

    // /
  }
  if (winRow.length === goal) return winRow;
  return [];
}

export default calculateWinner;
