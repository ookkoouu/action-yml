import { describe, expectTypeOf, test, vi } from "vitest";
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
		expectTypeOf(output.string).toEqualTypeOf<string>();
	});

	test("number", () => {
		expectTypeOf(output.number).toEqualTypeOf<number>();
	});

	test("boolean", () => {
		expectTypeOf(output.boolean).toEqualTypeOf<boolean>();
	});

	test("array/string", () => {
		expectTypeOf(output.stringArray).toEqualTypeOf<string[]>();
	});

	test("array/number", () => {
		expectTypeOf(output.numberArray).toEqualTypeOf<number[]>();
	});

	test("array/boolean", () => {
		expectTypeOf(output.booleanArray).toEqualTypeOf<boolean[]>();
	});
});
