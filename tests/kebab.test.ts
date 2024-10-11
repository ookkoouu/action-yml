import { expect, test } from "vitest";
import { kebabCase } from "../src/kebab";

test("kebab-case", () => {
	expect(kebabCase("foo")).toBe("foo");
	expect(kebabCase("isKebab?")).toBe("is-kebab?");
	expect(kebabCase("CamelCase")).toBe("camel-case");
	expect(kebabCase("snake_case")).toBe("snake-case");
	expect(kebabCase("ENV_VAR")).toBe("env-var");
	expect(kebabCase("hogeURLBar")).toBe("hoge-url-bar");
	expect(kebabCase("With Space")).toBe("with-space");
});
