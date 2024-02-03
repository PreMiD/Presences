import type { PresenceSetting } from "./setting.js";
import type { PresenceIframeURLMatch, PresenceURLMatch } from "./url.js";

export interface WebsiteConfig {
	/**
	 * A url that is displayable to the user.
	 *
	 * If the website has multiple urls, you can pass an array of urls.
	 *
	 * (Useful for websites that have different urls in different countries, e.g. `netflix.com` and `netflix.co.kr`).
	 *
	 * @example "netflix.com"
	 * @example ["netflix.com", "netflix.co.kr"]
	 */
	displayUrl: string | [string, ...string[]];
	/**
	 * An Presence URL match object that matches the website's URL.
	 *
	 * If the website has multiple URLs, you can pass an array of PresenceURLMatch objects.
	 *
	 * (Useful for websites that have different URLs in different countries, e.g. `netflix.com` and `netflix.co.kr`).
	 */
	url: PresenceURLMatch | [PresenceURLMatch, ...PresenceURLMatch[]];
	/**
	 * An Presence Iframe URL match object that matches the website's iframe URL.
	 *
	 * If the website has multiple iframe URLs, you can pass an array of PresenceIframeURLMatch objects.
	 */
	iframe?: PresenceIframeURLMatch | [PresenceIframeURLMatch, ...PresenceIframeURLMatch[]];
	/**
	 * Whether the presence needs to read console logs/warnings/errors.
	 *
	 * If this is set to `true`, the `getLogs` function will be available to use.
	 *
	 * @default false
	 */
	readLogs?: true;
	/**
	 * The presence's settings.
	 */
	settings?: [PresenceSetting, ...PresenceSetting[]];
}
