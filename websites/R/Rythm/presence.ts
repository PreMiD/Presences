/**
 * Rythm API namespace
 */
type apiNamespace =
  | "r1"
  | "r2"
  | "r3"
  | "r4"
  | "r5"
  | "r6"
  | "r7"
  | "r8"
  | "r9"
  | "r10"
  | "rc"
  | "rchan";
/**
 * Queue repeating state
 */
type repeatingState = "none" | "one" | "queue";

/**
 * API Info
 */
interface APIInfo {
  namespace: apiNamespace; // API namespace
  socketUrl: string; // Socket URL
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
 * Rythm Bot
 */
interface Rythm {
  name: string; // Bot name
  image: string; // Image key
  invite: string; // Bot invite
  dashboard: string; // Bot dashboard
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
  openDashboard: string;
  inviteBot: string;
  djs: string;
  users: string;
  requestedBy: string;
}

/**
 * Rythm PreMiD Presence
 */
const presence = new Presence({
    clientId: "683285340571566091"
  }),
  /**
   * Presence strings
   */
  strings = getStrings(),
  /**
   * Rythm bots
   */
  rythms = {
    /**
     * Rythm#3722
     * ID: 235088799074484224
     * Hex: #fb0f32
     */
    r1: {
      name: "Rythm",
      image: "r1",
      invite: "invite",
      dashboard: "app"
    } as Rythm,
    /**
     * Rythm 2#2000
     * ID: 252128902418268161
     * Hex: #0070ff
     */
    r2: {
      name: "Rythm 2",
      image: "r2",
      invite: "invite2",
      dashboard: "app/r2"
    } as Rythm,
    /**
     * Rythm 3#0817
     * ID: 814675737331105832
     * Hex: #db00ff
     */
    r3: {
      name: "Rythm 3",
      image: "r3",
      invite: "invite3",
      dashboard: "app/r3"
    } as Rythm,
    /**
     * Rythm 4#0952
     * ID: 814675803065155585
     * Hex: #46af2c
     */
    r4: {
      name: "Rythm 4",
      image: "r4",
      invite: "invite4",
      dashboard: "app/r4"
    } as Rythm,
    /**
     * Rythm 5#6171
     * ID: 814675864859836417
     * Hex: #33bed1
     */
    r5: {
      name: "Rythm 5",
      image: "r5",
      invite: "invite5",
      dashboard: "app/r5"
    } as Rythm,
    /**
     * Rythm 6#8453
     * ID: 836330384530735196
     * Hex: #8844e9
     */
    r6: {
      name: "Rythm 6",
      image: "r6",
      invite: "invite6",
      dashboard: "app/r6"
    } as Rythm,
    /**
     * Rythm 7#8724
     * ID: 836330611337330768
     * Hex: #f1963a
     */
    r7: {
      name: "Rythm 7",
      image: "r7",
      invite: "invite7",
      dashboard: "app/r7"
    } as Rythm,
    /**
     * Rythm 8#4115
     * ID: 836330724990517248
     * Hex: #3fe08b
     */
    r8: {
      name: "Rythm 8",
      image: "r8",
      invite: "invite8",
      dashboard: "app/r8"
    } as Rythm,
    /**
     * Rythm 9#1961
     * ID: 836330845538877461
     * Hex: #db2c6b
     */
    r9: {
      name: "Rythm 9",
      image: "r9",
      invite: "invite9",
      dashboard: "app/r9"
    } as Rythm,
    /**
     * Rythm 10#4379
     * ID: 836330954972725289
     * Hex: #e3ef39
     */
    r10: {
      name: "Rythm 10",
      image: "r10",
      invite: "invite10",
      dashboard: "app/r10"
    } as Rythm,
    /**
     * Rythm-chan#1001
     * ID: 826622077615341569
     * Hex: #fe7f9d
     */
    rchan: {
      name: "Rythm-chan",
      image: "rchan",
      invite: "invitechan",
      dashboard: "app/rchan"
    } as Rythm,
    /**
     * Rythm Canary#8406
     * ID: 415062217596076033
     * Hex: #efa613
     */
    rc: {
      name: "Rythm Canary",
      image: "rc",
      invite: "invitecanary",
      dashboard: "app/rc"
    } as Rythm
  },
  /**
   * String separator
   */
  separator = "•",
  /**
   * Namespace letiable name
   */
  namespaceLetiable = "apiNamespace",
  /**
   * Socket URL letiable name
   */
  socketUrlLetiable = "apiWebsocketUrl";

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
 * Get or guess Rythm info
 * @param namespace API namespace
 */
function getRythm(namespace: apiNamespace): Rythm {
  if (Object.prototype.hasOwnProperty.call(rythms, namespace)) {
    // Get the Rythm name for known namespaces
    return rythms[namespace];
  } else if (/^r\d+$/.test(namespace)) {
    // Try to guess the name for unknown namespaces that match the default schema
    const number = parseInt(namespace.slice(1));
    return {
      name: `Rythm ${number}`,
      image: namespace,
      invite: `invite${number}`,
      dashboard: `app/${namespace}`
    } as Rythm;
  } else {
    // Otherwise use the default namespace
    return rythms.r1;
  }
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
      buttonViewSong: "general.buttonViewSong",
      openDashboard: "rythm.openDashboard",
      inviteBot: "rythm.inviteBot",
      djs: "rythm.djs",
      users: "rythm.users",
      requestedBy: "rythm.requestedBy"
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

    // Get information about the Rythm to which the presence is currently connected to
    const rythm = getRythm(namespace);

    // Set the large image to the logo of the corresponding Rythm bot
    presenceData.largeImageKey = rythm.image;

    // Add the open dashboard button if buttons should be displayed
    if (showButtons) {
      presenceData.buttons = [
        {
          label: (await strings).openDashboard,
          url: `https://${host}/${rythm.dashboard}`
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
        presenceData.state = (await strings).requestedBy.replace(
          "{0}",
          apiData.playingTrack.enqueuer[
            showNicknames ? "displayName" : "username"
          ]
        );
      }

      // Add the view song button if buttons should be displayed
      if (showButtons) {
        presenceData.buttons.push({
          label: (await strings).buttonViewSong,
          url: apiData.playingTrack.uri
        });
      }

      // Add the Rythm version name and separator
      presenceData.smallImageText = `${rythm.name} ${separator} `;

      // Check if the song isn't paused
      if (apiData.isPaused === false) {
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
        presenceData.smallImageText += (await strings).pause;
      }
    } else {
      // Add the invite bot button if buttons should be displayed
      if (showButtons) {
        presenceData.buttons.push({
          label: (await strings).inviteBot,
          url: `https://${host}/${rythm.invite}`
        });
      }

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
          presenceData.state = `${(await strings).djs.replace(
            "{0}",
            djAmount.toString()
          )} ${separator} ${(await strings).users.replace(
            "{0}",
            userAmount.toString()
          )}`;
        }
      } else {
        // Check the idle time
        if (idleStamp === 0) idleStamp = Date.now() / 1000;

        // Add idle information
        presenceData.details = "Dashboard";
        presenceData.startTimestamp = idleStamp;
      }
    }

    presence.setActivity(presenceData);
    presence.setTrayTitle(`${rythm.name} ${separator} Dashboard`);
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
