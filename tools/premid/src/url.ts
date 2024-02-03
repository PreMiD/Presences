import type { AnyCallback } from "./utils.js";

export interface PresenceURLMatch {
	/**
	 * A regular expression that is used to match the url.
	 *
	 * Please note that the regular expression is matched against the full url, not just the hostname.
	 *
	 * So make sure to start the expression with `^https?:\/\/` or end it with `$`.
	 *
	 * @example /^https?:\/\/(?:www\.)?netflix\.(com|co\.kr)/
	 */
	match: RegExp;
	/**
	 * The function that is called when the url matches.
	 */
	callback: AnyCallback;
}

export interface PresenceIframeURLMatch {
	/**
	 * A regular expression that is used to match the url.
	 *
	 * Please note that the regular expression is matched against the full url, not just the hostname.
	 *
	 * So make sure to start the expression with `^https?:\/\/` or end it with `$`.
	 *
	 * @example /^https?:\/\/(?:www\.)?netflix\.(com|co\.kr)/
	 */
	match: RegExp;
	/**
	 * The function that is called when the url matches.
	 */
	callback: AnyCallback;
}
