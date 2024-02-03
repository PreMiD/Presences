import type { Actual, Presence, PresenceConfig, SettingsObject } from "../index.js";

export function defineSettings<Config extends PresenceConfig = PresenceConfig>(
	record: Actual<SettingsObject<Config>> | Record<string, unknown>,
	presence: Presence<Config>
) {
	const settings: Actual<SettingsObject<Config>> = Object.assign({}, record as never);
	//* Listen for changes
	presence.on("settingUpdate", (setting, value) => {
		if (setting in settings) settings[setting as never] = value as never;
	});

	return (): Actual<SettingsObject<Config>> => settings;
}
