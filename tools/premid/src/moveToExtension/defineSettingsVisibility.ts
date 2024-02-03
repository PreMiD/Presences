import type { Presence } from "../classes/Presence.js";
import type { PresenceConfig } from "../presence.js";
import type { Actual, SettingsObject, SettingsVisibilityObject } from "../utils.js";

export function defineSettingsVisibility<Config extends PresenceConfig = PresenceConfig>(
	currentVisibility: Actual<SettingsVisibilityObject<Config, false>> | Record<string, unknown>,
	updateVisibility: (setting: keyof SettingsObject<Config>, value: boolean) => boolean,
	presence: Presence<Config>
) {
	const visibility: Actual<SettingsVisibilityObject<Config, false>> = Object.assign({}, currentVisibility as never);

	//* Listen for changes
	presence.on("settingVisibilityUpdate", (setting, value) => {
		if (setting in visibility) visibility[setting as never] = value as never;
	});

	return (): Actual<SettingsVisibilityObject<Config>> => {
		//* Make the keys getters and setters
		const returnObject = Object.create(null) as Actual<SettingsVisibilityObject<Config>>;
		for (const key in visibility) {
			Object.defineProperty(returnObject, `${key}Visibility`, {
				get value() {
					return visibility[key] as never;
				},
				set value(value: boolean) {
					visibility[key] = updateVisibility(key, value) as never;
				},
			});
		}
		return returnObject;
	};
}
