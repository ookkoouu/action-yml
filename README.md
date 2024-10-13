# action-yml

Define & Generate `action.yml` in TS, parse typed input with it.

# Install

```sh
npm i @okou/action-yml
```

# Example

```ts
import { defineActionYml, generateYaml, parseInput, parseOutput } from "@okou/action-yml";
import { arrayP, numberP, stringP } from "@okou/action-yml/parser";
import { arrayS, booleanS } from "@okou/action-yml/serializer";

// define action.yml
const action = defineActionYml({
	name: "Your Action Name",
	description: "This is awesome.",

	inputs: {
		stringArray: {
			description: "string[]",
			required: true,
			// inter type from return type
			parser: arrayP(stringP),
		},
		number: {
			description: "number",
			required: true,
			parser: numberP,
		},
	},

	outputs: {
		booleanArray: {
			description: "boolean[]",
			// infer type from parameter type
			serializer: arrayS(booleanS),
		},
	},

	runs: {...},
	branding: {...},
});

// generate action.yml
generateYaml("action.yml", action);

// get input
const input = parseInput(action.inputs);
const strArr: string[] = input.stringArray;
const num: number = input.number;

// set output
const output = parseOutput(action.outputs);
output.booleanArray = [true, false];
```
