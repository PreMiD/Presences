import type { PresenceConfig } from "./presence.js";
import type { PresenceSetting, PresenceSettingsBoolean, PresenceSettingsLanguage, PresenceSettingsList, PresenceSettingsText } from "./setting.js";
import type { WebsiteConfig } from "./website.js";

export type SettingsInConfig<Config extends PresenceConfig> = Config["website"] extends WebsiteConfig
	? Config["website"]["settings"] extends PresenceSetting[]
		? Config["website"]["settings"][number]
		: never
	: never;

export type ValueOfSetting<Setting extends PresenceSetting> = Setting extends PresenceSettingsLanguage
	? string
	: Setting extends PresenceSettingsBoolean
		? boolean
		: Setting extends PresenceSettingsText
			? string
			: Setting extends PresenceSettingsList
				? string
				: never;

export type SettingsObject<Config extends PresenceConfig> = Readonly<{
	[Id in SettingsInConfig<Config>["id"]]: ValueOfSetting<SettingObjectFromId<Config, Id>>;
}>;

export type SettingObjectFromId<Config extends PresenceConfig, Id extends SettingsInConfig<Config>["id"]> = Extract<SettingsInConfig<Config>, { id: Id }>;

export type SettingIds<Config extends PresenceConfig> = SettingsInConfig<Config>["id"];

export type SettingsVisibilityObject<Config extends PresenceConfig, ValueObject extends boolean = true> = ValueObject extends true
	? Record<MergeText<keyof SettingsObject<Config>, "Visibility">, { value: boolean }>
	: Record<keyof SettingsObject<Config>, boolean>;

export type Actual<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type Awaitable<T> = T | Promise<T>;

export type I18nStrings = "string1" | "string2" | "string3" | "string4" | "string5";

export interface I18n<FetchedStrings extends I18nStrings> {
	t: (key: FetchedStrings, ...parameters: (string | number | boolean)[]) => string;
}

export type AnyCallback = (..._arguments: unknown[]) => Awaitable<void>;

export type MergeText<One extends string, Two extends string> = `${One}${Two}`;
