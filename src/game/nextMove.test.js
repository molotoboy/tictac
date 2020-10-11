import { nextMove } from "./nextMove";

let player = 1;
let board = {
  squares: [null, null, null, null, null, null, null, null, null],
  boardW: 3,
  boardH: 3,
  goal: 3
};

test("on 3x3 should start [1,1]", () => {
  expect(nextMove(player, board)).toEqual([1, 1]);
});
