const { objectGet, objectSet } = require('../object');

describe('test/object.test.js', function () {
  describe('Object GET', function () {
    const obj = {
      foo: 'bar',
      bar: {
        baz: [{ x: 2 }, { x: 3 }],
        stuff: undefined,
      },
      3.7: 4,
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
      expect(objectGet(obj, [1, 2, 3], 2)).to.equal(2);
    });
  });

  describe('Object SET', function () {
    it('can set a first level value', function () {
      const src = {};
      expect(objectSet(src, 'foo', 2)).to.deep.equal({ foo: 2 });
      expect(src).to.deep.equal({ foo: 2 });
    });

    it('will set a nested value', function () {
      const src = {
        foo: {
          bar: 'baz',
        },
      };
      expect(objectSet(src, 'foo.bar', 2)).to.deep.equal({ foo: { bar: 2 } });
      expect(src).to.deep.equal({ foo: { bar: 2 } });
    });

    it('will set up new objects to set nested value', function () {
      const src = {
        foo: {
          bar: 'baz',
        },
      };
      const expected = { foo: { bar: 'baz' }, x: { y: { z: { a: 2 } } } };
      expect(objectSet(src, 'x.y.z.a', 2)).to.deep.equal(expected);
      expect(src).to.deep.equal(expected);
    });

    it('will throw an error when using a non-string non-number key', function () {
      expect(() => objectSet({}, [1, 2, 3], 2))
        .to.throw('Key passed to objectSet must be string or number');
    });

    it('will throw an error when obj is not an object', function () {
      expect(() => objectSet(2, 'foo.bar', 2))
        .to.throw('First argument passed to objectSet must be object or array');
    });

    it('will throw an error when obj is null', function () {
      expect(() => objectSet(null, 'foo.bar', 2))
        .to.throw('First argument passed to objectSet must be object or array');
    });

    it('is able to set a numeric key', function () {
      expect(objectSet({}, 2, 3)).to.deep.equal({ 2: 3 });
      expect(objectSet({}, 'a.2', 3)).to.deep.equal({ a: { 2: 3 } });
    });

    it('can handle pushing into a nested array', function () {
      const src = { foo: [] };
      expect(objectSet(src, 'foo.[].stuff', 3)).to.deep.equal({ foo: [{ stuff: 3 }] });
      objectSet(src, 'foo.[].bar', 2);
      expect(src).to.deep.equal({ foo: [{ stuff: 3 }, { bar: 2 }] });
      objectSet(src, 'foo.0.bar', 8);
      expect(src).to.deep.equal({ foo: [{ stuff: 3, bar: 8 }, { bar: 2 }] });
    });

    it('can handle pushing into a root array', function () {
      const src = [];
      objectSet(src, '[].foo', 1);
      objectSet(src, '[].foo', 3);
      objectSet(src, '[].foo', 2);
      expect(src).to.deep.equal([
        { foo: 1 },
        { foo: 3 },
        { foo: 2 },
      ]);
    });

    it('can handle pushing into an end array', function () {
      const src = { };
      objectSet(src, 'foo.[]', 4);
      objectSet(src, 'foo.[]', 6);
      objectSet(src, 'foo.[]', 2);
      expect(src).to.deep.equal({
        foo: [4, 6, 2],
      });
    });

    it('can handle creating a new array', function () {
      const src = { };
      objectSet(src, 'foo.[].bar', 3);
      objectSet(src, 'foo.[].bar', 1);
      objectSet(src, 'foo.[].bar', 0);
      expect(src).to.deep.equal({
        foo: [
          { bar: 3 },
          { bar: 1 },
          { bar: 0 },
        ],
      });
    });

    it('can handle double array', function () {
      const src = { };
      objectSet(src, 'foo.[].[]', 1);
      objectSet(src, 'foo.[].[]', 3);
      objectSet(src, 'foo.[].[]', 9);
      expect(src).to.deep.equal({
        foo: [[1], [3], [9]],
      });
    });
  });
});
