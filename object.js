/**
 * Fetches a nested value from a value. Returns third value when the nested
 * property does not exist
 *
 * @param {any}           obj The value to search the nested property in
 * @param {string|number} key A string of dot separated keys or a
 *                            number
 * @param {any}           def Default value to be returned if nested property
 *                            does not exist
 *
 * @returns {any}
 */
function objectGet (obj, key, def) {
  if (typeof key !== 'string' && typeof key !== 'number') {
    return def;
  }

  const parts = typeof key === 'string' ? key.split('.') : [key];
  let val = obj;
  for (const part of parts) {
    if (typeof val === 'undefined' || val === null) {
      return def;
    }
    val = val[part];
  }

  return typeof val === 'undefined' ? def : val;
};

module.exports = {
  objectGet,
};
