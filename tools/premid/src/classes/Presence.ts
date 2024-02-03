/* eslint-disable one-var */
import { EventEmitter } from "eventemitter3";

import type { PresenceConfig } from "../presence.js";
import type { PresenceData } from "../presenceData.js";
import { Awaitable, SettingObjectFromId, SettingsInConfig, ValueOfSetting } from "../utils.js";

export interface Presence<Config extends PresenceConfig> extends EventEmitter<PresenceEvents<Config>> {
	presenceData: PresenceData;
	browsingTimestamp: number;
	set<Key extends keyof PresenceData>(key: Key, value: PresenceData[Key]): this;
	unset<Key extends keyof PresenceData>(...keys: Key[]): this;
	unsetAll(): this;
	setActivity(activity?: PresenceData): this;
	clearActivity(): this;
}

export interface PresenceEvents<Config extends PresenceConfig> {
	settingUpdate: <Id extends SettingsInConfig<Config>["id"] = SettingsInConfig<Config>["id"]>(
		setting: Id,
		value: ValueOfSetting<SettingObjectFromId<Config, Id>>
	) => Awaitable<void>;
	localeUpdate: (locale: string) => Awaitable<void>;
	updateData: () => Awaitable<void>;
}
