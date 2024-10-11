const SplitReg = /(?<=\p{Ll}|^)\p{Lu}|(?<=\p{Lu})\p{Lu}(?=\p{Ll})/gu;
const SepReg = /[_\s]/gu;

export function kebabCase(str: string) {
	const res = str
		.replaceAll(SplitReg, (match) => `-${match}`)
		.replaceAll(SepReg, "-")
		.toLowerCase();
	return res.startsWith("-") ? res.slice(1) : res;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function toKebabCaseKey(obj: any): any {
	return Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [kebabCase(k), v]),
	);
}
