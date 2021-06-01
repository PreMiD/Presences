/**
 * Rythm API namespace
 */
type apiNamespace = "r1" | "r2" | "r3" | "r4" | "r5" | "rc" | "rchan";
/**
 * Queue repeating state
 */
type repeatingState = "none" | "one" | "queue";

/**
 * API Info
 */
interface APIInfo {
  namespace: apiNamespace;
  socketUrl: string;
}

/**
 * API Data
 */
interface APIData {
  namespace?: string; // API namespace
  member?: APIMember; // Dashboard user (server member)
  isPremiumUser?: boolean; // Has the user premium?
  isLoading?: boolean; // Is the bot / dashboard loading?
  isDJ?: boolean; // Is the member an administrator or dj?
  canInteract?: boolean; // Can the user interact with the bot?
  memberVoiceChannel?: APIVoiceChannel; // Member voice channel
  guild?: APIGuild; // Server
  userVoiceChannel?: APIVoiceChannel; // Member voice channel
  botVoiceChannel?: APIVoiceChannel; // Bot voice channel
  queue?: APIPlayingTrack[]; // Server queue
  queueActualLength?: number; // Queue length
  queueActualDuration?: number; // Queue duration
  playingTrack?: APIPlayingTrack; // Current song
  seek?: number; // Song seek amount
  seekTimestamp?: number; // Song seek timestamp
  isPaused?: boolean; // Is the song paused?
  volume?: number; // Bot volume
  members?: APIUser[]; // Members in the voice channel
  repeatMode?: repeatingState; // Repeating state ("none", "one", "queue")
  voteSkips?: APIMember[]; // Members in the voice channel that vote to skip
}

/**
 * API Data - VoiceChannel
 */
interface APIVoiceChannel {
  id?: string; // Voice channel id
  name?: string; // Voice channel name
}

/**
 * API Data - Server
 */
interface APIGuild {
  id?: string; // Server ID
  name?: string; // Server name
  isPremium?: boolean; // Has the server premium?
}

/**
 * API Data - Member
 */
interface APIMember {
  id?: string; // Member ID
  username?: string; // Member username
  discriminator?: string; // Member discriminator
  displayName?: string; // Member nickname
  avatar?: string; // Member avatar url
  animatedAvatar?: null | string; // Is the member avatar animated?
}

/**
 * API Data - User
 */
interface APIUser {
  member?: APIMember; // Member data
  details?: APIMemberDetails; // Member details
}

/**
 * API Data - Details
 */
interface APIMemberDetails {
  isDJ?: boolean; // Is the member a dj?
  isDeafened?: boolean; // Is the member deafened?
  isMuted?: boolean; // Is the member muted?
  isPremium?: boolean; // Has the member premium?
  lastConnected?: number; // Last connection timestamp
}

/**
 * API Data - Playing Song
 */
interface APIPlayingTrack {
  id?: string; // Song ID
  uri?: string; // Song URL
  title?: string; // Song title
  isStream?: boolean; // Is the song a livestream? (otherwise it's a video)
  largeThumbnail?: string; // Song thumbnail (large)
  smallThumbnail?: string; // Song thumbnail (small)
  duration?: number; // Song duration
  enqueuer?: APIMember; // Song enqueuer
}

/**
 * API Connection
 */
class APIConnection {
  /**
   * API Namespace
   */
  public readonly namespace: apiNamespace;
  /**
   * WebSocket URL
   */
  public readonly socketUrl: string;

  /**
   * WebSocket
   */
  private websocket: WebSocket;
  /**
   * API Data
   */
  private apiData: APIData = {};

  /**
   * WebSocket connection state
   */
  public get state(): number {
    return this.websocket.readyState;
  }

  /**
   * API data
   */
  public get data(): APIData {
    return this.apiData;
  }

  /**
   * New API Connection
   * @param namespace API Namespace
   * @param socketUrl WebSocket URL
   */
  private constructor(namespace: apiNamespace, socketUrl: string) {
    this.namespace = namespace;
    this.socketUrl = socketUrl;
    this.websocket = new WebSocket(socketUrl);
  }

