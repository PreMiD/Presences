/**
 * @link https://docs.premid.app/presence-development/coding/presence-class#getpageletiable-string
 */
interface PresenceData {
  state?: string;
  details?: string;
  startTimestamp?: number;
  endTimestamp?: number;
  largeImageKey?: string;
  smallImageKey?: string;
  smallImageText?: string;
}
/**
 * Options that change the behavior of the presence
 */
interface PresenceOptions {
  /**
   * ClientId of Discord application
   * @link https://docs.premid.app/presence-development/coding/presence-class#clientid
   */
  clientId: string;
}
/**
 * Contains basic information about the presece
 * @link https://docs.premid.app/dev/presence/metadata
 */
interface Metadata {
  /**
   * Should contain Object with name and id of the presence developer.
   * Name is your Discord username without the identifier(#0000).
   * User id can be copied from Discord by enabling developer mode and right-clicking on your profile.
   */
  author: { name: string; id: string };
  /**
   * Should contain an Array of Objects with each Object having the name and id of the contributor.
   * Name is your Discord username without the identifier(#0000).
   * User id can be copied from Discord by enabling developer mode and right-clicking on your profile.
   */
  contributors?: Array<{ name: string; id: string }>;
  /**
   * The title of the service that this presence supports. The folder name and service name should also be the same.
   */
  service: string;
  /**
   * Small description of the service. Your description must have key pair values which indicate the language, and the description in that specific language.
   * Make descriptions with the languages that you know, our translators will make changes to your metadata file.
   * Visit the link for all the language IDs.
   * @link https://api.premid.app/v2/langFile/list
   */
  description: Record<string, string>;
  /**
   * URL of the service.
   * Example: `vk.com`
   * This url must match the url of the website as it will be used to detect wherever or not this is the website to inject the script to.
   * This may only be used as an array when there are more than one urls.
   * Note: Do **NOT** add `http://` or `https://` in the url or it will not work.
   */
  url: string;
  /**
   * Version of your presence.
   * Use Sematic Versioning; <MAJOR>.<MINOR>.<PATCH>
   * @link https://semver.org/
   */
  version: string;
  /**
   * Link to service's logo.
   * Must end with .png/.jpg/etc.
   */
  logo: string;
  /**
   * Link to service's thumbnail or picture of the website.
   * Must end with .png/.jpg/etc.
   */
  thumbnail: string;
  /**
   * `#HEX` value.
   * We recommend to use a primary color of the service that your presence supports.
   */
  color: string;
  /**
   * Array with tags, they will help users to search your presence on the website.
   */
  tags: string | Array<string>;
  /**
   * A string used to represent the category the presence falls under.
   * @link https://docs.premid.app/dev/presence/metadata#presence-categories
   */
  category: string;
  /**
   * Defines whether `iFrames` are used.
   */
  iframe?: boolean;
  /**
   * A regular expression string used to match urls.
   * @link https://docs.premid.app/dev/presence/metadata#regular-expressions
   */
  regExp?: RegExp;
  /**
   * A regular expression selector that selects iframes to inject into.
   * @link https://docs.premid.app/dev/presence/metadata#regular-expressions
   */
  iframeRegExp?: RegExp;
  button?: boolean;
  warning?: boolean;
  /**
   * An array of settings the user can change.
   * @link https://docs.premid.app/dev/presence/metadata#presence-settings
   */
  settings?: Array<{
    id: string;
    title: string;
    icon: string;
    if?: Record<string, string>;
    placeholder?: string;
    value?: string | number | boolean;
    values?: Array<string | number | boolean>;
  }>;
}
/**
 * Useful tools for developing presences
 * @link https://docs.premid.app/en/dev/presence/class
 */
