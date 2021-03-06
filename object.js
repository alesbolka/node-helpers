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

/**
 * Set a nested value in an object
 * Supports pushing a new value into an array by using "[]" as the key
 *
 * @param {Object}        obj
 * @param {string|number} key
 * @param {any}           value
 *
 * @returns {Object}
 */
function objectSet (obj, key, value) {
  if (typeof key !== 'string' && typeof key !== 'number') {
    const err = new Error('Key passed to objectSet must be string or number');
    err.key = key;
    throw err;
  }

  if (!obj || typeof obj !== 'object') {
    const err = new Error('First argument passed to objectSet must be object or array');
    err.obj = obj;
    throw err;
  }

  const parts = typeof key === 'string' ? key.split('.') : [key];

  let val = obj;
  const last = parts.pop();

  for (let ii = 0; ii < parts.length; ii++) {
    const part = parts[ii];
    let nextIsArray = parts[ii + 1] === '[]';

    if (ii + 1 >= parts.length) {
      nextIsArray = last === '[]';
    }

    if (part === '[]') {
      const next = nextIsArray ? [] : {};
      val.push(next);
      val = next;
      continue;
    }

    if (typeof val[part] === 'undefined') {
      val[part] = nextIsArray ? [] : {};
    }

    val = val[part];
  }

  if (last === '[]') {
    val.push(value);
    return obj;
  }

  val[last] = value;

  return obj;
}

module.exports = {
  objectGet,
  objectSet,
};
