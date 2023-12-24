/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @link https://docs.premid.app/dev/presence/class#presencedata-interface
 */
interface PresenceData {
	/**
	 * Top row of the status
	 *
	 * Supports:
	 *
	 * `String`: A string
	 *
	 * `Node`: An element to use (it will use `.textContent`)
	 */
	details?: string | Node;
	/**
	 * Bottom row of the status
	 *
	 * Supports:
	 *
	 * `String`: A string
	 *
	 * `Node`: An element to use (it will use `.textContent`)
	 */
	state?: string | Node;
	/**
	 * Timestamp in seconds or milliseconds for the start of the activity.
	 * Including this will show time as "elapsed"
	 */
	startTimestamp?: number | Date;
	/**
	 * Timestamp in seconds or milliseconds until the end of the activity.
	 * Including this will show time as "remaining" and it takes priority over startTimestamp
	 */
	endTimestamp?: number | Date;
	/**
	 * Will display as the large profile artwork
	 *
	 * Supports:
	 *
	 * `String`: An URL to the image or a base64 encoded image
	 *
	 * `Blob`: A blob of the image
	 *
	 * `HTMLImageElement`: An image element to use (it will be converted to a blob)
	 */
	largeImageKey?: string | Blob | HTMLImageElement;
	/**
	 * Will display as the small profile artwork
	 *
	 * Supports:
	 *
	 * `String`: An URL to the image or a base64 encoded image
	 *
	 * `Blob`: A blob of the image
	 *
	 * `HTMLImageElement`: An image element to use (it will be converted to a blob)
	 */
	smallImageKey?: string | Blob | HTMLImageElement;
	/**
	 * Tooltip for the smallImageKey
	 *
	 * Supports:
	 *
	 * `String`: A string
	 *
	 * `Node`: An element to use (it will use `.textContent`)
	 */
	smallImageText?: string | Node;
	/**
	 * Array of buttons, max 2, label is the button text, and url is the link
	 */
	buttons?: [ButtonData, ButtonData?];
}

interface ButtonData {
	/**
	 * Text for the button
	 *
	 * Supports:
	 *
	 * `String`: A string
	 *
	 * `Node`: An element to use (it will use `.textContent`)
	 */
	label: string | Node;
	/**
	 * URL of button link
	 *
	 * Supports:
	 *
	 * `String`: A string
	 *
	 * `HTMLAnchorElement`: An anchor element to use (it will use `.href`)
	 */
	url: string | HTMLAnchorElement;
}

interface PresenceDataFinal {
	state?: string;
	details?: string;
	startTimestamp?: number | Date;
	endTimestamp?: number | Date;
	largeImageKey?: string;
	smallImageKey?: string;
	smallImageText?: string;
	buttons?: { label: string; url: string }[];
}

