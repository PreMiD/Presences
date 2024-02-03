import type { AnyCallback } from "./utils.js";

export function defineEntryPoint(config: EntryPointConfig): EntryPointConfig {
	return config;
}

export type EntryPointConfig =
	| {
			/**
			 * The setup function to be called when the url is matched.
			 */
			setup: AnyCallback;
			/**
			 * The teardown function to be called when the url is no longer matched.
			 */
			teardown: AnyCallback;
			/**
			 * The mode of the entry point. If it's "modern", setup and teardown functions should be provided.
			 */
			mode: "modern";
	  }
	| {
			/**
			 * The main function to be called when the url is matched.
			 */
			main: AnyCallback;
			/**
			 * The mode of the entry point. If it's "classic", a main function should be provided.
			 */
			mode: "classic";
			/**
			 * The interval in milliseconds at which the main function should be called.
			 *
			 * @default 100
			 */
			interval?: number;
	  };

export type EntryPoint = `${string}.ts`;
