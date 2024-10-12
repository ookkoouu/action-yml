import type { InputOptions } from "@actions/core";
import { describe, expect, expectTypeOf, test, vi } from "vitest";
import { parseInput } from "../src/input.ts";
import { arrayP, booleanP, numberP, stringP } from "../src/parser.ts";

vi.mock("@actions/core", () => ({
	getInput: (name: string, options?: InputOptions) => {
		const val: string = env[name.toUpperCase()] || "";
		if (options?.required && !val) {
			throw new Error(`Input required and not supplied: ${name}`);
		}
		if (options && options.trimWhitespace === false) {
			return val;
		}
		return val.trim();
	},
}));

const env: Record<string, string> = {
	STRING: "abc",
	NUMBER: "3.14",
	BOOLEAN: "false",
	"STRING-ARRAY": "abc\n123\nfalse",
	"NUMBER-ARRAY": "123\n3.14\n",
	"BOOLEAN-ARRAY": "TRUE\nFALSE\nTrue\nFalse\ntrue\nfalse",
	EMPTY: "",
};

describe("normal", () => {
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
		expect(input.string).toBe("abc");
		expectTypeOf(input.string).toEqualTypeOf<string>();
	});
	test("number", () => {
		expect(input.number).toBe(3.14);
		expectTypeOf(input.number).toEqualTypeOf<number>();
	});
	test("boolean", () => {
		expect(input.boolean).toBe(false);
		expectTypeOf(input.boolean).toEqualTypeOf<boolean>();
	});
	test("array/string", () => {
		expect(input.stringArray).toEqual(["abc", "123", "false"]);
		expectTypeOf(input.stringArray).toEqualTypeOf<string[]>();
	});
	test("array/number", () => {
		expect(input.numberArray).toEqual([123, 3.14]);
		expectTypeOf(input.numberArray).toEqualTypeOf<number[]>();
	});
	test("array/boolean", () => {
		expect(input.booleanArray).toEqual([true, false, true, false, true, false]);
		expectTypeOf(input.booleanArray).toEqualTypeOf<boolean[]>();
	});
});

describe("empty", () => {
	test("empty", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let input: any;
		expect(() => {
			input = parseInput({ empty: { description: "" } });
		}).not.toThrowError();
		expect(input.empty).toBe("");
	});
	test("default", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let input: any;
		expect(() => {
			input = parseInput({
				emptyDefault: { description: "", default: "foobar" },
			});
		}).not.toThrowError();
		expect(input.emptyDefault).toBe("foobar");
	});
	test("required", () => {
		expect(() => {
			parseInput({
				emptyRequired: { description: "", required: true },
			});
		}).toThrowError();
	});
	test("undeinfed", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let input: any;
		expect(() => {
			input = parseInput({ undef: { description: "" } });
		}).not.toThrowError();
		expect(input.undef).toBe("");
	});
});
