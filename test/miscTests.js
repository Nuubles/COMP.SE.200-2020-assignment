import countBy from '../src/countBy.js';
import defaultTo from '../src/defaultTo.js';
import defaultToAny from '../src/defaultToAny.js';
import get from '../src/get.js';
import memoize from '../src/memoize.js';
import { throws, strictEqual, deepStrictEqual } from 'assert';
import { describe, it } from 'mocha';

describe("Miscellaneous tests", function() {
    describe("#countBy()", function() {
        {
            let input = [
                {'a': 1, 'b': true},
                {'a': 2, 'b': true},
                {'a': 3, 'b': true}
            ];
            let expected = {'true': 3};
            it("Valid input", () => {
                deepStrictEqual(countBy(input, value => value.b), expected);
            });
        }
        {
            let input = [
                {'a': 1, 'b': true},
                undefined,
                {'a': 3, 'b': true}
            ];
            it("Input containing undefined => throws", () => {
                throws(() => countBy(input, value => value.b), Error);
            });
        }
        {
            let input = undefined;
            it("Input is undefined => throws", () => {
                throws(() => countBy(input, value => value.b), Error);
            });
        }
        {
            let input = [
                {'a': 1, 'b': true},
                {'a': 2, 'b': true},
                {'a': 3, 'b': true}
            ];
            it("Second parameter undefined => throws", () => {
                throws(() => countBy(input, undefined), Error);
            });
        }
    });
    describe("#defaultTo()", function() {
        it("(1, 10) => 1", () => {
            strictEqual(defaultTo(1, 10), 1);
        });
        it("(null, 10) => 10", () => {
            strictEqual(defaultTo(null, 10), 10);
        });
        it("(false, 10) => false", () => {
            strictEqual(defaultTo(false, 10), false);
        });
        it("(NaN, 10) => 10", () => {
            strictEqual(defaultTo(NaN, 10), 10);
        });
        it("(undefined, 10) => 10", () => {
            strictEqual(defaultTo(undefined, 10), 10);
        });
        it("('', 10) => ''", () => {
            strictEqual(defaultTo('', 10), '');
        });
    });
    describe("#defaultToAny()", function() {
        it("(null, false, NaN, undefined, '', 10) => false", () => {
            strictEqual(defaultToAny(null, false, NaN, undefined, '', 10), false);
        });
        it("(null, false, 5, NaN, undefined, '', 10) => false", () => {
            strictEqual(defaultToAny(null, false, 5, NaN, undefined, '', 10), false);
        });
        it("(null, undefined, NaN, 10) => 10", () => {
            strictEqual(defaultToAny(null, undefined, NaN, 10), 10);
            // test added
        });
        it("(null, undefined, 10) => 10", () => {
            strictEqual(defaultToAny(null, undefined, 10), 10);
            // test added
        });
    });
    describe("#get()", function() {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        it("(object, 'a[0].b.c') => 3", () => {
            strictEqual(get(object, "a[0].b.c"), 3);
        });
        it("(object, 'a[0].d.f') => undefined", () => {
            strictEqual(get(object, "a[0].d.f"), undefined);
        });
        it("(object, 'a[-1].b.c') => undefined", () => {
            strictEqual(get(object, "a[-1].b.c"), undefined);
        });
        it("(object, '🙈') => undefined", () => {
            strictEqual(get(object, "🙈"), undefined);
        });
        it("(object, 'a[0].d.f', 5) => 5", () => {
            strictEqual(get(object, "a[0].d.f", 5), 5);
            // test added
        });
        it("(object, '🙈', 5) => 5", () => {
            strictEqual(get(object, "🙈", 5), 5);
            // test added
        });
    });
    describe("#memoize()", function() {
        it("Wrapper functionality", () => {
            let object = { 'a': 1, 'b': 2 };
            const values = memoize(Object.values);
            deepStrictEqual(values(object), [1, 2]);
        });
        it("Object modified", () => {
            let object = { 'a': 1, 'b': 2 };
            const values = memoize(Object.values);
            values(object);
            object.a = 2;
            deepStrictEqual(values(object), [1, 2]);
        });
        it("Cache modified", () => {
            let object = { 'a': 1, 'b': 2 };
            const values = memoize(Object.values);
            values(object);
            values.cache.set(object, [3, 4]);
            deepStrictEqual(values(object), [3, 4]);
        });
        it("Object and cache modified", () => {
            let object = { 'a': 1, 'b': 2 };
            const values = memoize(Object.values);
            values(object);
            object.a = 2;
            values.cache.set(object, [3, 4]);
            deepStrictEqual(values(object), [3, 4]);
        });
        it("(undefined, undefined) => throws", () => {
            throws(() => memoize(undefined, undefined), Error);
        });
        it("(1, 1) => throws", () => {
            throws(() => memoize(1, 1), Error);
        });
    });
});
