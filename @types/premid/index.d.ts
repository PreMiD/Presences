/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @link https://docs.premid.app/dev/presence/class#presencedata-interface
 */
interface PresenceData {
	/**
	 * Top row of the status
	 */
	details?: string;
	/**
	 * Bottom row of the status
	 */
	state?: string;
	/**
	 * Timestamp in seconds or milliseconds for the start of the activity.
	 * Including this will show time as "elapsed"
	 */
	startTimestamp?: number;
	/**
	 * Timestamp in seconds or milliseconds until the end of the activity.
	 * Including this will show time as "remaining" and it takes priority over startTimestamp
	 */
	endTimestamp?: number;
	/**
	 * Key of an image uploaded to the Rich Presence Art Assets of your Presence or a URL to an image.
	 * Will display as the large profile artwork
	 */
	largeImageKey?: string;
	/**
	 * Key of an image uploaded to the Rich Presence Art Assets of your Presence or a URL to an image.
	 * Will display as the small profile artwork
	 */
	smallImageKey?: string;
	/**
	 * Tooltip for the smallImageKey
	 */
	smallImageText?: string;
	/**
	 * Array of buttons, max 2, label is the button text, and url is the link
	 */
	buttons?: [ButtonData, ButtonData?];
}

interface ButtonData {
	/**
	 * Text for the button
	 */
	label: string;
	/**
	 * URL of button link
	 */
	url: string;
}

/**
 * Options that change the behavior of the presence
 */
