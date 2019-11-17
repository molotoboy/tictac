import calculateWinner from '../calculateWinner';

test('should NO win on empty', () => {
  expect(calculateWinner([])).toEqual([]);
});

test('should NO win on fill null', () => {
  expect(
    calculateWinner([null, null, null, null, null, null, null, null, null])
  ).toEqual(null);
});

test('should WIN 1st horizontal XXX', () => {
  expect(
    calculateWinner(['X', 'X', 'X', null, null, null, null, null, null])
  ).toEqual([0, 1, 2]);
});

test('should WIN 2nd horizontal XXX', () => {
  expect(
    calculateWinner([null, null, null, 'X', 'X', 'X', null, null, null])
  ).toEqual([3, 4, 5]);
});

test('should WIN 3rd horizontal XXX', () => {
  expect(
    calculateWinner([null, null, null, null, null, null, 'X', 'X', 'X'])
  ).toEqual([6, 7, 8]);
});

test('should NO win horizontal XX ', () => {
  expect(
    calculateWinner(['X', 'X', null, null, 'X', 'X', 'X', null, null])
  ).toEqual(null);
});

test('should NO win on XOX O-O XO- ', () => {
  expect(
    calculateWinner(['X', 'O', 'X', 'O', null, 'O', 'X', 'O', null])
  ).toEqual(null);
});

test('should Win 1st vertical XXX ', () => {
  expect(
    calculateWinner(['X', 'O', 'X', 'X', 'O', 'O', 'X', 'X', 'O'])
  ).toEqual([0, 3, 6]);
});

test('should Win 2nd vertical OOO ', () => {
  expect(
    calculateWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'O'])
  ).toEqual([1, 4, 7]);
});

test('should Win 3rd vertical XXX ', () => {
  expect(
    calculateWinner(['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'X'])
  ).toEqual([2, 5, 8]);
});

test('should Win diagonal  XXX ', () => {
  expect(
    calculateWinner(['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'X'])
  ).toEqual([0, 4, 8]);
});

test('should Win diagonal / XXX ', () => {
  expect(
    calculateWinner(['X', 'O', 'X', 'O', 'X', 'O', 'X', 'X', 'O'])
  ).toEqual([2, 4, 6]);
});

test('should Win diagonal / XXXX ', () => {
  expect(
    calculateWinner(
      []
        .concat(['X', 'O', 'X', 'X'])
        .concat(['O', 'X', 'X', 'X'])
        .concat(['X', 'X', 'O', 'O'])
        .concat(['X', 'X', 'O', 'X']),
      4,
      4,
      4
    )
  ).toEqual([3, 6, 9, 12]);
});
