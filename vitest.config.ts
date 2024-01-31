import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			enabled: true,
			provider: "v8",
			reportOnFailure: true,
			reporter: ["text", "html"],
			skipFull: true,
			thresholds: {
				autoUpdate: true,
			},
		},
		isolate: false,
		passWithNoTests: true,
	},
});
