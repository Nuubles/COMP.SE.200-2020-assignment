import { strictEqual, equal, deepStrictEqual, deepEqual } from 'assert';
import { describe, it } from 'mocha';
import eq from '../src/eq.js';
import every from '../src/every.js';
import filter from '../src/filter.js';

import isArguments from '../src/isArguments';
import isArrayLike from '../src/isArrayLike';
import isArrayLikeObject from '../src/isArrayLikeObject';
import isBoolean from '../src/isBoolean';
import isBuffer from '../src/isBuffer';
import isDate from '../src/isDate';
import isEmpty from '../src/isEmpty';
import isLength from '../src/isLength';
import isObject from '../src/isObject';
import isObjectLike from '../src/isObjectLike';
import isSymbol from '../src/isSymbol';
import isTypedArray from '../src/isTypedArray';

describe("Compare tests", function() {
    describe("#eq", function() {
		let object = {'a': 1};
		it("object, object => true", () => {
            strictEqual(eq(object, object), false);
		});
        it("{'a':1},{'a':1} => false", () => {
            strictEqual(eq({'a':1},{'a':1}), false);
		});
        it("undefined, undefined => true", () => {
            strictEqual(eq(undefined, undefined), true);
		});
        it("undefined, null => true", () => {
            strictEqual(eq(undefined, null), true);
		});
        it("NaN, NaN => true", () => {
            strictEqual(eq(NaN, NaN), true);
		});
        it("NaNm, Infinity => false", () => {
            strictEqual(eq(NaN, Infinity), false);
		});
        it("NaN, 0 => false", () => {
            strictEqual(eq(NaN, 0), false);
		});
        it("+0, -0 => true", () => {
            strictEqual(eq(+0,-0), true);
		});
        it("-0, +0 => true", () => {
            strictEqual(eq(-0,+0), true);
		});
        it("-0, -0 => true", () => {
            strictEqual(eq(-0, -0), true);
		});
        it("1, 5 => false", () => {
            strictEqual(eq(1, 5), false);
		});
        it("'a', 'b' => false", () => {
            strictEqual(eq("a", "b"), false);
		});
        it("true, false => false", () => {
            strictEqual(eq(true, false), false);
		});
        it("false, false => true", () => {
            strictEqual(eq(false, false), true);
		});
        it("Symbol, Symbol => true", () => {
            strictEqual(eq(Symbol, Symbol), true);
		});
	});
    describe("#every", function() {
        it("[true, true], value => value => true", () => {
            strictEqual(every([true, true], value => value), true);
		});
        it("[true, false], value => value => false", () => {
            strictEqual(every([true, false], value => value), false);
		});
        it("[], value => value => true", () => {
            strictEqual(every([], value => value), true);
		});
        it("undefined, value => value => true", () => {
            strictEqual(every(undefined, value => value), true);
		});
        it("[false, false], value => value => false", () => {
            strictEqual(every([false, false], value => value), false);
		});
	});
    describe("#filter", function() {
        it("[1,2,3,4], value => value > 2 => [3,4]", () => {
            deepStrictEqual(filter([1,2,3,4], value => value > 2), [3,4]);
		});
        it("[1,2,3,4], value => undefined => []", () => {
            deepStrictEqual(filter([1,2,3,4], value => undefined), []);
		});
        it("undefined, value => value > 2 => []", () => {
            deepStrictEqual(filter(undefined, value => value > 2), []);
		});
	});

    describe("#isArguments", function() {
        it("() => arguments => true", () => {
            strictEqual(isArguments(function() {return arguments;}()), true);
		});
        it("() => true => false", () => {
            strictEqual(isArguments(() => true), false);
		});
        it("true => false", () => {
            strictEqual(isArguments(true), false);
		});
        it("undefined => false", () => {
            strictEqual(isArguments(undefined), false);
		});
        it("[1,2,3] => false", () => {
            strictEqual(isArguments([1,2,3]), false);
		});
	});
    describe("#isArrayLike", function() {
        it("[1,2,3] => true", () => {
            strictEqual(isArrayLike([1,2,3]), true);
		});
        it("'abc' => true", () => {
            strictEqual(isArrayLike('abc'), true);
		});
        it("() => true => false", () => {
            strictEqual(isArrayLike(() => true), false);
		});
        it("undefined => false", () => {
            strictEqual(isArrayLike(undefined), false);
		});
        it("{} => false", () => {
            strictEqual(isArrayLike({}), false);
		});
        it("{'a': 1, 'b': 1} => false", () => {
            strictEqual(isArrayLike({'a': 1, 'b': 1}), false);
		});
	});
    describe("#isArrayLikeObject", function() {
        it("[1,2,3] => true", () => {
            strictEqual(isArrayLikeObject([1,2,3]), true);
		});
        it("'abc' => false", () => {
            strictEqual(isArrayLikeObject('abc'), false);
		});
        it("() => true => false", () => {
            strictEqual(isArrayLikeObject(() => true), false);
		});
        it("undefined => false", () => {
            strictEqual(isArrayLikeObject(undefined), false);
		});
        it("{} => false", () => {
            strictEqual(isArrayLikeObject({}), false);
		});
        it("{'a': 1, 'b': 1} => false", () => {
            strictEqual(isArrayLikeObject({'a': 1, 'b': 1}), false);
		});
	});
    describe("#isBoolean", function() {
        it("true => true", () => {
            strictEqual(isBoolean(true), true);
		});
        it("false => true", () => {
            strictEqual(isBoolean(false), true);
		});
        it("'true' => false", () => {
            strictEqual(isBoolean("true"), false);
		});
        it("new Boolean(false) => true", () => {
            strictEqual(isBoolean(new Boolean(false)), true);
		});
        it("1 => false", () => {
            strictEqual(isBoolean(1), false);
		});
        it("[true] => false", () => {
            strictEqual(isBoolean([true]), false);
		});
        it("undefined => false", () => {
            strictEqual(isBoolean(undefined), false);
		});
	});
    describe("#isBuffer", function() {
        it("new Buffer(2) => true", () => {
            strictEqual(isBuffer(new Buffer(2)), true);
		});
        it("new Uint8Array(2) => false", () => {
            strictEqual(isBuffer(new Uint8Array(2)), false);
		});
        it("'äbc' => false", () => {
            strictEqual(isBuffer("abc"), false);
		});
        it("1 => false", () => {
            strictEqual(isBuffer(1), false);
		});
        it("[1,2,3] => false", () => {
            strictEqual(isBuffer([1,2,3]), false);
		});
        it("undefined => false", () => {
            strictEqual(isBuffer(undefined), false);
		});
        it("true => false", () => {
            strictEqual(isBuffer(true), false);
		});
        it("() => true => false", () => {
            strictEqual(isBuffer(() => true), false);
		});
        it("{} => false", () => {
            strictEqual(isBuffer({}), false);
		});
	});
    describe("#isDate", function() {
        it(" => ", () => {
            strictEqual(isDate(new Date()), true);
		});
        it("undefined => false", () => {
            strictEqual(isDate(undefined), false);
		});
        it("'1234567890' => false", () => {
            strictEqual(isDate("1234567890"), false);
		});
        it("'Mon April 23 2013' => false", () => {
            strictEqual(isDate("Mon April 23 2013"), false);
		});
	});
    describe("#isEmpty", function() {
        it("[1] => false", () => {
            strictEqual(isEmpty([1]), false);
		});
		it("new Set() => false", () => {
            strictEqual(isEmpty(new Set()), true);
		});
		it("new Set(1) => false", () => {
            strictEqual(isEmpty(new Set().add(1)), false);
		});
        it("{'a': 1} => false", () => {
            strictEqual(isEmpty({'a': 1}), false);
		});
        it("'A' => false", () => {
            strictEqual(isEmpty("A"), false);
		});
        it("[] => true", () => {
            strictEqual(isEmpty([]), true);
		});
        it("{} => true", () => {
            strictEqual(isEmpty({}), true);
		});
        it("1 => true", () => {
            strictEqual(isEmpty(1), true);
		});
        it("undefined => true", () => {
            strictEqual(isEmpty(undefined), true);
		});
        it("true => true", () => {
            strictEqual(isEmpty(true), true);
		});
	});
    describe("#isLength", function() {
        it("0 => true", () => {
            strictEqual(isLength(0), true);
		});
        it("1 => true", () => {
            strictEqual(isLength(1), true);
		});
        it("-1 => false", () => {
            strictEqual(isLength(-1), false);
		});
        it("Infinity => false", () => {
            strictEqual(isLength(Infinity), false);
		});
        it("-Infinity => false", () => {
            strictEqual(isLength(-Infinity), false);
		});
        it("'0' => false", () => {
            strictEqual(isLength('0'), false);
		});
        it("undefined => false", () => {
            strictEqual(isLength(undefined), false);
		});
        it("3.7 => false", () => {
            strictEqual(isLength(3.7), false);
		});
	});
    describe("#isObject", function() {
        it("undefined => false", () => {
            strictEqual(isObject(undefined), false);
		});
        it("null => false", () => {
            strictEqual(isObject(null), false);
		});
        it("new Number(0) => true", () => {
            strictEqual(isObject(new Number(0)), true);
		});
        it("new String('') => true", () => {
            strictEqual(isObject(new String('')), true);
		});
		it("0 => false", () => {
            strictEqual(isObject(0), false);
		});
        it("'' => false", () => {
            strictEqual(isObject(''), false);
		});
        it("[] => true", () => {
            strictEqual(isObject([]), true);
		});
        it("{} => true", () => {
            strictEqual(isObject({}), true);
		});
        it("'text' => false", () => {
            strictEqual(isObject('text'), false);
		});
        it("() => {} => true", () => {
            strictEqual(isObject(() => {}), true);
		});
	});
    describe("#isSymbol", function() {
        it("Symbol.iterator => true", () => {
            strictEqual(isSymbol(Symbol.iterator), true);
		});
        it("Symbol => false", () => {
            strictEqual(isSymbol(Symbol), false);
		});
        it("{} => false", () => {
            strictEqual(isSymbol({}), false);
		});
        it("undefined => false", () => {
            strictEqual(isSymbol(undefined), false);
		});
        it("'Symbol' => false", () => {
            strictEqual(isSymbol('Symbol'), false);
		});
	});
    describe("#isTypedArray", function() {
        it("new Uint8Array() => true", () => {
            strictEqual(isTypedArray(new Uint8Array()), true);
		});
        it("new Float32Array() => true", () => {
            strictEqual(isTypedArray(new Float32Array()), true);
		});
        it("[] => false", () => {
            strictEqual(isTypedArray([]), false);
		});
        it("undefined => false", () => {
            strictEqual(isTypedArray(undefined), false);
		});
        it("{} => false", () => {
            strictEqual(isTypedArray({}), false);
		});
        it("[1,2] => false", () => {
            strictEqual(isTypedArray([1,2]), false);
		});
        it("[1,''] => false", () => {
            strictEqual(isTypedArray([1,""]), false);
		});
        it("'text' => false", () => {
            strictEqual(isTypedArray("text"), false);
		});
	});
});
