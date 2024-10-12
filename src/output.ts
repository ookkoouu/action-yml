import { setOutput } from "@actions/core";
import { kebabCase } from "./kebab.ts";
import type { ActionOutput as OutputYaml } from "./schema.ts";
import { type OutputSerializer, stringS } from "./serializer.ts";

export interface ActionOutputOption<T> extends OutputYaml {
	serializer?: OutputSerializer<T>;
}

export type ActionOutput<T> = Record<string, ActionOutputOption<T>>;

type ParsedActionOutput<T extends ActionOutput<never>> = {
	[K in keyof T]: T[K]["serializer"] extends OutputSerializer<infer U>
		? U
		: string;
};

export function defineOutput<T extends ActionOutput<never>>(output: T): T {
	return output;
}

export function parseOutput<T extends ActionOutput<never>>(
	output: T,
): ParsedActionOutput<T> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const res = new Proxy({} as any, {
		set(target, key, newValue, _) {
			if (typeof key !== "string") return false;
			if (!Object.keys(output).includes(key)) return true;
			if (output[key]?.serializer !== undefined) {
				setOutput(kebabCase(key), output[key].serializer(newValue as never));
			} else {
				setOutput(kebabCase(key), stringS(newValue));
			}
			target[key] = newValue;
			return true;
		},
	});

	return res;
}