  /**
   * Destroy the API connection
   */
  public destroy(): void {
    this.websocket.close();
  }

  /**
   * Create an API connection
   * @param namespace API Namespace
   * @param socketUrl WebSocket URL
   */
  public static create(
    namespace: apiNamespace,
    socketUrl: string
  ): Promise<APIConnection> {
    // Create the API connection
    const connection = new APIConnection(namespace, socketUrl);

    // Return a new promise which will resolve once the websocket is open or reject on error
    return new Promise<APIConnection>((resolve, reject) => {
      /**
       * WebSocket opens
       */
      connection.websocket.onopen = function () {
        delete this.onerror;

        this.onclose = function (event: CloseEvent) {
          presence.info(
            `Disconnected from Rythm's API [${namespace}]` +
              (event && event.reason ? `: ${event.reason}` : "")
          );
        };

        presence.success(`Connected to Rythm's API [${namespace}]`);
        resolve(connection);
      };

      /**
       * WebSocket error
       * @param event Event
       */
      connection.websocket.onerror = function (event: ErrorEvent) {
        presence.error(
          `Unable to connect to Rythm's API [${namespace}]` +
            (event && event.message ? `: ${event.message}` : "")
        );
        reject(event);
      };

      /**
       * WebSocket message
       * @param event Event
       */
      connection.websocket.onmessage = function (event: MessageEvent) {
        presence.info(`Message from Rythm's API: ${event.data}`);
        if (event.data) {
          connection.apiData = {
            ...connection.apiData,
            ...JSON.parse(event.data)
          };
        }
      };
    });
  }
}

/**
 * Language Strings
 */
interface LangStrings {
  play: string;
  pause: string;
  search: string;
  searchFor: string;
  browsing: string;
  readingAbout: string;
  repeat: string;
  repeatAll: string;
  dj: string;
  buttonViewSong: string;
}

/**
 * Check the API connection
 * @param namespace API Namespace
 * @param socketUrl WebSocket URL
 * @returns WebSocket connection state (connected / disconnected)
 */
async function checkAPIConnection(
  namespace: apiNamespace,
  socketUrl: string
): Promise<boolean> {
  // Make sure the check runs only once at a time
  if (connectionCheck) return false;
  connectionCheck = true;

  // Check if a connection exists
  if (connection && connection.state !== WebSocket.CLOSED) {
    // Connection exists
    connectionCheck = false;
    return true;
  } else {
    // Connection needs to be made
    let fail = false;

    try {
      // Make connection
      connection = await APIConnection.create(namespace, socketUrl);
    } catch (e) {
      // Handle errors
      fail = true;
    }

    // Connection ready
    connectionCheck = false;
    return !fail;
  }
}

/**
 * Get API information
 * @param path Server path
 * @returns API namespace and websocket url
 */
async function getAPIInfo(path: string[]): Promise<APIInfo> {
  const version = presence.getExtensionVersion();
  let namespace: apiNamespace = undefined,
    socketUrl: string = undefined;

  // Fallback mechanism for older extensions
  if (version >= 224) {
    // For newer extension versions, use getPageletiable of the presence class
    namespace =
      (path[1] as apiNamespace) ||
      ((await presence.getPageletiable(namespaceLetiable)) as apiNamespace);
    socketUrl = `${await presence.getPageletiable(
      socketUrlLetiable
    )}/${namespace}`;
  } else {
    // For older versions, use the custom getPageletiable as a fallback
    presence.error(`Using fallback for older extensions: ${version}`);
    namespace =
      (path[1] as apiNamespace) ||
      ((await getPageletiable(`window.${namespaceLetiable}`)) as apiNamespace);
    socketUrl = `${await getPageletiable(
      `window.${socketUrlLetiable}`
    )}/${namespace}`;
  }

  return { namespace, socketUrl };
}

/**
 * Get Language Strings
 * @returns Language Strings
 */
