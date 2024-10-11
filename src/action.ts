import type { ActionInput } from "./input";
import type { ActionOutput } from "./output";
import type { ActionYml as _ActionYml } from "./schema";

export interface ActionYml<I, O> extends _ActionYml {
	inputs?: ActionInput<I>;
	outputs?: ActionOutput<O>;
}

export function defineActionYml<T extends ActionYml<unknown, never>>(
	action: T,
): T {
	return action;
}
