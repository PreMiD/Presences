import type { Presence } from "../classes/Presence.js";
import type { defineLogs } from "../moveToExtension/defineLogs.js";
import type { defineSettings } from "../moveToExtension/defineSettings.js";
import type { defineSettingsVisibility } from "../moveToExtension/defineSettingsVisibility.js";
import type { defineStrings } from "../moveToExtension/defineStrings.js";
import type { PresenceConfig } from "../presence.js";
import type { Awaitable } from "../utils.js";
import type { WebsiteConfig } from "../website.js";

export type WebsitePresenceCallback<Config extends PresenceConfig> = (context: WebsitePresenceContext<Config>) => Awaitable<void>;

export type WebsitePresenceContext<Config extends PresenceConfig> = Readonly<{
	presence: Presence<Config>;
	useSettings: ReturnType<typeof defineSettings<Config>>;
	useSettingsVisibility: ReturnType<typeof defineSettingsVisibility<Config>>;
	useStrings: ReturnType<typeof defineStrings<Config>>;
	useLogs: Config["website"] extends WebsiteConfig
		? Config["website"]["readLogs"] extends true
			? ReturnType<typeof defineLogs<Config>>
			: undefined
		: undefined;
	getPageVariable: <T extends Record<string, unknown>>(...variables: string[]) => Promise<T>;
	info: (message: string) => void;
	error: (message: string) => void;
	success: (message: string) => void;
}>;
