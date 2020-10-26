import { nextMove } from "./nextMove";

let player = 1;
let board = {
  squares: [null, null, null, null, null, null, null, null, null],
  boardConfig: {
    boardW: 3,
    boardH: 3,
    goal: 3
  }
};

test("on 3x3 should start 4", () => {
  expect(nextMove(player, board.squares, board.boardConfig)).toEqual({
    maxRate: 4,
    sortedSquareRating: [4, 0, 2, 6, 8, 1, 3, 5, 7],
    squareRating: [3, 2, 3, 2, 4, 2, 3, 2, 3]
  });
});
