import { describe, expectTypeOf, test, vi } from "vitest";
import { parseInput } from "../src/input.ts";
import { arrayP, booleanP, numberP, stringP } from "../src/parser.ts";

vi.mock("@actions/core");

describe("type", () => {
	const input = parseInput({
		string: {
			description: "",
			required: true,
		},
		number: {
			description: "",
			required: true,
			parser: numberP,
		},
		boolean: {
			description: "",
			required: true,
			parser: booleanP,
		},
		stringArray: {
			description: "",
			required: true,
			parser: arrayP(stringP),
		},
		numberArray: {
			description: "",
			required: true,
			parser: arrayP(numberP),
		},
		booleanArray: {
			description: "",
			required: true,
			parser: arrayP(booleanP),
		},
	});

	test("string", () => {
		expectTypeOf(input.string).toEqualTypeOf<string>();
	});
	test("number", () => {
		expectTypeOf(input.number).toEqualTypeOf<number>();
	});
	test("boolean", () => {
		expectTypeOf(input.boolean).toEqualTypeOf<boolean>();
	});
	test("array/string", () => {
		expectTypeOf(input.stringArray).toEqualTypeOf<string[]>();
	});
	test("array/number", () => {
		expectTypeOf(input.numberArray).toEqualTypeOf<number[]>();
	});
	test("array/boolean", () => {
		expectTypeOf(input.booleanArray).toEqualTypeOf<boolean[]>();
	});
});