async function getStrings(): Promise<LangStrings> {
  let languageCode: string;

  try {
    languageCode = await presence.getSetting("language");
  } catch (e) {
    languageCode = "en";
  }

  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      search: "general.search",
      searchFor: "general.searchFor",
      browsing: "general.browsing",
      readingAbout: "general.readingAbout",
      repeat: "general.repeat",
      repeatAll: "general.repeatAll",
      dj: "general.dj",
      buttonViewSong: "general.buttonViewSong"
    },
    languageCode
  );
}

/**
 * Get result of running JS in the page
 * This function is needed until extension v2.2.4 because Firefox freezes after some time when using the current "presence.getPageletiable".
 * Once the new extension has been released, this can theorethically be removed. The presence currently checks wether it has to use this or not.
 * @param js JS to run in page
 * @see {@link https://github.com/PreMiD/Extension/pull/23/files}
 * @see getAPIInfo
 * @deprecated
 */
function getPageletiable(js: string): Promise<string> {
  const eventName = "PreMiD_Rythm_Pageletiable";

  return new Promise<string>((resolve) => {
    const script = document.createElement("script"),
      _listener = (data: CustomEvent) => {
        script.remove();
        resolve(JSON.parse(data.detail));
        window.removeEventListener(eventName, _listener, true);
      };

    window.addEventListener(eventName, _listener);
    script.id = "PreMiD_Rythm_Pageletiables";
    script.appendChild(
      document.createTextNode(`
     var pmdPL = new CustomEvent("${eventName}", {detail: JSON.stringify(${js})});
     window.dispatchEvent(pmdPL);
     `)
    );

    (document.body || document.head || document.documentElement).appendChild(
      script
    );
  });
}

/**
 * Rythm PreMiD Presence
 */
const presence = new Presence({
    clientId: "683285340571566091"
  }),
  strings = getStrings(),
  rythms = {
    r1: "Rythm",
    r2: "Rythm 2",
    r3: "Rythm 3",
    r4: "Rythm 4",
    r5: "Rythm 5",
    rc: "Rythm Canary",
    rchan: "Rythm-chan"
  },
  separator = "•",
  namespaceLetiable = "apiNamespace",
  socketUrlLetiable = "apiWebsocketUrl";

// Presence data
let connection: APIConnection = undefined,
  namespace: apiNamespace = undefined,
  socketUrl: string = undefined,
  connectionCheck = false,
  idleStamp = 0,
  lastPath: string = undefined;

