export type OutputSerializer<T> = (input: T) => string;

export const stringS: OutputSerializer<string> = (input: string) => input;

export const numberS: OutputSerializer<number> = (input: number) =>
	String(input);

export const booleanS: OutputSerializer<boolean> = (input: boolean) =>
	String(input);

export function arrayS(input: string[]): string;
export function arrayS(): OutputSerializer<string[]>;
export function arrayS<T>(parser: OutputSerializer<T>): OutputSerializer<T[]>;
export function arrayS(
	parser: OutputSerializer<never> | string[] = stringS,
): OutputSerializer<never> | string {
	if (Array.isArray(parser)) {
		return parser.join("\n");
	}
	return (input: never[]) => input.map(parser ?? stringS).join("\n");
}
