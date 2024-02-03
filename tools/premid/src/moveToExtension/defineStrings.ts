import type { Presence } from "../classes/Presence.js";
import type { PresenceConfig } from "../presence.js";
import type { I18n, I18nStrings } from "../utils.js";

export function defineStrings<Config extends PresenceConfig = PresenceConfig>(options: {
	presence: Presence<Config>;
	locale: string;
	fetchStrings: (strings: string[], locale: string) => Promise<Record<string, string>>;
}) {
	const { presence, locale, fetchStrings } = options;
	return async <I18nString extends I18nStrings>(...stringsToFetch: I18nString[]): Promise<I18n<I18nString>> => {
		let strings: Record<string, string> = await fetchStrings(stringsToFetch, locale);

		//* Listen for changes
		presence.on("localeUpdate", newLocale => {
			void fetchStrings(stringsToFetch, newLocale).then(newStrings => {
				strings = newStrings;
			});
		});

		return {
			t: (key, ...parameters) => {
				return strings[key] + parameters.join("");
			},
		};
	};
}
