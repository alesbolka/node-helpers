const { chunk } = require('../array');
describe('test/array.test.js', function () {
  describe('chunk', function () {
    const arr = [];
    for (let ii = 0; ii < 20; ii++) {
      arr.push(ii);
    }

    it('can split an array on an exact match', function () {
      expect(chunk(arr, 5)).to.deep.equal([
        [ 0, 1, 2, 3, 4 ],
        [ 5, 6, 7, 8, 9 ],
        [ 10, 11, 12, 13, 14 ],
        [ 15, 16, 17, 18, 19 ],
      ]);
    });

    it('can split an array with an uneven distribution', function () {
      expect(chunk(arr, 7)).to.deep.equal([
        [ 0, 1, 2, 3, 4, 5, 6 ],
        [ 7, 8, 9, 10, 11, 12, 13 ],
        [ 14, 15, 16, 17, 18, 19 ],
      ]);
    });

    it('can split an array when there aren\'t enough elements', function () {
      expect(chunk(arr, 30)).to.deep.equal([ arr ]);
    });

  });
});
