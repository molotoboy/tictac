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
  expect(nextMove(player, board.squares, board.boardConfig)).toEqual(4);
});
