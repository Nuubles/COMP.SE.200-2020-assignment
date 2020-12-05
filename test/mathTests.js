import add from '../src/add.js';
import { strictEqual } from 'assert';

describe("Math tests", function() {
	describe("#add()", function() {
		it("[2,3] => 5", () => {
			strictEqual(add(2, 3), 5);
		});
	});
});