declare class Presence {
  metadata: Metadata;
  _events: any;
  private clientId: string;
  private trayTitle: string;
  private playback: boolean;
  private internalPresence: PresenceData;
  private port;
  private genericStyle: string;
  private presenceStyle: string;
  /**
   * Create a new Presence
   */
  constructor(presenceOptions: PresenceOptions);
  /**
   * Get the current
   * @param strings
   * @since 2.0-BETA3
   */
  getActivity(): PresenceData;
  /**
   *
   * @param presenceData PresenceData or Slideshow
   * @param playback Is presence playing
   * @link https://docs.premid.app/presence-development/coding/presence-class#setactivity-presencedata-boolean
   */
  setActivity(
    presenceData?: PresenceData | Slideshow,
    playback?: boolean
  ): void;
  /**
   * Clears the activity shown in discord as well as the Tray and keybinds
   * @link https://docs.premid.app/presence-development/coding/presence-class#clearactivity
   */
  clearActivity(): void;
  /**
   * Sets the tray title on the Menubar in Mac OS (Mac OS only, supports ANSI colors)
   * @param trayTitle Tray Title
   * @link https://docs.premid.app/presence-development/coding/presence-class#settraytitle-string
   */
  setTrayTitle(trayTitle?: string): void;
  /**
   * Get translations from the extension
   * @param strings String object with keys being the key for string, keyValue is the string value
   * @param language Language
   * @link https://docs.premid.app/presence-development/coding/presence-class#getstrings-object
   */
  getStrings(strings: Object, language?: string): Promise<any>;
  /**
   * Get letiables from the actual site
   * @param {Array} letiables Array of letiable names to get
   * @example let pagelet = getPageletiable('pagelet') -> "letiable content"
   * @link https://docs.premid.app/presence-development/coding/presence-class#getpageletiable-string
   */
  getPageletiable(letiable: string): Promise<any>;
  /**
   * Returns extension version
   * @param onlyNumeric version number without dots
   * @link https://docs.premid.app/en/dev/presence/class#getextensionversionboolean
   * @since 2.1
   */
  getExtensionVersion(onlyNumeric?: boolean): string | number;
  /**
   * Get a setting from the presence metadata
   * @param setting Id of setting as defined in metadata.
   * @link https://docs.premid.app/dev/presence/class#getsettingstring
   * @since 2.1
   */
  getSetting(setting: string): Promise<any>;
  /**
   * Hide a setting
   * @param setting Id of setting / Array of setting Id's
   * @link https://docs.premid.app/dev/presence/class#hidesettingstring
   * @since 2.1
   */
  hideSetting(settings: string | Array<string>): Promise<void>;
  /**
   * Hide a setting
   * @param setting Id of setting / Array of setting Id's
   * @link https://docs.premid.app/dev/presence/class#showsettingstring
   * @since 2.1
   */
  showSetting(settings: string | Array<string>): Promise<void>;
  /**
   * Similar to `getTimestamps` but takes in a media element and returns snowflake timestamps
   * @param media Media object
   */
  getTimestampsfromMedia(media: HTMLMediaElement);
  /**
   * Converts time and duration integers into snowflake timestamps
   * @param {Number} elementTime Current element time seconds
   * @param {Number} elementDuration Element duration seconds
   */
  getTimestamps(elementTime: number, elementDuration: number);
  /**
   * Converts a string with format `HH:MM:SS` or `MM:SS` or `SS` into an integer. (Does not return snowflake timestamp)
   * @param format The formatted string
   */
  timestampFromFormat(format: string);
  /**
   * Converts a hex string into an RGB object
   * @param hex The hex string
   */
  private hexToRGB(hex: string);
  /**
   * Calculates the font color based on the luminosity of the background
   * @param backgroundHex The hex string of the background
   */
  private getFontColor(backgroundHex: string);
  /**
   * Console logs with an info message
   * @param message The log message
   */
  info(message: string);
  /**
   * Console logs with a success message
   * @param message The log message
   */
  success(message: string);
  /**
   * Console logs with an error message
   * @param message The log message
   */
  error(message: string);
  /**
   * Creates a slideshow that allows for alternating between sets of
   * presence data at specific intervals
   */
  createSlideshow(): Slideshow;
  /**
   * Sends data back to application
   * @param data Data to send back to application
   */
  private sendData;
  /**
   * Subscribe to events emitted by the extension
   * @param eventName EventName to subscribe to
   * @param callback Callback function for event
   * @link https://docs.premid.app/presence-development/coding/presence-class#events
   */
  on(eventName: "UpdateData" | "iFrameData", callback: Function): void;
}
/**
 * Represents a slideshow slide
 */
declare class SlideshowSlide {
  id: string;
  data: PresenceData;
  private _interval: number;
  /**
   * The minimum value for the interval is 2000
   */
  interval: number;
  /**
   * Updates the slide presenceData
   * Passing null will keep the original value
   * @param data The slide presenceData
   */
  updateData(data?: PresenceData);
  /**
   * Updates the slide interval
   * Passing null will keep the original value
   * @param interval The slide interval
   */
  updateInterval(interval?: number);
}
/**
 * Controller for alternating between multiple sets of
 * presence data at specific intervals
 */
declare class Slideshow {
  private index: number;
  private slides: Array<SlideshowSlide>;
  currentSlide: PresenceData;

  /**
   * Sets the current slide
   */
  private pollSlide();
  /**
   * Adds a slide to the queue
   * If a slide already exists with the given id, it will be updated with a new value
   * @param id The slide id
   * @param data The slide presenceData
   * @param interval Interval until next slide
   */
  addSlide(id: string, data: PresenceData, interval: number);
  /**
   * Deletes a slide from the queue
   * @param id The slide id
   */
  deleteSlide(id: string);
  /**
   * Clears the queue
   */
  deleteAllSlides();
  /**
   * Updates a slide already in queue
   * Passing null will keep the old value
   * @param id The slide id
   * @param data The slide presenceData
   * @param interval Interval until next slide
   */
  updateSlide(id: string, data?: PresenceData, interval?: number);
  /**
   * Returns if a slide exists in the queue
   * @param id The slide id
   */
  hasSlide(id: string);
  /**
   * Returns all slides
   */
  getSlides();
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
   * @param eventName The name of the event
   * @param callback The callback function
   * @link https://docs.premid.app/dev/presence/class#updatedata
   */
  on(eventName: "UpdateData", callback: Function): void;
}
