import type { Presence } from "../classes/Presence.js";
import { defineSettings } from "../moveToExtension/defineSettings.js";
import { defineStrings } from "../moveToExtension/defineStrings.js";
import type { PresenceConfig } from "../presence.js";
import type { Awaitable } from "../utils.js";

export type WebsitePresenceCallback<Config extends PresenceConfig> = (context: WebsitePresenceContext<Config>) => Awaitable<void>;

export type WebsitePresenceContext<Config extends PresenceConfig> = Readonly<{
	useSettings: ReturnType<typeof defineSettings<Config>>;
	useStrings: ReturnType<typeof defineStrings<Config>>;
	presence: Presence<Config>;
}>;
