import type { Category, Color, ImageURL, UUID } from "@presences/types";

import type { WebsiteConfig } from "./website.js";

export function definePresence<T extends PresenceConfig>(config: T): T {
	return config;
}

export interface PresenceConfig {
	/**
	 * A unique identifier for this presence.
	 */
	id: UUID;
	/**
	 * The title of the service that this presence supports.
	 *
	 * If the service has multiple names, use an array of string.
	 *
	 * (Useful for services that have different names in different countries, e.g. `['Netflix', '넷플릭스']`).
	 *
	 * The folder name and service name should also be the same, if an array is used, the first name should be used for the folder name.
	 *
	 * Want to know if a service has multiple names? Check out Wikidata! (e.g. Netflix: https://www.wikidata.org/wiki/Q907311)
	 */
	name: string | [string, ...string[]];
	/**
	 * The description of the service. (English only, translations are done in Crowdin)
	 *
	 * Please look for the official description of the service, if it exists.
	 */
	description: string;
	/**
	 * Link to service's logo.
	 *
	 * Must be a link ending with `.png`/`.jpg`/`.jpeg`/`.webp`/`.gif`.
	 */
	logo: ImageURL;
	/**
	 * Link to service's thumbnail, banner or picture of the website home page.
	 *
	 * Must be a link ending with `.png`/`.jpg`/`.jpeg`/`.webp`/`.gif`.
	 */
	thumbnail: ImageURL;
	/**
	 * The primary color of the service.
	 *
	 * Must be a HEX, RGB, RGBA, HSL or HSLA color.
	 *
	 * If the service has multiple colors, use the most prominent one.
	 */
	color: Color;
	/**
	 * The category of the service.
	 */
	category: Category;
	/**
	 * The presence's website config.
	 */
	website?: WebsiteConfig;
	/**
	 * The presence's application config.
	 */
	// application?: PresenceApplicationConfig;
}
