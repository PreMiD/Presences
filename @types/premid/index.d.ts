/**
 * @link https://docs.premid.app/dev/presence/class#presencedata-interface
 */
interface presenceData {
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
   * @link https://docs.premid.app/dev/presence/class#clientid
   */
  clientId: string;
}
declare class Presence {
  private clientId;
  private trayTitle;
  private playback;
  private internalPresence;
  _events: any;
  /**
   * Create a new Presence
   */
  constructor(presenceOptions: PresenceOptions);
  /**
   *
   * @param presenceData presenceData
   * @param playback Is presence playing
   * @link https://docs.premid.app/dev/presence/class#setactivitypresencedata-boolean
   */
  setActivity(presenceData?: presenceData, playback?: boolean): void;
  /**
   * Clears the activity shown in discord as well as the Tray and keybinds
   * @link https://docs.premid.app/dev/presence/class#clearactivity
   */
  clearActivity(): void;
  /**
   * Sets the tray title on the Menubar in Mac OS (Mac OS only, supports ANSI colors)
   * @param trayTitle Tray Title
   * @link https://docs.premid.app/dev/presence/class#settraytitlestring
   */
  setTrayTitle(trayTitle?: string): void;
  /**
   * Get the current activity
   * @param strings
   */
  getActivity(): presenceData;
  /**
   * Get translations from the extension
   * @param strings String object with keys being the key for string, keyValue is the string value
   * @link https://docs.premid.app/dev/presence/class#getstringsobject
   */
  getStrings<
    M extends { [key: string]: string },
    U extends { [key in keyof M]: string }
  >(strings: M): Promise<U>;
  /**
   * Get variables from the current site
   * @param {Array} variables Array of variable names to get
   * @link https://docs.premid.app/dev/presence/class#getpageletiablestring
   */
  getPageLetiable(variable: string): Promise<any>;
  /**
   * Sends data back to application
   * @param data Data to send back to application
   */
  private sendData;
  /**
   * Subscribe to events the UpdateData event by the extension
   * @param eventName EventName to subscribe to
   * @param callback Callback function for event
   * @link https://docs.premid.app/dev/presence/class#updatedata
   */
  on(eventName: "UpdateData", callback: () => void): void;
  /**
   * Subscribe to events the iFrameData event by the extension
   * @param eventName EventName to subscribe to
   * @param callback Callback function for event
   * @link https://docs.premid.app/dev/presence/class#iframedata
   */
  on(eventName: "iFrameData", callback: (data: any) => void): void;
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
   */
  getUrl(): Promise<string>;
  /**
   * Subscribe to events the UpdateData event by the extension
   * @param eventName EventName to subscribe to
   * @param callback Callback function for event
   * @link https://docs.premid.app/dev/presence/class#updatedata
   */
  on(eventName: "UpdateData", callback: () => void): void;
}