// UpdateData handler
presence.on("UpdateData", async () => {
  // Setup
  const host = window.location.hostname,
    path = window.location.pathname.split("/").slice(1),
    hash = window.location.hash.slice(1),
    presenceData: PresenceData = {},
    showUsernames = await presence.getSetting("usernames"),
    showNicknames = await presence.getSetting("nicknames"),
    showServerDetails = await presence.getSetting("server-details"),
    showButtons = await presence.getSetting("buttons");

  // Billing management
  if (path[0] === "app" && path[1] === "billing") {
    presenceData.largeImageKey = "r1";
    presenceData.details = "Billing management";

    presence.setActivity(presenceData);
    presence.setTrayTitle(`Rythm ${separator} Billing management`);
    return;
  }

  // Dashboard
  if (path[0] === "app") {
    // Check if the api info needs to be fetched
    if (lastPath !== path.join("/")) {
      // Currently, getPageletiable causes high cpu and memory usage,
      // which results in slowdowns, when used too often. This part
      // should prevent browsers from slowing down when using the web
      // dashboard for longer periods. Do not remove this mechanism!

      // Reset previous data, if it exists
      if (connection) connection.destroy();
      namespace = undefined;
      socketUrl = undefined;
      lastPath = path.join("/");

      // Fetch api information
      const apiInfo = await getAPIInfo(path);
      ({ namespace, socketUrl } = apiInfo);

      // Continue with the next emit of "UpdateData"
      return;
    }

    // Check the api connection
    const apiReady = await checkAPIConnection(namespace, socketUrl);

    // Make sure the API connection is ready before continuing
    if (!apiReady) return;

    // Select the large image to logo of the Rythm version currently being used
    presenceData.largeImageKey = namespace;

    // Add the open dashboard button if buttons should be displayed
    if (showButtons) {
      presenceData.buttons = [
        {
          label: "Open Dashboard",
          url: `https://${host}/${path.length > 0 ? path[0] : ""}`
        }
      ];
    }

    // Get the current API data
    const apiData = connection.data;

    // Check if a song is currently playing or paused
    if (apiData.playingTrack) {
      // Reset the idle time
      idleStamp = 0;

      // Add song information
      presenceData.details = apiData.playingTrack.title;
      if (showUsernames) {
        presenceData.state = `Requested by: ${
          apiData.playingTrack.enqueuer[
            showNicknames ? "displayName" : "username"
          ]
        }`;
      }

      // Add the view song button if buttons should be displayed
      if (showButtons) {
        presenceData.buttons.push({
          label: (await strings).buttonViewSong,
          url: apiData.playingTrack.uri
        });
      }

      // Check if the song isn't paused
      if (apiData.isPaused === false) {
        // Add the Rythm version name and seperator
        presenceData.smallImageText = `${rythms[namespace]} ${separator} `;

        // Check repeating state and add it
        switch (apiData.repeatMode) {
          // Repeat song
          case "one":
            presenceData.smallImageKey = "repeat-one";
            presenceData.smallImageText += (await strings).repeat;
            break;
          // Repeat queue
          case "queue":
            presenceData.smallImageKey = "repeat";
            presenceData.smallImageText += (await strings).repeatAll;
            break;
          // Play
          default:
            presenceData.smallImageKey = "play";
            presenceData.smallImageText += (await strings).play;
            break;
        }

        // Check if the currently playing song is a livestream
        if (apiData.playingTrack.isStream) {
          // Show elapsed time
          presenceData.startTimestamp = apiData.seekTimestamp / 1000;
        } else {
          // Show remaining time
          presenceData.startTimestamp =
            (apiData.seekTimestamp - apiData.seek) / 1000;
          presenceData.endTimestamp =
            (apiData.seekTimestamp -
              apiData.seek +
              apiData.playingTrack.duration) /
            1000;
        }
      } else {
        // Pause
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = `${rythms[namespace]} ${separator} ${
          (await strings).pause
        }`;
      }
    } else {
      // Check if server details can and should be shown
      if (showServerDetails) {
        // Get the amount of DJs and normal users
        const djAmount = apiData.members.filter(
            (user) => user.details.isDJ
          ).length,
          userAmount = apiData.members.length - djAmount;

        // Add server information
        presenceData.details = apiData.guild.name;

        // Check if any users are connected
        if (djAmount > 0 || userAmount > 0) {
          // Add user information
          presenceData.state =
            `${(await strings).dj}s: ${djAmount}` +
            ` ${separator} ` +
            `Users: ${userAmount}`;
        }
      } else {
        // Check the idle time
        if (idleStamp === 0) idleStamp = Date.now() / 1000;

        // Add idle information
        presenceData.details = "Idle";
        presenceData.startTimestamp = idleStamp;
      }
    }

    presence.setActivity(presenceData);
    presence.setTrayTitle(`${namespace} ${separator} Dashboard`);
    return;
  }

  // Documentation
  if (path[0] === "docs") {
    presenceData.largeImageKey = "r1";
    presenceData.details = "Documentation";
    presenceData.state = document.querySelector("h1").textContent;

    presence.setActivity(presenceData);
    presence.setTrayTitle(`Rythm ${separator} Documentation`);
    return;
  }

  // Premium
  if (path[0] === "premium") {
    presenceData.largeImageKey = "r1";
    presenceData.details = "Premium";
    if (hash === "plans") presenceData.state = "Pricing and plans";

    presence.setActivity(presenceData);
    presence.setTrayTitle(`Rythm ${separator} Premium`);
    return;
  }

  // Startpage / Unknown
  presence.setActivity();
  presence.setTrayTitle();
});
