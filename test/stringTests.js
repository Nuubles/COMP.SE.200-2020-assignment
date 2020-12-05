import camelCase from '../src/camelCase.js';
import capitalize from '../src/capitalize.js';
import words from '../src/words.js';
import { strictEqual } from 'assert';
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
    describe("#words()", function() {
        it("(undefined, undefined) => []", () => {
            strictEqual(words(undefined, undefined), []);
            // tätä ei ehkä oo järkee testata kun funktio olettaa parametriksi
            // stringin
        });
    });
});
