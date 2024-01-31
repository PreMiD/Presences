export interface WebsiteConfig {
	/**
	 *
	 */
	// url: PresenceURLMatch | [PresenceURLMatch, ...PresenceURLMatch[]];
	/**
	 */
	// iframe?: PresenceIframeURLMatch | [PresenceIframeURLMatch, ...PresenceIframeURLMatch[]];
	/**
	 * Whether the presence needs to read console logs/warnings/errors.
	 *
	 * If this is set to `true`, the `getLogs` function will be available to use.
	 *
	 * @default false
	 */
	readLogs?: boolean;
	/**
	 * The presence's settings.
	 */
	// settings?: [PresenceSetting, ...PresenceSetting[]];
}
