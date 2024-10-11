/**
 * Allows you to define conditions for the `pre:` action execution.
 *
 * The `pre:` action will only run if the conditions in `pre-if` are met. If not set, then `pre-if` defaults to `always()`.
 *
 * Note that the `step` context is unavailable, as no steps have run yet.
 */
type PreIf = string;
/**
 * Allows you to define conditions for the `post:` action execution.
 *
 * The `post:` action will only run if the conditions in `post-if` are met. If not set, then `post-if` defaults to `always()`.
 */
type PostIf = string;
/**
 * escape `{` and `}` in pattern to be unicode compatible (#1360)
 */
type StringContainingExpressionSyntax = string;

export interface ActionYml {
	/**
	 * The name of your action. GitHub displays the `name` in the Actions tab to help visually identify actions in each job.
	 */
	name: string;
	/**
	 * The name of the action's author.
	 */
	author?: string;
	/**
	 * A short description of the action.
	 */
	description: string;
	/**
	 * Input parameters allow you to specify data that the action expects to use during runtime.
	 *
	 * GitHub stores input parameters as environment variables.
	 *
	 * Input ids with uppercase letters are converted to lowercase during runtime. We recommended using lowercase input ids.
	 */
	inputs?: {
		/**
		 * A string identifier to associate with the input. The value of `<input_id>` is a map of the input's metadata. The `<input_id>` must be a unique identifier within the inputs object. The `<input_id>` must start with a letter or `_` and contain only alphanumeric characters, `-`, or `_`.
		 *
		 * This interface was referenced by `undefined`'s JSON-Schema definition
		 * via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".
		 */
		[k: string]: ActionInput;
	};
	outputs?: {
		[k: string]: ActionOutput;
	};
	runs: RunsJavascript | RunsComposite | RunsDocker;
	/**
	 * You can use a color and Feather icon to create a badge to personalize and distinguish your action. Badges are shown next to your action name in GitHub Marketplace.
	 */
	branding?: {
		/**
		 * The background color of the badge.
		 */
		color?:
			| "white"
			| "black"
			| "yellow"
			| "blue"
			| "green"
			| "orange"
			| "red"
			| "purple"
			| "gray-dark";
		/**
		 * The name of the Feather icon to use.
		 */
		icon?:
			| "activity"
			| "airplay"
			| "alert-circle"
			| "alert-octagon"
			| "alert-triangle"
			| "align-center"
			| "align-justify"
			| "align-left"
			| "align-right"
			| "anchor"
			| "aperture"
			| "archive"
			| "arrow-down-circle"
			| "arrow-down-left"
			| "arrow-down-right"
			| "arrow-down"
			| "arrow-left-circle"
			| "arrow-left"
			| "arrow-right-circle"
			| "arrow-right"
			| "arrow-up-circle"
			| "arrow-up-left"
			| "arrow-up-right"
			| "arrow-up"
			| "at-sign"
			| "award"
			| "bar-chart-2"
			| "bar-chart"
			| "battery-charging"
			| "battery"
			| "bell-off"
			| "bell"
			| "bluetooth"
			| "bold"
			| "book-open"
			| "book"
			| "bookmark"
			| "box"
			| "briefcase"
			| "calendar"
			| "camera-off"
			| "camera"
			| "cast"
			| "check-circle"
			| "check-square"
			| "check"
			| "chevron-down"
			| "chevron-left"
			| "chevron-right"
			| "chevron-up"
			| "chevrons-down"
			| "chevrons-left"
			| "chevrons-right"
			| "chevrons-up"
			| "circle"
			| "clipboard"
			| "clock"
			| "cloud-drizzle"
			| "cloud-lightning"
			| "cloud-off"
			| "cloud-rain"
			| "cloud-snow"
			| "cloud"
			| "code"
			| "command"
			| "compass"
			| "copy"
			| "corner-down-left"
			| "corner-down-right"
			| "corner-left-down"
			| "corner-left-up"
			| "corner-right-down"
			| "corner-right-up"
			| "corner-up-left"
			| "corner-up-right"
			| "cpu"
			| "credit-card"
			| "crop"
			| "crosshair"
			| "database"
			| "delete"
			| "disc"
			| "dollar-sign"
			| "download-cloud"
			| "download"
			| "droplet"
			| "edit-2"
			| "edit-3"
			| "edit"
			| "external-link"
			| "eye-off"
			| "eye"
			| "fast-forward"
			| "feather"
			| "file-minus"
			| "file-plus"
			| "file-text"
			| "file"
			| "film"
			| "filter"
			| "flag"
			| "folder-minus"
			| "folder-plus"
			| "folder"
			| "gift"
			| "git-branch"
			| "git-commit"
			| "git-merge"
			| "git-pull-request"
			| "globe"
			| "grid"
			| "hard-drive"
			| "hash"
			| "headphones"
			| "heart"
			| "help-circle"
			| "home"
			| "image"
			| "inbox"
			| "info"
			| "italic"
			| "layers"
			| "layout"
			| "life-buoy"
			| "link-2"
			| "link"
			| "list"
			| "loader"
			| "lock"
			| "log-in"
			| "log-out"
			| "mail"
			| "map-pin"
			| "map"
			| "maximize-2"
			| "maximize"
			| "menu"
			| "message-circle"
			| "message-square"
			| "mic-off"
			| "mic"
			| "minimize-2"
			| "minimize"
			| "minus-circle"
			| "minus-square"
			| "minus"
			| "monitor"
			| "moon"
			| "more-horizontal"
			| "more-vertical"
			| "move"
			| "music"
			| "navigation-2"
			| "navigation"
			| "octagon"
			| "package"
			| "paperclip"
			| "pause-circle"
			| "pause"
			| "percent"
			| "phone-call"
			| "phone-forwarded"
			| "phone-incoming"
			| "phone-missed"
			| "phone-off"
			| "phone-outgoing"
			| "phone"
			| "pie-chart"
			| "play-circle"
			| "play"
			| "plus-circle"
			| "plus-square"
			| "plus"
			| "pocket"
			| "power"
			| "printer"
			| "radio"
			| "refresh-ccw"
			| "refresh-cw"
			| "repeat"
			| "rewind"
			| "rotate-ccw"
			| "rotate-cw"
			| "rss"
			| "save"
			| "scissors"
			| "search"
			| "send"
			| "server"
			| "settings"
			| "share-2"
			| "share"
			| "shield-off"
			| "shield"
			| "shopping-bag"
			| "shopping-cart"
			| "shuffle"
			| "sidebar"
			| "skip-back"
			| "skip-forward"
			| "slash"
			| "sliders"
			| "smartphone"
			| "speaker"
			| "square"
			| "star"
			| "stop-circle"
			| "sun"
			| "sunrise"
			| "sunset"
			| "table"
			| "tablet"
			| "tag"
			| "target"
			| "terminal"
			| "thermometer"
			| "thumbs-down"
			| "thumbs-up"
			| "toggle-left"
			| "toggle-right"
			| "trash-2"
			| "trash"
			| "trending-down"
			| "trending-up"
			| "triangle"
			| "truck"
			| "tv"
			| "type"
			| "umbrella"
			| "underline"
			| "unlock"
			| "upload-cloud"
			| "upload"
			| "user-check"
			| "user-minus"
			| "user-plus"
			| "user-x"
			| "user"
			| "users"
			| "video-off"
			| "video"
			| "voicemail"
			| "volume-1"
			| "volume-2"
			| "volume-x"
			| "volume"
			| "watch"
			| "wifi-off"
			| "wifi"
			| "wind"
			| "x-circle"
			| "x-square"
			| "x"
			| "zap-off"
			| "zap"
			| "zoom-in"
			| "zoom-out";
	};
}
/**
 * Input parameters allow you to specify data that the action expects to use during runtime.
 *
 * GitHub stores input parameters as environment variables.
 *
 * Input ids with uppercase letters are converted to lowercase during runtime. We recommend using lowercase input ids.
 */
