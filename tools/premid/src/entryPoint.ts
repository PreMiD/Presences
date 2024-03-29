import { WebsitePresenceContext } from "./contexts/website.js";
import type { PresenceConfig } from "./presence.js";
import type { AnyCallback } from "./utils.js";

export function defineEntryPoint<Config extends PresenceConfig>(config: EntryPointConfig<Config>): EntryPointConfig<Config> {
	return config;
}

export type EntryPointConfig<Config extends PresenceConfig> =
	| {
			/**
			 * The setup function to be called when the url is matched.
			 */
			setup: AnyCallback<[WebsitePresenceContext<Config>]>;
			/**
			 * The teardown function to be called when the url is no longer matched.
			 */
			teardown: AnyCallback<[WebsitePresenceContext<Config>]> | AbortController;
			/**
			 * The mode of the entry point. If it's "modern", setup and teardown functions should be provided.
			 */
			mode: "modern";
	  }
	| {
			/**
			 * The main function to be called when the url is matched.
			 */
			main: AnyCallback<[WebsitePresenceContext<Config>]>;
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
