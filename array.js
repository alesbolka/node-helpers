/**
 * Splits an array into arrays of a limited length
 *
 * @param {Array}     input
 * @param {number}    len
 * @returns {Array[]}
 */
const chunk = (input, len) => {
  let res = [];
  for (let ii = 0; ii < input.length; ii += len) {
    res.push(input.slice(ii, ii + len));
  }
  return res;
};

module.exports = {
  chunk,
};
