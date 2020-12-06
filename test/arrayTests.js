import at from '../src/at.js';
import castArray from '../src/castArray.js';
import chunk from '../src/chunk.js';
import compact from '../src/compact.js';
import difference from '../src/difference.js';
import drop from '../src/drop.js';
import keys from '../src/keys.js';
import map from '../src/map.js';
import reduce from '../src/reduce.js';
import slice from '../src/slice.js';

import { strictEqual, equal, deepStrictEqual, deepEqual } from 'assert';
import { describe, it } from 'mocha';

describe("Array tests", function() {
    describe("#at", function() {
		const object = {
			'a': [
				{
					'b': {
						'c': 3
					}
				}
			]
		};

        it("['a[0].b.c'] => [3]", () => {
            deepStrictEqual(at(object, ['a[0].b.c']), [3]);
		});
		it("['a[0].b.c', 'test'] => []", () => {
            deepStrictEqual(at(object, ['a[0].b.c', 'test']), [3, undefined]);
		});
		it("['a[0].d.f'] => []", () => {
            deepStrictEqual(at(object, ['a[0].d.f']), [undefined]);
		});
		it("['a[-1].b.c'] => []", () => {
            deepStrictEqual(at(object, ['a[-1].b.c']), [undefined]);
		});
		it("['🙈'] => []", () => {
            deepStrictEqual(at(object, ['🙈']), [undefined]);
        });
    });

	describe("#castArray", function() {
        it("['1'] => ['1']", () => {
            deepStrictEqual(castArray(['1']), ['1']);
        });
        it("[] => []", () => {
            deepStrictEqual(castArray([]), []);
        });
        it("undefined => [undefined]", () => {
            deepStrictEqual(castArray(undefined), [undefined]);
        });
        it("null => [null]", () => {
            deepStrictEqual(castArray(null), [null]);
        });
        it("{} => [{}]", () => {
            deepStrictEqual(castArray({}), [{}]);
        });
    });

	describe("#chunk", function() {
        it("['a', 'b', 'c', 'd'], 2 => [['a', 'b'],['c', 'd']]", () => {
            deepStrictEqual(chunk(['a', 'b', 'c', 'd'], 2), [['a', 'b'],['c', 'd']]);
        });
        it("['a', 'b', 'c', 'd'], -2 => []", () => {
            deepStrictEqual(chunk(['a', 'b', 'c', 'd'], -2), []);
        });
        it("['a', 'b', 'c', 'd'], 'test' => []", () => {
            deepStrictEqual(chunk(['a', 'b', 'c', 'd'], 'test'), []);
        });
        it("{}, 2 => []", () => {
            deepStrictEqual(chunk({}, 2), []);
        });
        it("undefined, 2 => []", () => {
            deepStrictEqual(chunk(undefined, 2), []);
        });
    });

	describe("#compact", function() {
        it("[undefined, null, '', false, 0, NaN, [], {}] => []", () => {
            deepStrictEqual(compact([undefined, null, '', false, 0, NaN, [], {}]), [{}, []]);
        });
    });

	describe("#difference", function() {
        it("[2,1], [2,3] => [1]", () => {
            deepStrictEqual(difference([2,1], [2,3]), [1]);
        });
        it("{}, '🙈' => 1", () => {
            deepStrictEqual(difference({}, "🙈"), []);
        });
    });

	describe("#drop", function() {
        it("[1, 2, 3] => [2, 3]", () => {
            deepStrictEqual(drop([1, 2, 3]), [2, 3]);
        });
        it("[1, 2, 3], 1 => [2, 3]", () => {
            deepStrictEqual(drop([1, 2, 3], 1), [2, 3]);
        });
        it("[1, 2, 3], 4 => []", () => {
            deepStrictEqual(drop([1, 2, 3], 4), []);
        });
        it("[1, 2, 3], -2 => [1, 2, 3]", () => {
            deepStrictEqual(drop([1, 2, 3], -2), [1, 2, 3]);
        });
        it("[1, 2, 3], '🙈' => [1, 2, 3]", () => {
            deepStrictEqual(drop([1, 2, 3], '🙈'), [1, 2, 3]);
        });
        it("[1, 2, 3], undefined => [1, 2, 3]", () => {
            deepStrictEqual(drop([1, 2, 3], undefined), [1, 2, 3]);
        });
    });

	// Omitted as described in documentation
	//describe("#keys", function() { });

	describe("#map", function() {
        it("[2,4], (n) => n*n => [4, 16]", () => {
            deepStrictEqual(map([2,4], (n) => n*n), [4, 16]);
        });
        it("undefined, (n) => n*n => []", () => {
            deepStrictEqual(map(undefined, (n) => n*n), []);
		});
        it("[2,4], undefined => undefined", () => {
            deepStrictEqual(map([2,4], undefined), undefined);
        });
        it("[], (n) => n*n => []", () => {
            deepStrictEqual(map([], (n) => n*n), []);
        });
    });

	describe("#reduce", function() {
        it("[1,2,3], (sum,n) => sum+n, 0 => 6", () => {
            deepStrictEqual(reduce([1,2,3], (sum,n) => sum+n, 0), 6);
        });
        it("[], (sum,n) => sum+n, 1 => 1", () => {
            deepStrictEqual(reduce([], (sum,n) => sum+n, 1), 1);
        });
        it("'text', (sum,n) => sum+n, 0 => '0text'", () => {
            deepStrictEqual(reduce("text", (sum,n) => sum+n, 0), "0text");
        });
        it("[1,2,3], (sum,n) => sum+n, 1 => 7", () => {
            deepStrictEqual(reduce([1,2,3], (sum,n) => sum+n, 1), 7);
        });
        it("{'a': 'b', 'c':'d'}, (sum,n) => sum+n, '' => 'bd'", () => {
            deepStrictEqual(reduce({'a': 'b', 'c':'d'}, (sum,n) => sum+n, ''), 'bd');
        });
        it("undefined, (sum,n) => sum+n, 0 => 0", () => {
            deepStrictEqual(reduce(undefined, (sum,n) => sum+n, 0), 0);
        });
        it("[1,2,3], undefined, 0 => 0", () => {
            deepStrictEqual(reduce([1,2,3], undefined, 0), 0);
        });
        it("[1,2,3], undefined, undefined => undefined", () => {
            deepStrictEqual(reduce([1,2,3], undefined, undefined), undefined);
        });
	});

    describe("#slice", function() {
        it("[1,2,3], 1, 3 => [2,3]", () => {
            deepStrictEqual(slice([1,2,3], 1, 3), [2,3]);
        });
        it("[1,2,3], 1.6, 3.2 => [2,3]", () => {
            deepStrictEqual(slice([1,2,3], 1.6, 3.2), [2,3]);
        });
        it("[1,2,3] => [1,2,3]", () => {
            deepStrictEqual(slice([1,2,3]), [1,2,3]);
        });
        it("[1,2,3], 1  => [2,3]", () => {
            deepStrictEqual(slice([1,2,3], 1), [2,3]);
        });
        it("[1,2,3], -1, 5 => [1,2,3]", () => {
            deepStrictEqual(slice([1,2,3], -1, 5), [1,2,3]);
        });
        it("undefined => undefined", () => {
            deepStrictEqual(slice(undefined), []);
        });
        it("undefined, 1, 2  => undefined", () => {
            deepStrictEqual(slice(undefined, 1, 2), []);
        });
        it("[1,2,3], NaN, NaN => undefined", () => {
            deepStrictEqual(slice([1,2,3], NaN, NaN), []);
        });
        it("[1,2,3], Infinity, Infinity => 1", () => {
            deepStrictEqual(slice([1,2,3], Infinity, Infinity), []);
        });
        it("[1,2,3], '1', '3' => [2,3]", () => {
            deepStrictEqual(slice([1,2,3], '1', '3'), [2,3]);
        });
    });
});
