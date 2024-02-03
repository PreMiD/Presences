import type { FontAwesomeIcon } from "@presences/types";

export type PresenceSetting = PresenceSettingsLanguage | PresenceSettingsBoolean | PresenceSettingsText | PresenceSettingsList;

export interface PresenceSettingsBase {
	/**
	 * Identifier of the setting, used to obtain its value through presence.getSetting()
	 *
	 * Must be unique.
	 */
	id: string;
	/**
	 * `if` condition(s) for the setting.
	 *
	 * If the condition(s) are not met, the setting will not be shown.
	 */
	if?: [PresenceSettingsIfCondition, ...PresenceSettingsIfCondition[]];
}

export interface PresenceSettingsIfCondition {
	/**
	 * The `id` of the setting to check.
	 */
	setting: string;
	/**
	 * The operator to use.
	 */
	operator: "==" | "!=";
	/**
	 * The value to check against.
	 */
	value: string | boolean;
}

export interface PresenceSettingsMeta {
	/**
	 * The title of the setting.
	 */
	title: string;
	/**
	 * The description of the setting. (English only, translations are done in Crowdin)
	 */
	description: string;
	/**
	 * A [Font Awesome](https://fontawesome.com/) icon for the setting.
	 */
	icon: FontAwesomeIcon;
}

export interface PresenceSettingsLanguage extends PresenceSettingsBase {
	/**
	 * The type of the setting.
	 */
	type: "language";
	/**
	 * `true`: use this if you are only going to use strings from the [`general.json`](https://github.com/PreMiD/Localization/blob/main/src/Presence/general.json) file and the `<service>.json` file of the service.
	 *
	 * `string`: name of the file, excluding the extension (.json), inside the [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence) (excluding the `general.json` file, since it's always loaded). Only common languages of all the files will be listed.
	 *
	 * `string[]`: if you are using more than one file, from inside of the [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence), you can specify all the values in an array (excluding the `general.json` file, since it's always loaded). Only common languages of all the files will be listed.
	 *
	 * @example `true`
	 * @example `netflix`
	 * @example `['netflix', 'youtube']`
	 */
	languageFiles: true | string | [string, ...string[]];
}

export interface PresenceSettingsBoolean extends PresenceSettingsBase, PresenceSettingsMeta {
	/**
	 * The type of the setting.
	 */
	type: "boolean";
	/**
	 * The default value of the setting.
	 */
	default: boolean;
}

export interface PresenceSettingsText extends PresenceSettingsBase, PresenceSettingsMeta {
	/**
	 * The type of the setting.
	 */
	type: "text";
	/**
	 * The default value of the setting.
	 */
	default: string;
	/**
	 * A placeholder text for when the setting is empty.
	 */
	placeholder: string;
}

export interface PresenceSettingsList extends PresenceSettingsBase, PresenceSettingsMeta {
	/**
	 * The type of the setting.
	 */
	type: "list";
	/**
	 * The default value of the setting.
	 */
	default: string;
	/**
	 * The options of the setting.
	 */
	options: [PresenceSettingsListOption, ...PresenceSettingsListOption[]];
}

export interface PresenceSettingsListOption {
	/**
	 * The text of the option.
	 */
	text: string;
	/**
	 * The description of the option. (English only, translations are done in Crowdin)
	 */
	description: string;
	/**
	 * The value of the option (what is returned when the option is selected).
	 */
	value: string;
}
