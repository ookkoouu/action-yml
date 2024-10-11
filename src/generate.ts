import { writeFileSync } from "node:fs";
import { stringify } from "yaml";
import type { ActionYml } from "./action";
import { toKebabCaseKey } from "./kebab";

function replacer(key: unknown, value: object) {
	if (key === "" || typeof value !== "object") return value;
	// filter empty object
	if (Object.keys(value).length === 0) {
		return undefined;
	}
	// kebab-nize object
	return toKebabCaseKey(value);
}

export function generateYaml(
	path: string,
	action: ActionYml<unknown, never>,
): void {
	// filter some props, kebab-nize keys
	const obj = JSON.parse(JSON.stringify(action, replacer)) as ActionYml<
		unknown,
		never
	>;

	writeFileSync(path, stringify(obj));
}