export interface ActionInput {
	/**
	 * A string description of the input parameter.
	 */
	description: string;
	/**
	 * A string shown to users using the deprecated input.
	 */
	deprecationMessage?: string;
	/**
	 * A boolean to indicate whether the action requires the input parameter. Set to `true` when the parameter is required.
	 */
	required?: boolean;
	/**
	 * A string representing the default value. The default value is used when an input parameter isn't specified in a workflow file.
	 */
	default?: string;
}

export interface ActionOutput {
	/**
	 * A string description of the output parameter.
	 */
	description: string;
	/**
	 * Only use for composite actions.
	 * The value that the output parameter will be mapped to. You can set this to a string or an expression with context. For example, you can use the steps context to set the value of an output to the output value of a step.
	 */
	value?: `$\{{${string}}}`;
}
/**
 * Configures the path to the action's code and the application used to execute the code.
 */
export interface RunsJavascript {
	/**
	 * The application used to execute the code specified in `main`.
	 */
	using: "node12" | "node16" | "node20";
	/**
	 * The file that contains your action code. The application specified in `using` executes this file.
	 */
	main: string;
	/**
	 * Allows you to run a script at the start of a job, before the `main:` action begins. For example, you can use `pre:` to run a prerequisite setup script. The application specified with the `using` syntax will execute this file. The `pre:` action always runs by default but you can override this using `pre-if`.
	 */
	pre?: string;
	preIf?: PreIf;
	/**
	 * Allows you to run a script at the end of a job, once the `main:` action has completed. For example, you can use `post:` to terminate certain processes or remove unneeded files. The application specified with the `using` syntax will execute this file. The `post:` action always runs by default but you can override this using `post-if`.
	 */
	post?: string;
	postIf?: PostIf;
}
/**
 * Configures the path to the composite action, and the application used to execute the code.
 */
