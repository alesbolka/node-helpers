const { objectGet } = require('../object');

describe('test/object.test.js', function () {
  describe('Object GET', function () {
    const obj = {
      foo: 'bar',
      bar: {
        baz: [
          { x: 2 },
          { x: 3 },
        ],
        stuff: undefined,
      },
      '3.7': 4,
    };

    it('fetches a property directly from an object', function () {
      expect(objectGet(obj, 'foo')).to.equal('bar');
    });

    it('can fetch a nested property', function () {
      expect(objectGet(obj, 'bar.baz.1.x')).to.equal(3);
    });

    it('returns undefined by default when no property is found', function () {
      expect(objectGet(obj, 'foo.bar.baz.1.x')).to.equal(undefined);
    });

    it('returns provided default value if none is found', function () {
      expect(objectGet(obj, 'foo.bar.baz.1.x', 42)).to.equal(42);
    });

    it('returns provided default when value is set to undefined', function () {
      expect(objectGet(obj, 'bar.stuff', 42)).to.equal(42);
    });

    it('can handle floats', function () {
      // This should be avoided at all costs
      expect(objectGet(obj, 3.7)).to.equal(4);
    });

    it('can fetch values from an array', function () {
      expect(objectGet(['a', 'b', 'c', 'd'], 2)).to.equal('c');
    });

    it('returns the default value when key is not a string or number', function () {
      expect(objectGet(obj, [1,2,3], 2)).to.equal(2);
    });
  });
});
