declare class iFrame {
    /**
     * Send data from iFrames back to the presence script
     * @param data Data to send
     */
    send(data: any): void;
}
declare var iframe: iFrame;
/**
 * @link https://docs.premid.app/presence-development/coding/presence-class#getpagevariable-string
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
     * @link https://docs.premid.app/presence-development/coding/presence-class#clientid
     */
    clientId: string;
    /**
     * Wether or not this presence supports media keys
     * @default {mediaKeys: false}
     * @link https://docs.premid.app/presence-development/coding/presence-class#mediakeys
     */
    mediaKeys?: boolean;
}
declare class Presence {
    private clientId;
    private trayTitle;
    private playback;
    private mediaKeys;
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
     * @link https://docs.premid.app/presence-development/coding/presence-class#setactivity-presencedata-boolean
     */
    setActivity(presenceData?: presenceData, playback?: boolean): void;
    /**
     * Clears the activity shown in discord as well as the Tray and keybinds
     * @link https://docs.premid.app/presence-development/coding/presence-class#clearactivity
     */
    clearActivity(): void;
    /**
     * Sets the tray title on the Menubar in Mac OS (Mac OS only)
     * @param trayTitle Tray Title
     * @link https://docs.premid.app/presence-development/coding/presence-class#settraytitle-string
     */
    setTrayTitle(trayTitle?: string): void;
    /**
     * Get translations from the extension
     * @param strings String object with keys being the key for string, keyValue is the string value
     * @link https://docs.premid.app/presence-development/coding/presence-class#getstrings-object
     */
    getStrings(strings: Object): Promise<any>;
    /**
     * Get variables from the actual site.
     * @param {Array} variables Array of variable names to get
     * @example var pageVar = getPageVariable('pageVar') -> "Variable content"
     * @link https://docs.premid.app/presence-development/coding/presence-class#getpagevariable-string
     */
    getPageVariable(variable: string): Promise<any>;
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
    on(eventName: "UpdateData" | "MediaKeys" | "iFrameData", callback: Function): void;
}
