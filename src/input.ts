import { getInput } from "@actions/core";
import { kebabCase } from "./kebab";
import { type InputParser, stringP } from "./parser";
import type { ActionInput as InputYaml } from "./schema";

export interface ActionInputOption<T> extends InputYaml {
	parser?: InputParser<T>;
}

export type ActionInput<T> = Record<string, ActionInputOption<T>>;

type ParsedActionInput<T extends ActionInput<unknown>> = {
	[K in keyof T]: T[K]["parser"] extends InputParser<unknown>
		? ReturnType<T[K]["parser"]>
		: string;
};

export function defineInput<T extends ActionInput<unknown>>(input: T): T {
	return input;
}

export function parseInput<T extends ActionInput<unknown>>(
	input: T,
): ParsedActionInput<T> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const res = {} as any;
	for (const [name, opt] of Object.entries(input)) {
		const parser = opt.parser ?? stringP;
		let value = getInput(kebabCase(name), { required: opt.required });
		if (value === "" && opt.default) {
			value = opt.default;
		}
		res[name] = parser(value);
	}
	return Object.freeze(res) as ParsedActionInput<T>;
}