interface PresenceDataFull extends PresenceDataFinal {
	largeImageText?: string;
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
	 */
	injectOnComplete?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const enum Assets {
	Play = "https://cdn.rcd.gg/PreMiD/resources/play.png",
	Pause = "https://cdn.rcd.gg/PreMiD/resources/pause.png",
	Stop = "https://cdn.rcd.gg/PreMiD/resources/stop.png",
	Search = "https://cdn.rcd.gg/PreMiD/resources/search.png",
	Question = "https://cdn.rcd.gg/PreMiD/resources/question.png",
	Live = "https://cdn.rcd.gg/PreMiD/resources/live.png",
	Reading = "https://cdn.rcd.gg/PreMiD/resources/reading.png",
	Writing = "https://cdn.rcd.gg/PreMiD/resources/writing.png",
	Call = "https://cdn.rcd.gg/PreMiD/resources/call.png",
	VideoCall = "https://cdn.rcd.gg/PreMiD/resources/video-call.png",
	Downloading = "https://cdn.rcd.gg/PreMiD/resources/downloading.png",
	Uploading = "https://cdn.rcd.gg/PreMiD/resources/uploading.png",
	Repeat = "https://cdn.rcd.gg/PreMiD/resources/repeat.png",
	RepeatOne = "https://cdn.rcd.gg/PreMiD/resources/repeat-one.png",
	Premiere = "https://cdn.rcd.gg/PreMiD/resources/premiere.png",
	PremiereLive = "https://cdn.rcd.gg/PreMiD/resources/premiere-live.png",
	Viewing = "https://cdn.rcd.gg/PreMiD/resources/viewing.png",
}

type PresenceClassSetActivityEvent = {
	event: "setActivity";
	data: { clientId: string; presenceData: PresenceDataFinal };
};

type PresenceClassClearActivityEvent = { event: "clearActivity" };

type PresenceClassGetPresenceLetiableEvent = {
	event: "getPresenceLetiable";
	data: string;
	nonce: string;
};

type PresenceClassGetPageVariablesEvent = {
	event: "getPageVariables";
	data: string[];
	nonce: string;
};

type PresenceClassReconnectEvent = {
	event: "reconnect";
};

type PresenceClassEvents =
	| PresenceClassSetActivityEvent
	| PresenceClassClearActivityEvent
	| PresenceClassGetPresenceLetiableEvent
	| PresenceClassGetPageVariablesEvent
	| PresenceClassReconnectEvent;

type ConsoleLogType = "log" | "info" | "warn" | "error";
interface ConsoleLog<T = unknown> {
	id: string;
	timestamp: number;
	type: ConsoleLogType;
	content: T;
}

/**
 * Useful tools for developing presences
 * @link https://docs.premid.app/en/dev/presence/class
 */
declare class Presence {
	private clientId;
	private injectOnComplete;
	private internalPresence;
	private port;
	private pmd;
	private service;
	private isTemporary;
	private log;
	private logInfo;
	private logError;
	private logSuccess;
	/**
	 * Create a new Presence
	 */
	constructor(presenceOptions: PresenceOptions);
	private injectVariableGetter(): Promise<void>;
	private connectToBackground(): void;
	/**
	 * Get the current activity
	 * @link https://docs.premid.app/en/dev/presence/class#getactivity
	 * @deprecated since 2.2.4
	 */
	getActivity(): PresenceData;
	/**
	 * Sets the presence activity and sends it to the application.
	 * @param data PresenceData or Slideshow
	 * @param _playback DEPRECATED: Is presence playing
	 * @link https://docs.premid.app/dev/presence/class#setactivitypresencedata-boolean
	 */
	setActivity(
		data?: PresenceData | Slideshow,
		_playback?: boolean
	): Promise<void>;
	private getTextFromElement(element: string | Node): string | undefined;
	private imageSrcToBlob;
	private getImageFromElement(
		element: string | Blob | HTMLImageElement
	): Promise<string | undefined>;
	private uploadedBlobs;
	private uploadBlob(blob: Blob): Promise<string | undefined>;
	/**
	 * Clears the activity shown in discord as well as the Tray and keybinds
	 * @link https://docs.premid.app/dev/presence/class#clearactivity
	 */
	clearActivity(): void;
	/**
	 * Sets the tray title on the Menubar in Mac OS (Mac OS only, supports ANSI colors)
	 * @param _trayTitle Tray Title
	 * @link https://docs.premid.app/dev/presence/class#settraytitlestring
	 * @since 2.0-BETA3
	 * @deprecated 2.5
	 */
	setTrayTitle(_trayTitle?: string): void;
	/**
	 * Get translations from the extension
	 * @param strings String object with keys being the key for string, keyValue is the string value
	 * @param language DEPRECATED: Language to get strings for
	 * @link https://docs.premid.app/dev/presence/class#getstringsobject
	 */
	getStrings<
		T extends {
			[K: string]: string;
		}
	>(strings: T, _language?: string): Promise<T>;
	/**
	 * Get letiables from the actual site
	 * @param {Array} letiables Array of letiable names to get
	 * @example let pagelet = getPageletiable('pagelet') -> "letiable content"
	 * @link https://docs.premid.app/presence-development/coding/presence-class#getpageletiable-string
	 * @deprecated 2.5 - Use getPageVariable instead
	 */
	getPageletiable<T = unknown>(letiable: string): Promise<T>;
	/**
	 * Returns an array of the past 100 logs, you can filter these logs with a RegExp.
	 * @param regExp Filter for the logs content
	 * @param options Options for the logs
	 */
	getLogs<T = unknown>(
		regExp?: RegExp,
		options?: {
			/**
			 * Types of logs to get
			 *
			 * Default: `["log"]`
			 */
			types?: ConsoleLogType[];
			/**
			 * Whether to only get the content of the logs
			 *
			 * Default: `true`
			 */
			contentOnly?: true;
		}
	): Promise<T[]>;
	getLogs<T = unknown>(
		regExp?: RegExp,
		options?: {
			/**
			 * Types of logs to get
			 *
			 * Default: `["log"]`
			 */
			types?: ConsoleLogType[];
			/**
			 * Whether to only get the content of the logs
			 *
			 * Default: `true`
			 */
			contentOnly: false;
		}
	): Promise<ConsoleLog<T>[]>;
	getLogs<T = unknown>(
		regExp?: RegExp,
		options?: {
			/**
			 * Types of logs to get
			 *
			 * Default: `["log"]`
			 */
			types?: ConsoleLogType[];
			/**
			 * Whether to only get the content of the logs
			 *
			 * Default: `true`
			 */
			contentOnly?: boolean;
		}
	): Promise<T[] | ConsoleLog<T>[]>;
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
	 * Get variables from the web page
	 * Supports nested variables using dot notation (e.g. `document.title`)
	 *
	 * NOTE: This function can be very heavy if you are not directly accessing a variable with primitive value!
	 * @param variables Variables to get
	 * @since 2.5
	 */
	getPageVariable<T extends Record<string, unknown>>(
		...variables: string[]
	): Promise<T>;
	/**
	 * Sends data back to application
	 * @param event Event
	 */
	private postEvent(data: PresenceClassEvents): void;
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
