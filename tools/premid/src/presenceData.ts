export enum PresenceType {
	/**
	 * Playing {name}
	 */
	Playing = 0,
	/**
	 * Streaming {details}
	 */
	Streaming = 1,
	/**
	 * Listening to {name}
	 */
	Listening = 2,
	/**
	 * Watching {name}
	 */
	Watching = 3,
	/**
	 * Competing in {name}
	 */
	Competing = 5,
}

export interface PresenceData {
	/**
	 * The name of the activity
	 *
	 * Supports:
	 *
	 * `String`: A string
	 *
	 * `Node`: An element to use (it will use `.textContent`)
	 */
	name?: string | Node;
	/**
	 * The type of the activity
	 */
	type?: PresenceType;
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

export interface ButtonData {
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
