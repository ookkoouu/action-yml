export type InputParser<T> = (input: string) => T;

export const stringP: InputParser<string> = (input: string) => input.trim();

export const numberP: InputParser<number> = (input: string) => {
	const num = Number(input);
	if (Number.isNaN(num)) throw new Error(`Input got NaN value ${input}`);
	if (!Number.isFinite(num))
		throw new Error(`Input got infinity value ${input}`);
	if (Math.abs(num) > Number.MAX_SAFE_INTEGER) {
		import("@actions/core").then((core) => {
			core.warning(`Inputed value "${input}" is unsafe number.`);
		});
	}
	return num;
};

export const intP: InputParser<number> = (input: string) =>
	numberP(`${Number.parseInt(input)}`);

export const booleanP: InputParser<boolean> = (input: string) => {
	const truthy = ["true", "True", "TRUE"];
	const falsy = ["false", "False", "FALSE"];
	if (truthy.includes(input)) return true;
	if (falsy.includes(input)) return false;
	throw new Error(`Unsupported boolean value ${input}`);
};

export function arrayP(input: string): string[];
export function arrayP(): InputParser<string[]>;
export function arrayP<T>(parser: InputParser<T>): InputParser<T[]>;
export function arrayP(
	parser: InputParser<unknown> | string = stringP,
): InputParser<unknown> | string[] {
	if (typeof parser === "string") {
		return stringP(parser).split("\n").map(stringP);
	}
	return (input: string) => stringP(input).split("\n").map(stringP).map(parser);
}
