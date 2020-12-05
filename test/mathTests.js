import add from '../src/add.js';
import clamp from '../src/clamp.js';
import divide from '../src/divide.js';
import { strictEqual } from 'assert';
import { describe, it } from 'mocha';

describe("Math tests", function() {
    describe("#add()", function() {
        it("(1, 1) => 2", () => {
            strictEqual(add(1, 1), 2);
        });
        it("(1, -1) => 0", () => {
            strictEqual(add(1, -1), 0);
        });
        it("(-1, 1) => 0", () => {
            strictEqual(add(-1, 1), 0);
        });
        it("(-1, -1) => -2", () => {
            strictEqual(add(-1, -1), -2);
        });
        it("('test', undefined) => NaN", () => {
            strictEqual(add("test", undefined), NaN);
        });
        it("([], {}) => NaN", () => {
            strictEqual(add([], {}), NaN);
        });
    });
    describe("#clamp()", function() {
        it("(10, -5, 5) => 5", () => {
            strictEqual(clamp(10, -5, 5), 5);
        });
        it("(-10, -5, 5) => -5", () => {
            strictEqual(clamp(-10, -5, 5), -5);
        });
        it("(0, -5, 5) => 0", () => {
            strictEqual(clamp(0, -5, 5), 0);
        });
        it("('test', -5, 5) => NaN", () => {
            strictEqual(clamp('test', -5, 5), NaN);
        });
        it("(0, 5, -5) => 0", () => {
            strictEqual(clamp(0, 5, -5), 0);
        });
        it("(0, -5, '🙈') => 0", () => {
            strictEqual(clamp(0, -5, "🙈"), 0);
        });
    });
    describe("#divide()", function () {
        it("(1, -2) => -0.5", () => {
            strictEqual(divide(1, -2), -0.5);
        });
        it("(1, '🙈') => NaN", () => {
            strictEqual(divide(1, "🙈"), NaN);
        });
        it("('🙈', 1) => NaN", () => {
            strictEqual(divide("🙈", 1), NaN);
        });
        it("(1, 0) => NaN", () => {
            strictEqual(divide(1, 0), NaN);
        });
        it("(0, 0) => NaN", () => {
            strictEqual(divide(0, 0), NaN);
        });
    });
});
