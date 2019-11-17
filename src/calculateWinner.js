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
    for (
      let i = 0, ii = 0;
      i < boardLen &&
      testLineRes &&
      ii < goal &&
      boardW - (cur % boardW) >= goal;
      i++, ii++
    ) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        console.log('-', cur, i, winRow);
        if (winRow.length === goal) return winRow;
      } else {
        winRow = [];
        testLineRes = false;
      }
    }

    //|
    winRow = [];
    testLineRes = true;
    for (
      let i = 0, ii = 0;
      i < boardLen &&
      testLineRes &&
      ii < goal &&
      cur + boardW * (goal - 1) < boardLen;
      i += boardW, ii++
    ) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        console.log('|', cur, i, winRow);
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
      let i = 0, ii = 0;
      i < boardLen &&
      testLineRes &&
      ii < goal &&
      boardW - (cur % boardW) >= goal &&
      cur + boardW * (goal - 1) < boardLen;
      i += boardW + 1, ii++
    ) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        console.log('\\', cur, i, winRow, ii, boardW - (cur % boardW));
        if (winRow.length === goal) return winRow;
      } else {
        winRow = [];
        testLineRes = false;
      }
    }

    // /
    winRow = [];
    testLineRes = true;
    for (
      let i = 0, ii = 0;
      i < boardLen &&
      testLineRes &&
      ii < goal &&
      cur % boardW >= goal - 1 &&
      cur + boardW * (goal - 1) < boardLen;
      i += boardW - 1, ii++
    ) {
      if (squares[cur] === squares[cur + i]) {
        winRow.push(cur + i);
        console.log('/', cur, i, winRow, ii, cur % boardW);
        if (winRow.length === goal) return winRow;
      } else {
        winRow = [];
        testLineRes = false;
      }
    }
  }
  if (winRow.length === goal) return winRow;
  return [];
}

export default calculateWinner;
