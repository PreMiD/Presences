/**
 * Queue repeating state
 */
type repeatingState = "none" | "one" | "queue";
/**
 * Rythm API namespace
 */
type apiNamespace = "r1" | "r2" | "r3" | "r4" | "r5" | "rc";

/**
 * Rythm PreMiD Presence
 */
const presence = new Presence({
    clientId: "683285340571566091",
    injectOnComplete: true,
    appMode: true
  }),
  strings = getStrings(),
  rythms = {
    r1: "Rythm",
    r2: "Rythm 2",
    r3: "Rythm 3",
    r4: "Rythm 4",
    r5: "Rythm 5",
    rc: "Rythm Canary"
  },
  separator = "•",
  apiNamespaceVar = "window.apiNamespace",
  apiWebsocketUrlVar = "window.apiWebsocketUrl";

// Presence data
let apiConnection: APIConnection = undefined,
  connectionCheck = false,
  idleStamp = 0;

// UpdateData handler
presence.on("UpdateData", async () => {
  // Setup
  const host = window.location.hostname,
    path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {},
    showUsernames = await presence.getSetting("usernames"),
    showServerDetails = await presence.getSetting("server-details"),
    showButtons = await presence.getSetting("buttons");

  // Dashboard
  if (path[0] == "app") {
    const namespace: apiNamespace = (await getPageletiable(
        apiNamespaceVar
      )) as apiNamespace,
      socketUrl: string =
        (await getPageletiable(apiWebsocketUrlVar)) + "/" + namespace,
      apiReady = await checkAPIConnection(namespace, socketUrl);

    // Make sure the API connection is ready before continuing
    if (!apiReady) return;

    // Select the large image to logo of the Rythm version currently being used
    presenceData.largeImageKey = namespace;

    // Check if buttons should be displayed
    if (showButtons) {
      // Add the open dashboard button
      presenceData.buttons = [
        {
          label: "Open Dashboard",
          url: `https://${host}/${path.length > 0 ? path[0] : ""}`
        }
      ];
    }

    // Get the current API data
    const apiData = apiConnection.getData();

    // Check if a song is currently playing or paused
    if (apiData.title) {
      idleStamp = 0;

      // Add song information
      presenceData.details = apiData.title;
      if (showUsernames)
        presenceData.state = `Requested by: ${apiData.nowPlayingUserDisplayName}`;

      // Check if buttons should be displayed
      if (showButtons) {
        // Add the view song button
        presenceData.buttons.push({
          label: (await strings).buttonViewSong,
          url: apiData.referenceId
        });
      }

      // Check if the song isn't paused
      if (apiData.pause == false) {
        // Add the Rythm version name and seperator
        presenceData.smallImageText = `${rythms[namespace]} ${separator} `;

        // Check repeating state and add it
        switch (apiData.repeat) {
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
        if (apiData.isStream) {
          // Show elapsed time
          presenceData.startTimestamp = apiData.seek_timestamp;
        } else {
          // Show remaining time
          presenceData.startTimestamp = apiData.seek_timestamp + apiData.seek;
          presenceData.endTimestamp = apiData.seek_timestamp + apiData.length;
        }
      } else {
        // Pause
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText =
          rythms[namespace] + ` ${separator} ` + (await strings).pause;
      }
    } else {
      // Check if server details can and should be shown
      if (showServerDetails && apiData.guildDisplayName) {
        // Get the amount of DJs and normal users
        const djAmount = apiData.users.reduce((result, user) => {
            return user.isAdmin ? result + 1 : result;
          }, 0),
          userAmount = apiData.users.length - djAmount;

        // Add server information
        presenceData.details = apiData.guildDisplayName;

        // Check if any users are connected
        if (djAmount > 0 || userAmount > 0) {
          // Add user information
          presenceData.state =
            `${(await strings).dj}s: ${djAmount}` +
            ` ${separator} ` +
            `Users: ${userAmount}`;
        }
      } else {
        // Check idle time
        if (idleStamp == 0) {
          idleStamp = Date.now() / 1000;
        }

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
  if (path[0] == "docs") {
    presenceData.largeImageKey = "r1";
    presenceData.details = "Documentation";
    presenceData.state = document.querySelector("h1").textContent;

    presence.setActivity(presenceData);
    presence.setTrayTitle(`Rythm ${separator} Documentation`);
    return;
  }

  // Startpage
  if (!path[0] || path[0] == "") {
    presence.setActivity();
    presence.setTrayTitle();
    return;
  }
});

/**
 * API Data
 */
interface APIData {
  avatarUrl?: string; // User avatar url
  botVoiceChannel?: string; // Bot voice channel ID
  discriminator?: string; // User discriminator
  guildDisplayName?: string; // Server name
  guildId?: string; // Server ID
  interactionAllowed?: boolean; // Permissions to use the bot?
  isAdmin?: boolean; // Is the user an administrator or dj?
  isDonationUser?: boolean; // Is the user a donation user?
  isDonator?: boolean; // Is the user a donator?
  isStream?: boolean; // Is the current song a stream? (otherwise it's a video)
  length?: number; // Song length
  nowPlayingUserDisplayName?: string; // Song requester name
  nowPlayingUserImage?: string; // Song requester icon
  pause?: boolean; // Player paused?
  queue?: {
    // Song queue
    isStream?: boolean;
    length?: number;
    queueItemId?: string;
    thumbnail?: string;
    title?: string;
    userDisplayName?: string;
    userId?: string;
    userImage?: string;
  }[];
  referenceId?: string; // Song url
  repeat?: repeatingState; // Repeating state ("none", "one", "queue")
  seek?: number; // Seek amount
  seek_timestamp?: number; // Player seek timestamp
  skipUsers?: {
    // Users voting to skip
    id?: string;
    image?: string;
    isAdmin?: boolean;
    isDeafened?: boolean;
    isMuted?: boolean;
    isPremium?: boolean;
    lastConnected?: number;
    userDisplayName?: string;
  }[];
  thumbnail?: string; // Song thumbnail url
  title?: string; // Song title
  userId?: string; // User ID
  userVoiceChannel?: {
    // User voice channel
    id?: string;
    name?: string;
  };
  username?: string; // Username
  users?: {
    // Other users in the voice channel
    id?: string;
    image?: string;
    isAdmin?: boolean;
    isDeafened?: boolean;
    isMuted?: boolean;
    isPremium?: boolean;
    lastConnected?: number;
    userDisplayName?: string;
  }[];
  volume?: number; // Bot volume
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
  private data: APIData = {};

  /**
   * WebSocket connection state
   */
  public get state(): number {
    return this.websocket.readyState;
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
   * Get API data
   * @returns API data
   */
  public getData(): APIData {
    return this.data;
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
        delete connection.websocket.onerror;
        resolve(connection);
      };

      /**
       * WebSocket error
       * @param event Event
       */
      connection.websocket.onerror = function (event: ErrorEvent) {
        reject(event.message);
      };

      /**
       * WebSocket message
       * @param event Event
       */
      connection.websocket.onmessage = function (event: MessageEvent) {
        presence.info(`Message from Rythm's API: ${event.data}`);
        if (event.data) {
          connection.data = { ...connection.data, ...JSON.parse(event.data) };
        }
      };
    });
  }
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
  if (connectionCheck) {
    return false; // Connection is getting checked already
  } else {
    connectionCheck = true;
  }

  // Check if a connection exists
  if (apiConnection && apiConnection.state != WebSocket.CLOSED) {
    // Connection exists
    connectionCheck = false;
    return true;
  } else {
    // Connection needs to be made
    let fail = false;

    try {
      // Make connection
      apiConnection = await APIConnection.create(namespace, socketUrl);
      presence.success(`Connected to Rythm's API [${namespace}]`);
    } catch (e) {
      // Handle errors
      fail = true;
      presence.error(
        `Unable to connect to Rythm's API [${namespace}]` +
          (e && e.message ? `: ${e.message}` : "")
      );
    }

    // Connection ready
    connectionCheck = false;
    return !fail;
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
 * This function is needed because the browser freezes when using the current version of getPageletiable
 * @param js js JS to run in page
 * @see {@link https://github.com/PreMiD/Extension/pull/23/files}
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
