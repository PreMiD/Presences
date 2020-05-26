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
interface PresenceOptions {
  /**
   * ClientId of Discord application
   * @link https://docs.premid.app/presence-development/coding/presence-class#clientid
   */
  clientId: string;
}
declare class Presence {
  metadata: any;
  _events: any;
  private clientId;
  private trayTitle;
  private playback;
  private internalPresence;
  private port;
  /**
   * Create a new Presence
   */
  constructor(presenceOptions: PresenceOptions);
  /**
   *
   * @param presenceData presenceData
   * @param playback Is presence playing
   * @link https://docs.premid.app/presence-development/coding/presence-class#setactivity-presencedata-boolean
   */
  setActivity(presenceData?: PresenceData, playback?: boolean): void;
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
   * Get the current
   * @param strings
   * @since 2.0-BETA3
   */
  getActivity(): PresenceData;
  /**
   * Get translations from the extension
   * @param strings String object with keys being the key for string, keyValue is the string value
   * @param language Language
   * @link https://docs.premid.app/presence-development/coding/presence-class#getstrings-object
   */
  getStrings(strings: Object, language?: string): Promise<any>;
  /**
   * Get letiables from the actual site.
   * @param {Array} letiables Array of letiable names to get
   * @example let pagelet = getPageletiable('pagelet') -> "letiable content"
   * @link https://docs.premid.app/presence-development/coding/presence-class#getpageletiable-string
   */
  getPageletiable(letiable: string): Promise<any>;
  /**
   * Returns extension version
   * @param onlyNumeric version nubmer without dots
   * @since 2.1
   */
  getExtensionVersion(onlyNumeric?: boolean): string | number;
  /**
   * Get a setting from the presence metadata
   * @param setting Id of setting as defined in metadata.
   * @since 2.1
   */
  getSetting(setting: string): Promise<any>;
  /**
   * Hide a setting
   * @param setting Id of setting / Array of setting Id's
   * @since 2.1
   */
  hideSetting(settings: string | Array<string>): Promise<void>;
  /**
   * Hide a setting
   * @param setting Id of setting / Array of setting Id's
   * @since 2.1
   */
  showSetting(settings: string | Array<string>): Promise<void>;
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
declare class iFrame {
  _events: any;
  /**
   * Send data from iFrames back to the presence script
   * @param data Data to send
   */
  send(data: any): void;
  /**
   * Returns the iframe url
   * @since 2.0-BETA3
   */
  getUrl(): Promise<string>;
  /**
   * Subscribe to events emitted by the extension
   * @param eventName
   * @param callback
   */
  on(eventName: "UpdateData", callback: Function): void;
}
