import { setOutput } from "@actions/core";
import { describe, expect, test, vi } from "vitest";
import { defineOutput, parseOutput } from "../src/output.ts";
import { arrayS, booleanS, numberS, stringS } from "../src/serializer.ts";

vi.mock("@actions/core");

const init = defineOutput({
	string: {
		description: "",
		serializer: stringS,
	},
	number: {
		description: "",
		serializer: numberS,
	},
	boolean: {
		description: "",
		serializer: booleanS,
	},
	stringArray: {
		description: "",
		serializer: arrayS(stringS),
	},
	numberArray: {
		description: "",
		serializer: arrayS(numberS),
	},
	booleanArray: {
		description: "",
		serializer: arrayS(booleanS),
	},
});

describe("parseOutput", () => {
	const output = parseOutput(init);

	test("string", () => {
		expect(() => {
			output.string = "abc";
		}).not.toThrow();
		expect(output.string).toBe("abc");
		expect(setOutput).toHaveBeenCalledWith("string", "abc");
	});

	test("number", () => {
		expect(() => {
			output.number = 3.14;
		}).not.toThrow();
		expect(output.number).toBe(3.14);
		expect(setOutput).toHaveBeenCalledWith("number", "3.14");
	});

	test("boolean", () => {
		expect(() => {
			output.boolean = false;
		}).not.toThrow();
		expect(output.boolean).toBe(false);
		expect(setOutput).toHaveBeenCalledWith("boolean", "false");
	});

	test("array/string", () => {
		expect(() => {
			output.stringArray = ["abc", "xyz"];
		}).not.toThrow();
		expect(output.stringArray).toEqual(["abc", "xyz"]);
		expect(setOutput).toHaveBeenCalledWith("string-array", "abc\nxyz");
	});

	test("array/number", () => {
		expect(() => {
			output.numberArray = [3.14, 456];
		}).not.toThrow();
		expect(output.numberArray).toEqual([3.14, 456]);
		expect(setOutput).toHaveBeenCalledWith("number-array", "3.14\n456");
	});

	test("array/boolean", () => {
		expect(() => {
			output.booleanArray = [true, false];
		}).not.toThrow();
		expect(output.booleanArray).toEqual([true, false]);
		expect(setOutput).toHaveBeenCalledWith("boolean-array", "true\nfalse");
	});

	test("NaN", () => {
		expect(() => {
			output.number = Number("nan");
		}).not.toThrow();
		expect(output.number).toBe(Number.NaN);
		expect(setOutput).toHaveBeenCalledWith("number", "NaN");
	});

	test("Infinity", () => {
		expect(() => {
			output.number = Number("1e400");
		}).not.toThrow();
		expect(output.number).toBe(Number.POSITIVE_INFINITY);
		expect(setOutput).toHaveBeenCalledWith("number", "Infinity");
	});
});