interface PresenceOptions {
	/**
	 * ClientId of Discord application
	 * @link https://docs.premid.app/dev/presence/class#clientid
	 */
	clientId: string;
	/**
	 * The `UpdateData` event for both the presence and the iframe
	 * will only be fired when the page has fully loaded.
	 * @deprecated since 2.2.4
	 */
	injectOnComplete?: boolean;
	/**
	 * Empty presence data will show the application (image and name) on
	 * the user's profile.
	 * @deprecated since 2.2.4
	 */
	appMode?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

/**
 * Contains basic information about the presece
 * @link https://docs.premid.app/dev/presence/metadata
 */
interface Metadata {
	/**
	 * Should contain Object with name and id of the presence developer.
	 *
	 * Name is your Discord username without the identifier(#0000).
	 *
	 * User id can be copied from Discord by enabling developer mode and right-clicking on your profile.
	 */
	author: Contributor;
	/**
	 * Should contain an Array of Objects with each Object having the name and id of the contributor.
	 *
	 * Name is your Discord username without the identifier(#0000).
	 *
	 * User id can be copied from Discord by enabling developer mode and right-clicking on your profile.
	 */
	contributors?: Contributor[];
	/**
	 * The title of the service that this presence supports. The folder name and service name should also be the same.
	 */
	service: string;
	/**
	 * Alternative titles for the service which can be used for searching in the store.
	 *
	 * Useful for services that have different names in different countries or for services which have spaces in them, you can remove the space in the alternative name for easier searching.
	 *
	 * Note: This is **NOT** used for tags! Only for alternative names!
	 */
	altnames?: string[];
	/**
	 * Small description of the service.
	 *
	 * Your description must have key pair values which indicate the language, and the description in that specific language.
	 *
	 * Make descriptions with the languages that you know, our translators will make changes to your metadata file.
	 *
	 * Visit the link for all the language IDs.
	 * @link https://api.premid.app/v2/langFile/list
	 */
	description: Record<string, string>;
	/**
	 * URL of the service.
	 *
	 * Example: `vk.com`
	 *
	 * This url must match the url of the website as it will be used to detect wherever or not this is the website to inject the script to.
	 *
	 * This may only be used as an array when there are more than one urls.
	 *
	 * Note: Do **NOT** add `http://` or `https://` in the url or it will not work.
	 */
	url: string | string[];
	/**
	 * Version of your presence.
	 *
	 * Use Sematic Versioning; <MAJOR>.<MINOR>.<PATCH>
	 *
	 * @link https://semver.org/
	 */
	version: string;
	/**
	 * Link to service's logo.
	 *
	 * Must be an imgur link ending with .png/.jpg/.jpeg/.gif.
	 */
	logo: string;
	/**
	 * Link to service's thumbnail or picture of the website.
	 *
	 * Must end with .png/.jpg/etc.
	 */
	thumbnail: string;
	/**
	 * `#HEX` value.
	 *
	 * We recommend using a color that resembles the service the most.
	 */
	color: string;
	/**
	 * Array with tags, they will help users to search your presence on the website.
	 */
	tags: string[];
	/**
	 * A string used to represent the category the presence falls under.
	 *
	 * @link https://docs.premid.app/dev/presence/metadata#presence-categories
	 */
	category: "anime" | "games" | "music" | "socials" | "videos" | "other";
	/**
	 * Defines whether `iFrames` are used.
	 */
	iframe?: boolean;
	/**
	 * A regular expression string used to match urls.
	 * @link https://docs.premid.app/dev/presence/metadata#regular-expressions
	 */
	regExp?: string;
	/**
	 * A regular expression selector that selects iframes to inject into.
	 * @link https://docs.premid.app/dev/presence/metadata#regular-expressions
	 */
	iFrameRegExp?: string;
	/**
	 * Defines whether `getLogs()` is used.
	 */
	readLogs?: boolean;
	/**
	 * Whether to include a "add presence" button on the store. Only available for partnered presences.
	 *
	 * @private
	 */
	button?: boolean;
	/**
	 * Whether to display a warning on the presence installation page.
	 */
	warning?: boolean;
	/**
	 * An array of settings the user can change.
	 * @link https://docs.premid.app/dev/presence/metadata#presence-settings
	 */
	settings?: {
		/**
		 * Identifier of the setting, used to obtain its value through presence.getSetting()
		 */
		id: string;
		/**
		 * Needed for every setting except if you use `multiLanguage`.
		 */
		title?: string;
		/**
		 * Needed for every setting except if you use `multiLanguage`.
		 */
		icon?: string;
		/**
		 * Record of conditions that need to be matched for the setting to appear.
		 * The keys should be ids of other settings and the values should be the value they need to match.
		 */
		if?: Record<string, string | number | boolean>;
		/**
		 * The text that appears in the background of string settings when nothing is in the input.
		 */
		placeholder?: string;
		/**
		 * The default value of the setting.
		 */
		value?: string | number | boolean;
		/**
		 * An array of values to be used as choices for the setting.
		 * The returned value will be a number representing the index of the chosen option
		 */
		values?: (string | number | boolean)[];
		/**
		 * `false`: default, it disables multi-localization.
		 *
		 * `true`: use this if you are only going to use strings from the [`general.json`](https://github.com/PreMiD/Localization/blob/main/src/Presence/general.json) file.
		 *
		 * `string`: name of the file, excluding the extension (.json), inside the [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence).
		 *
		 * `string[]`: if you are using more than one file, from inside of the [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence), you can specify all the values in an array. Only common languages of all the files will be listed.
		 */
		multiLanguage?: boolean | string | string[];
	}[];
}

interface Contributor {
	/**
	 * Name of the contributor on Discord.
	 */
	name: string;
	/**
	 * Discord ID of the contributor.
	 */
	id: string;
}

/**
 * Useful tools for developing presences
 * @link https://docs.premid.app/en/dev/presence/class
 */
declare class Presence {
	metadata: Metadata;
	_events: any;
	private clientId;
	private injectOnComplete;
	private appMode;
	private trayTitle;
	private playback;
	private internalPresence;
	private port;
	private genericStyle;
	private presenceStyle;
	private encryptionKey;
	private normalizeLanguageCode;
	/**
	 * Create a new Presence
	 */
	constructor(presenceOptions: PresenceOptions);
	/**
	 * Get the current activity
	 * @link https://docs.premid.app/en/dev/presence/class#getactivity
	 * @deprecated since 2.2.4
	 */
	getActivity(): PresenceData;
	/**
	 * Sets the presence activity and sends it to the application.
	 * @param data PresenceData or Slideshow
	 * @param playback Is presence playing
	 * @link https://docs.premid.app/dev/presence/class#setactivitypresencedata-boolean
	 */
	setActivity(data?: PresenceData | Slideshow, playback?: boolean): void;
	/**
	 * Clears the activity shown in discord as well as the Tray and keybinds
	 * @link https://docs.premid.app/dev/presence/class#clearactivity
	 */
	clearActivity(): void;
	/**
	 * Sets the tray title on the Menubar in Mac OS (Mac OS only, supports ANSI colors)
	 * @param trayTitle Tray Title
	 * @link https://docs.premid.app/dev/presence/class#settraytitlestring
	 * @since 2.0-BETA3
	 * @deprecated since 2.2.3
	 */
	setTrayTitle(trayTitle?: string): void;
	/**
	 * Get translations from the extension
	 * @param strings String object with keys being the key for string, keyValue is the string value
	 * @param language Language
	 * @link https://docs.premid.app/dev/presence/class#getstringsobject
	 */
	getStrings<
		T extends {
			[K: string]: string;
		}
	>(strings: T, language?: string): Promise<T>;
	/**
	 * Get letiables from the actual site *IMPORTANT: This function can make site lagging when it has been used too many times*
	 * @param {Array} letiables Array of letiable names to get
	 * @example let pagelet = getPageletiable('pagelet') -> "letiable content"
	 * @link https://docs.premid.app/presence-development/coding/presence-class#getpageletiable-string
	 */
	getPageletiable<T>(letiable: string): Promise<T>;
	/**
	 * Returns an array of the past 100 logs, you can filter these logs with a RegExp.
	 * @param regExp Filter of the logs
	 */
	getLogs(regExp?: RegExp): Promise<any[]>;
	/**
	 * Returns extension version
	 * @param onlyNumeric version number without dots
	 * @link https://docs.premid.app/en/dev/presence/class#getextensionversionboolean
	 * @since 2.1
	 */
	getExtensionVersion(onlyNumeric?: boolean): string | number;
	/**
	 * Get a setting from the presence metadata
	 * @param setting Id of setting as defined in metadata
	 * @link https://docs.premid.app/dev/presence/class#getsettingstring
	 * @since 2.1
	 */
	getSetting<T extends string | boolean | number>(setting: string): Promise<T>;
	/**
	 * Hide a setting
	 * @param setting Id of setting / Array of setting Id's
	 * @link https://docs.premid.app/dev/presence/class#hidesettingstring
	 * @since 2.1
	 */
	hideSetting(settings: string | string[]): Promise<void>;
	/**
	 * Show a setting
	 * @param setting Id of setting / Array of setting Id's
	 * @link https://docs.premid.app/dev/presence/class#showsettingstring
	 * @since 2.1
	 */
	showSetting(settings: string | string[]): Promise<void>;
	/**
	 * Similar to `getTimestamps` but takes in a media element and returns snowflake timestamps
	 * @param media Media object
	 */
	getTimestampsfromMedia(media: HTMLMediaElement): [number, number];
	/**
	 * Converts time and duration integers into snowflake timestamps
	 * @param {Number} elementTime Current element time seconds
	 * @param {Number} elementDuration Element duration seconds
	 */
	getTimestamps(elementTime: number, elementDuration: number): [number, number];
	/**
	 * Converts a string with format `HH:MM:SS` or `MM:SS` or `SS` into an integer (Does not return snowflake timestamp)
	 * @param format The formatted string
	 */
	timestampFromFormat(format: string): number;
	/**
	 * Converts a hex string into an RGB object
	 * @param hex The hex string
	 */
	private hexToRGB(hex: `#${string}`): { r: number; g: number; b: number };
	/**
	 * Calculates the font color based on the luminosity of the background
	 * @param backgroundHex The hex string of the background
	 */
	private getFontColor(backgroundHex: string): "white" | "black";
	/**
	 * Console logs with an info message
	 * @param message The log message
	 */
	info(message: string): void;
	/**
	 * Console logs with a success message
	 * @param message The log message
	 */
	success(message: string): void;
	/**
	 * Console logs with an error message
	 * @param message The log message
	 */
	error(message: string): void;
	/**
	 * Creates a slideshow that allows for alternating between sets of
	 * presence data at specific intervals
	 */
	createSlideshow(): Slideshow;
	/**
	 * Sends data back to application
	 * @param data Data to send back to application
	 */
	private sendData(data: Record<string, unknown>): void;
	/**
	 * Generates a AES key from the app identifier
	 */
	private getEncryptionKey(): Uint8Array;
	/**
	 * Encrypts a string using AES algorithm
	 * @param data String to be encrypted
	 */
	private encryptData(data: string): string;
	/**
	 * Subscribe to events emitted by the extension
	 * @param eventName EventName to subscribe to
	 * @param callback Callback function for event
	 * @link https://docs.premid.app/dev/presence/class#events
	 */
	on<K extends keyof PresenceEvents>(
		eventName: K,
		listener: (...args: PresenceEvents[K]) => Awaitable<void>
	): void;
}

interface PresenceEvents {
	/**
	 * Emitted on every tick, used to update the data displayed in the presence
	 */
	UpdateData: [];
	/**
	 * Emitted when data is received from the iframe.ts file
	 */
	iFrameData: [data: unknown];
}

type Awaitable<T> = Promise<T> | T;

/**
 * Minimum amount of time in ms between slide updates
 */
declare const MIN_SLIDE_TIME: number;
/**
 * Represents a slideshow slide
 */
declare class SlideshowSlide {
	id: string;
	data: PresenceData;
	private _interval;
	constructor(id: string, data: PresenceData, interval: number);
	get interval(): number;
	set interval(interval: number);
	/**
	 * Updates the slide presenceData
	 * Passing null will keep the original value
	 * @param data The slide presenceData
	 */
	updateData(data?: PresenceData): void;
	/**
	 * Updates the slide interval
	 * Passing null will keep the original value
	 * @param interval The slide interval
	 */
	updateInterval(interval?: number): void;
}
/**
 * Controller for alternating between multiple sets of
 * presence data at specific intervals
 */
declare class Slideshow {
	private index;
	private slides;
	currentSlide: PresenceData;
	constructor();
	/**
	 * Sets the current slide
	 */
	private pollSlide;
	/**
	 * Adds a slide to the queue
	 * If a slide already exists with the given id, it will be updated with a new value
	 * @param id The slide id
	 * @param data The slide presenceData
	 * @param interval Interval until next slide
	 */
	addSlide(id: string, data: PresenceData, interval: number): SlideshowSlide;
	/**
	 * Deletes a slide from the queue
	 * @param id The slide id
	 */
	deleteSlide(id: string): void;
	/**
	 * Clears the queue
	 */
	deleteAllSlides(): void;
	/**
	 * Updates a slide already in queue
	 * Passing null will keep the old value
	 * @param id The slide id
	 * @param data The slide presenceData
	 * @param interval Interval until next slide
	 */
	updateSlide(
		id: string,
		data?: PresenceData,
		interval?: number
	): SlideshowSlide;
	/**
	 * Returns if a slide exists in the queue
	 * @param id The slide id
	 */
	hasSlide(id: string): boolean;
	/**
	 * Returns all slides
	 */
	getSlides(): SlideshowSlide[];
}
/**
 * Is used to gather information from iFrames
 * @link https://docs.premid.app/en/dev/presence/iframe
 */
declare class iFrame {
	_events: any;
	/**
	 * Send data from iFrames back to the presence script
	 * @param data Data to send
	 * @link https://docs.premid.app/dev/presence/class#iframedata
	 */
	send(data: any): void;
	/**
	 * Returns the iframe url
	 * @link https://docs.premid.app/dev/presence/iframe#geturl
	 * @since 2.0-BETA3
	 */
	getUrl(): Promise<string>;
	/**
	 * Subscribe to events emitted by the extension
	 * @param eventName
	 * @param callback
	 * @link https://docs.premid.app/dev/presence/class#updatedata
	 */
	on<K extends keyof IFrameEvents>(
		eventName: K,
		listener: (...args: IFrameEvents[K]) => Awaitable<void>
	): void;
}

interface IFrameEvents {
	UpdateData: [];
}
