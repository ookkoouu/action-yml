import { describe, expect, test } from "vitest";
import * as parsers from "../src/parser.ts";

const data: {
	name: string;
	input: string;
	expected: unknown;
	parser: parsers.InputParser<unknown>;
}[] = [
	{
		name: "string",
		input: "abc",
		expected: "abc",
		parser: parsers.stringP,
	},
	{
		name: "number",
		input: "3.14",
		expected: 3.14,
		parser: parsers.numberP,
	},
	{
		name: "int",
		input: "123",
		expected: 123,
		parser: parsers.intP,
	},
	{
		name: "bool/true",
		input: "TRUE",
		expected: true,
		parser: parsers.booleanP,
	},
	{
		name: "bool/false",
		input: "False",
		expected: false,
		parser: parsers.booleanP,
	},
	{
		name: "array",
		input: `
		abc
		3.14
		false
		`,
		expected: ["abc", "3.14", "false"],
		parser: parsers.arrayP,
	},
	{
		name: "array/string",
		input: `
		abc
		3.14
		false
		`,
		expected: ["abc", "3.14", "false"],
		parser: parsers.arrayP(parsers.stringP),
	},
	{
		name: "array/number",
		input: `
		123
		3.14
		`,
		expected: [123, 3.14],
		parser: parsers.arrayP(parsers.numberP),
	},
	{
		name: "array/boolean",
		input: `
		true
		True
		TRUE
		false
		False
		FALSE
		`,
		expected: [true, true, true, false, false, false],
		parser: parsers.arrayP(parsers.booleanP),
	},
];

describe("parser", () => {
	for (const d of data) {
		test(d.name, () => {
			expect(d.parser(d.input)).toEqual(d.expected);
		});
	}

	test("invalid boolean", () => {
		expect(() => parsers.booleanP("invalid")).toThrow();
	});

	test("NaN number", () => {
		expect(() => parsers.numberP("invalid")).toThrow();
	});

	test("infinity number", () => {
		expect(() => parsers.numberP("1e400")).toThrow();
	});
});