export interface RunsComposite {
	/**
	 * To use a composite run steps action, set this to 'composite'.
	 */
	using: "composite";
	/**
	 * The run steps that you plan to run in this action.
	 */
	steps: (
		| {
				run?: string;
				shell?: string;
				if?: string;
				name?: string;
				id?: string;
				env?: string;
				workingDirectory?: string;
				with?: {
					[k: string]: string | number | boolean;
				};
		  }
		| {
				uses?: string;
				if?: string;
				name?: string;
				id?: string;
				env?: string;
				workingDirectory?: string;
				with?: {
					[k: string]: string | number | boolean;
				};
		  }
	)[];
}
/**
 * Configures the image used for the Docker action.
 */
export interface RunsDocker {
	/**
	 * You must set this value to 'docker'.
	 */
	using: "docker";
	/**
	 * The Docker image to use as the container to run the action. The value can be the Docker base image name, a local `Dockerfile` in your repository, or a public image in Docker Hub or another registry. To reference a `Dockerfile` local to your repository, use a path relative to your action metadata file. The `docker` application will execute this file.
	 */
	image: string;
	/**
	 * Specifies a key/value map of environment variables to set in the container environment.
	 */
	env?:
		| {
				[k: string]: string | number | boolean;
		  }
		| StringContainingExpressionSyntax;
	/**
	 * Overrides the Docker `ENTRYPOINT` in the `Dockerfile`, or sets it if one wasn't already specified. Use `entrypoint` when the `Dockerfile` does not specify an `ENTRYPOINT` or you want to override the `ENTRYPOINT` instruction. If you omit `entrypoint`, the commands you specify in the Docker `ENTRYPOINT` instruction will execute. The Docker `ENTRYPOINT instruction has a *shell* form and *exec* form. The Docker `ENTRYPOINT` documentation recommends using the *exec* form of the `ENTRYPOINT` instruction.
	 */
	entrypoint?: string;
	/**
	 * Allows you to run a script before the `entrypoint` action begins. For example, you can use `pre-entrypoint:` to run a prerequisite setup script. GitHub Actions uses `docker run` to launch this action, and runs the script inside a new container that uses the same base image. This means that the runtime state is different from the main `entrypoint` container, and any states you require must be accessed in either the workspace, `HOME`, or as a `STATE_` variable. The `pre-entrypoint:` action always runs by default but you can override this using `pre-if`.
	 */
	preEntrypoint?: string;
	preIf?: PreIf;
	/**
	 * Allows you to run a cleanup script once the `runs.entrypoint` action has completed. GitHub Actions uses `docker run` to launch this action. Because GitHub Actions runs the script inside a new container using the same base image, the runtime state is different from the main `entrypoint` container. You can access any state you need in either the workspace, `HOME`, or as a `STATE_` variable. The `post-entrypoint:` action always runs by default but you can override this using `post-if`.
	 */
	postEntrypoint?: string;
	postIf?: PostIf;
	/**
	 * An array of strings that define the inputs for a Docker container. Inputs can include hardcoded strings. GitHub passes the `args` to the container's `ENTRYPOINT` when the container starts up.
	 * The `args` are used in place of the `CMD` instruction in a `Dockerfile`. If you use `CMD` in your `Dockerfile`, use the guidelines ordered by preference:
	 * - Document required arguments in the action's README and omit them from the `CMD` instruction.
	 * - Use defaults that allow using the action without specifying any `args`.
	 * - If the action exposes a `--help` flag, or something similar, use that to make your action self-documenting.
	 */
	args?: string[];
}
