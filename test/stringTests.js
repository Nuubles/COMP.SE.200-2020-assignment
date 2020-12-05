import camelCase from '../src/camelCase.js';
import capitalize from '../src/capitalize.js';
import endsWith from '../src/endsWith.js';
import upperFirst from '../src/upperFirst.js';
import words from '../src/words.js';
import { strictEqual, deepStrictEqual } from 'assert';
import { describe, it } from 'mocha';

describe("String tests", function() {
    describe("#camelCase()", function() {
        it("' foo bar ' => 'fooBar'", () => {
            strictEqual(camelCase(" foo bar "), "fooBar");
        });
        it("'-foo-bar-' => 'fooBar'", () => {
            strictEqual(camelCase("-foo-bar-"), "fooBar");
        });
        it("'_foo_bar_' => 'fooBar'", () => {
            strictEqual(camelCase("_foo_bar_"), "fooBar");
        });
        it("'_- 🙈' => '🙈'", () => {
            strictEqual(camelCase("_- 🙈"), "🙈");
        });
    });

    describe("#capitalize()", function() {
        it("'test' => 'Test'", () => {
            strictEqual(capitalize("test"), "Test");
        });
        it("'TEST' => 'Test'", () => {
            strictEqual(capitalize("TEST"), "Test");
        });
        it("'1test' => '1test'", () => {
            strictEqual(capitalize("1test"), "1test");
        });
        it("'_test' => '_test'", () => {
            strictEqual(capitalize("_test"), "_test");
        });
        it("'🙈test' => '🙈test'", () => {
            strictEqual(capitalize("🙈test"), "🙈test");
        });
    });
    describe("#endsWith()", function () {
        it("('abc', 'c') => true", () => {
            strictEqual(endsWith("abc", "c"), true);
        });
        it("('abc', 'b') => false", () => {
            strictEqual(endsWith("abc", "b"), false);
        });
        it("('abc', 'b', 2) => true", () => {
            strictEqual(endsWith("abc", "b", 2), true);
        });
        it("('a🙈c', '🙈', 2) => true", () => {
            strictEqual(endsWith("a🙈c", "🙈", 2), true);
        });
        it("('abc', 'c', 5) => true", () => {
            strictEqual(endsWith("abc", "c", 5), true);
        });
        it("('abc', 'c', -1) => false", () => {
            strictEqual(endsWith("abc", "c", -1), false);
            // test added
        });
    });
    describe("#words()", function() {
        // omit test 1: function expects param1 to be string
        it("('Text text', undefined) => ['Text', 'text']", () => {
            deepStrictEqual(words("Text text", undefined), ["Text", "text"]);
        });
        it("('A9 _ AA', /[A-Z]+/g) => ['A', 'AA']", () => {
            deepStrictEqual(words("A9 _ AA", /[A-Z]+/g), ["A", "AA"]);
            // pattern changed from test doc
        });
        it("('AA 🙈 AA9', undefined) => ['AA', '🙈', 'AA9']", () => {
            deepStrictEqual(words("AA 🙈 AA9", undefined), ["AA", "🙈", "AA9"]);
        });
        // omit test 5: is same as test 3
        // omit test 6 and 7 for same reason as 1
        it("('', /[A-Z]+/g) => []", () => {
            deepStrictEqual(words("", /[A-Z]+/g), []);
            // test added
        });
        it("('', undefined) => []", () => {
            deepStrictEqual(words("", undefined), []);
            // test added
        });
    });
});
