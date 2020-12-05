import toFinite from '../src/toFinite.js';
import toInteger from '../src/toInteger.js';
import toNumber from '../src/toNumber.js';
import toString from '../src/toString.js';
import { strictEqual, deepStrictEqual } from 'assert';
import { describe, it } from 'mocha';

describe("Conversion tests", function() {
    describe("#toFinite()", function() {
        it("1 => 1", () => {
            strictEqual(toFinite(1), 1);
        });
        it("1.6 => 1.6", () => {
            strictEqual(toFinite(1.6), 1.6);
        });
        it("Infinity => 1.7976931348623157e+308", () => {
            strictEqual(toFinite(Infinity), 1.7976931348623157e+308);
        });
        it("-Infinity => -1.7976931348623157e+308", () => {
            strictEqual(toFinite(-Infinity), -1.7976931348623157e+308);
        });
        it("undefined => 0", () => {
            strictEqual(toFinite(undefined), 0);
        });
        it("[1,2,3] => 0", () => {
            strictEqual(toFinite([1,2,3]), 0);
        });
        it("[] => 0", () => {
            strictEqual(toFinite([]), 0);
        });
        it("'1.6' => 1.6", () => {
            strictEqual(toFinite("1.6"), 1.6);
        });
        it("NaN => 0", () => {
            strictEqual(toFinite(NaN), 0);
        });
    });
    describe("#toInteger()", function() {
        it("1 => 1", () => {
            strictEqual(toInteger(1), 1);
        });
        it("1.6 => 1", () => {
            strictEqual(toInteger(1.6), 1);
        });
        it("undefined => 0", () => {
            strictEqual(toInteger(undefined), 0);
        });
        it("Infinity => 1.7976931348623157e+308", () => {
            strictEqual(toInteger(Infinity), 1.7976931348623157e+308);
        });
        it("-Infinity => -1.7976931348623157e+308", () => {
            strictEqual(toInteger(-Infinity), -1.7976931348623157e+308);
        });
        it("[1,2,3] => 0", () => {
            strictEqual(toInteger([1,2,3]), 0);
        });
        it("[] => 0", () => {
            strictEqual(toInteger([]), 0);
        });
        it("'15' => 15", () => {
            strictEqual(toInteger("15"), 15);
        });
        it("NaN => 0", () => {
            strictEqual(toInteger(NaN), 0);
        });
    });
    describe("#toNumber()", function() {
        it("1 => 1", () => {
            strictEqual(toNumber(1), 1);
        });
        it("1.6 => 1.6", () => {
            strictEqual(toNumber(1.6), 1.6);
        });
        it("undefined => NaN", () => {
            strictEqual(toNumber(undefined), NaN);
        });
        it("NaN => NaN", () => {
            strictEqual(toNumber(NaN), NaN);
        });
        it("'' => 0", () => {
            strictEqual(toNumber(""), 0);
        });
        it("'text' => NaN", () => {
            strictEqual(toNumber("text"), NaN);
        });
        it("'5 ' => 5", () => {
            strictEqual(toNumber("5 "), 5);
        });
        it("'0x1234' => 4660", () => {
            strictEqual(toNumber("0x1234"), 4660);
        });
        it("'0x123FG' => NaN", () => {
            strictEqual(toNumber("0x123FG"), NaN);
        });
        it("'0b111' => 7", () => {
            strictEqual(toNumber("0b111"), 7);
        });
        it("'0o07' => 7", () => {
            strictEqual(toNumber("0o07"), 7);
        });
        it("Infinity => Infinity", () => {
            strictEqual(toNumber(Infinity), Infinity);
        });
        it("-Infinity => -Infinity", () => {
            strictEqual(toNumber(-Infinity), -Infinity);
        });
        it("[1,2,3] => NaN", () => {
            strictEqual(toNumber([1,2,3]), NaN);
        });
        it("[] => 0", () => {
            strictEqual(toNumber([]), 0);
        });
    });
    describe("#toString()", function() {
        it("'text' => 'text'", () => {
            strictEqual(toString("text"), "text");
        });
        it("undefined => 'undefined'", () => {
            strictEqual(toString(undefined), "undefined");
        });
        it("0 => '0'", () => {
            strictEqual(toString(0), "0");
        });
        it("-0 => '-0'", () => {
            strictEqual(toString(-0), "-0");
        });
        it("1 => '1'", () => {
            strictEqual(toString(1), "1");
        });
        it("-1 => '-1'", () => {
            strictEqual(toString(-1), "-1");
        });
        it("'🙈' => '🙈'", () => {
            strictEqual(toString("🙈"), "🙈");
        });
        it("['0', 1, '2'] => '012'", () => {
            strictEqual(toString(["0", 1, "2"]), "0,1,2");
        });
        it("Infinity => 'Infinity'", () => {
            strictEqual(toString(Infinity), "Infinity");
        });
        it("-Infinity => '-Infinity'", () => {
            strictEqual(toString(-Infinity), "-Infinity");
        });
        it("Map() => '[object Map]'", () => {
            strictEqual(toString(new Map()), "[object Map]");
        });
    });
});
