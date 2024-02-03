import type { EntryPoint } from "./entryPoint.js";

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
	 * The filename of the entry point inside of the `src` directory.
	 */
	entry: EntryPoint;
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
	 * The filename of the entry point inside of the `src` directory.
	 */
	entry: EntryPoint;
}
