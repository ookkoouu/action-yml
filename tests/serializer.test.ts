import { describe, expect, test } from "vitest";
import * as serializer from "../src/serializer.ts";

const data: {
	name: string;
	input: unknown;
	expected: string;
	serializer: serializer.OutputSerializer<never>;
}[] = [
	{
		name: "string",
		input: "abc",
		expected: "abc",
		serializer: serializer.stringS,
	},
	{
		name: "number",
		input: 3.14,
		expected: "3.14",
		serializer: serializer.numberS,
	},
	{
		name: "bool/true",
		input: true,
		expected: "true",
		serializer: serializer.booleanS,
	},
	{
		name: "bool/false",
		input: false,
		expected: "false",
		serializer: serializer.booleanS,
	},
	{
		name: "array",
		input: ["abc", 3.14, false],
		expected: "abc\n3.14\nfalse",
		serializer: serializer.arrayS,
	},
	{
		name: "array/string",
		input: ["abc", 3.14, false],
		expected: "abc\n3.14\nfalse",
		serializer: serializer.arrayS(serializer.stringS),
	},
	{
		name: "array/number",
		input: [123, 456],
		expected: "123\n456",
		serializer: serializer.arrayS(serializer.numberS),
	},
	{
		name: "array/boolean",
		input: [true, true, true, false, false, false],
		expected: "true\ntrue\ntrue\nfalse\nfalse\nfalse",
		serializer: serializer.arrayS(serializer.booleanS),
	},
];

describe("parser", () => {
	for (const d of data) {
		// @ts-expect-error unknown -> never
		test(d.name, () => expect(d.serializer(d.input)).toEqual(d.expected));
	}
});
