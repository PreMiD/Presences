/*
 * The interfaces may have some things missing,
 * I've tried to set as many properties as I could find.
 */

interface ApiClient {
  enableAutomaticBitrateDetection: boolean;
  enableAutomaticNetworking: boolean;
  lastDetectedBitrate: number;
  lastDetectedBitrateTime: number; // timestamp
  lastFetch: number; // timestamp
  lastPlaybackProgressReport: number;
  lastPlaybackProgressReportTicks: number;
  manualAddressOnly: boolean;
  _appName: string;
  _appVersion: string;
  _currentUser: {
    Configuration: {
      AudioLanguagePreference: string;
      DisplayCollectionsView: boolean;
      DisplayMissingEpisodes: boolean;
      EnableLocalPassword: boolean;
      EnableNextEpisodeAutoPlay: boolean;
      // GroupedFolders: Array; // don't know type of content of the array
      HidePlayedInLatest: boolean;
      // LatestItemsExcludes: Array; // don't know type of content of the array
      // MyMediaExcludes: Array; // don't know type of content of the array
      OrderedViews: Array<string>;
      PlayDefaultAudioTrack: boolean;
      RememberAudioSelections: boolean;
      RememberSubtitleSelections: boolean;
      SubtitleLanguagePreference: string;
      SubtitleMode: string;
    };
    HasConfiguredEasyPassword: boolean;
    HasConfiguredPassword: boolean;
    HasPassword: boolean;
    Id: string;
    LastActivityDate: string; // date, ex: "2020-05-30T21:51:23.9732162Z"
    LastLoginDate: string; // date, ex: "2020-05-30T21:51:23.9732162Z"
    Name: string;
    Policy: {
      // AccessSchedules: Array; // don't know type of content of the array
      AuthenticationProviderId: string;
      // BlockUnratedItems: Array; // don't know type of content of the array
      // BlockedTags: Array; // don't know type of content of the array
      EnableAllChannels: boolean;
      EnableAllDevices: boolean;
      EnableAllFolders: boolean;
      EnableAudioPlaybackTranscoding: boolean;
      EnableContentDeletion: boolean;
      // EnableContentDeletionFromFolders: Array; // don't know type of content of the array
      EnableContentDownloading: boolean;
      EnableLiveTvAccess: boolean;
      EnableLiveTvManagement: boolean;
      EnableMediaConversion: boolean;
      EnableMediaPlayback: boolean;
      EnablePlaybackRemuxing: boolean;
      EnablePublicSharing: boolean;
      EnableRemoteAccess: boolean;
      EnableRemoteControlOfOtherUsers: boolean;
      EnableSharedDeviceControl: boolean;
      EnableSyncTranscoding: boolean;
      EnableUserPreferenceAccess: boolean;
      EnableVideoPlaybackTranscoding: boolean;
      // EnabledChannels: Array; // don't know type of content of the array
      // EnabledDevices: Array; // don't know type of content of the array
      // EnabledFolders: Array; // don't know type of content of the array
      ForceRemoteSourceTranscoding: boolean;
      InvalidLoginAttemptCount: boolean;
      IsAdministrator: boolean;
      IsDisabled: boolean;
      IsHidden: boolean;
      LoginAttemptsBeforeLockout: number;
      PasswordResetProviderId: string;
      RemoteClientBitrateLimit: number;
    };
    PrimaryImageAspectRatio: number;
    PrimaryImageTag: string;
    ServerId: string;
  };
  _deviceId: string;
  _deviceName: string;
  _endPointInfo: {
    IsInNetwork: boolean;
    IsLocal: boolean;
  };
  _serverAddress: string;
  _serverInfo: {
    AccessToken: string;
    DateLastAccessed: number; // timestamp
    ExchangeToken: string;
    Id: string;
    LastConnectionMode: number;
    ManualAddress: string;
    Name: string;
    UserId: string;
    // UserLinkType: any; // unknown
    manualAddressOnly: boolean;
  };
  _serverVersion: string;
  _webSocket: {
    binaryType: string;
    bufferedAmount: number;
    extensions: string;
    protocol: string;
    readyState: number;
    url: string;
  };
}

interface MediaStream {
  Codec: string;
  TimeBase: string;
  CodecTimeBase: string;
  VideoRange: string;
  DisplayTitle: string;
  IsInterlaced: boolean;
  BitRate: number;
  RefFrames: number;
  IsDefault: boolean;
  IsForced: boolean;
  Height: number;
  Width: number;
  AverageFrameRate: number;
  RealFrameRate: number;
  Profile: string;
  Type: string;
  AspectRatio: string;
  Index: number;
  IsExternal: boolean;
  IsTextSubtitleStream: boolean;
  SupportsExternalStream: boolean;
  PixelFormat: string;
  Level: number;
}

interface MediaSource {
  Protocol: string;
  Id: string;
  Path: string;
  Type: string;
  Container: string;
  Size: number;
  Name: string;
  IsRemote: boolean;
  ETag: string;
  RunTimeTicks: number;
  ReadAtNativeFramerate: boolean;
  IgnoreDts: boolean;
  IgnoreIndex: boolean;
  GenPtsInput: boolean;
  SupportsTranscoding: true;
  SupportsDirectStream: boolean;
  SupportsDirectPlay: boolean;
  IsInfiniteStream: boolean;
  RequiresOpening: boolean;
  RequiresClosing: boolean;
  RequiresLooping: boolean;
  SupportsProbing: true;
  VideoType: string;
  MediaStreams: Array<MediaStream>;
  MediaAttachments: [];
  Formats: [];
  Bitrate: number;
  RequiredHttpHeaders: unknown;
  DefaultAudioStreamIndex: number;
}

interface ExternalUrl {
  Name: string;
  Url: string;
}

interface Person {
  Name: string;
  Id: string;
  Role: string;
  Type: string;
  PrimaryImageTag: string;
}

interface UserData {
  PlaybackPositionTicks: number;
  PlayCount: number;
  IsFavorite: boolean;
  LastPlayedDate: string; // date, ex: "2020-05-30T21:51:23.9732162Z"
  Played: boolean;
  Key: string;
}

interface Chapter {
  StartPositionTicks: number;
  Name: string;
  ImageDateModified: string; // date, ex: "2020-05-30T21:51:23.9732162Z"
}

interface MediaInfo {
  Name: string;
  OriginalTitle: string;
  ServerId: string;
  Id: string;
  Etag: string;
  DateCreated: string; // date, ex: "2020-05-30T21:51:23.9732162Z"
  CanDelete: boolean;
  CanDownload: boolean;
  HasSubtitles: boolean;
  Container: string;
  SortName: string;
  PremiereDate: string; // date, ex: "2020-05-30T21:51:23.9732162Z"
  ExternalUrls: Array<ExternalUrl>;
  MediaSources: Array<MediaSource>;
  Path: string;
  EnableMediaSourceDisplay: boolean;
  Overview: string;
  // TagLines: Array;
  // Genres: Array;
  CommunityRating: number;
  RunTimeTicks: number;
  PlayAccess: string;
  ProductionYear: number;
  IndexNumber: number;
  ParentIndexNumber: number;
  // RemoteTrailers: Array;
  ProviderIds: {
    Tvdb?: number;
  };
  IsHD: boolean;
  IsFolder: boolean;
  ParentId: number;
  Type: string;
  People: Array<Person>;
  // Studios: Array;
  // GenreItems: Array;
  ParentBackdropItemId: string;
  ParentBackdropImageTags: Array<string>;
  LocalTrailerCount: number;
  UserData: UserData;
  RecursiveItemCount: number;
  Status: string;
  SeriesName: string;
  SeriesId: string;
  SeasonId: string;
  SpecialFeatureCount: number;
  DisplayPreferencesId: string;
  // Tags: Array;
  PrimaryImageAspectRatio: number;
  SeriesPrimaryImageTag: string;
  SeasonName: string;
  MediaStreams: Array<MediaStream>;
  VideoType: string;
  ImageTags: {
    Primary: string;
  };
  // BackdropImageTags: Array;
  // ScreenshotImageTags: Array;
  SeriesStudio: string;
  Chapters: Array<Chapter>;
  LocationType: string;
  MediaType: string;
  // LockedFields: Array;
  LockData: boolean;
  Width: number;
  Height: number;
}

const // official website
  JELLYFIN_URL = "jellyfin.org",
  // web client app name
  APP_NAME = "Jellyfin Web",
  // all the presence art assets uploaded to discord
  PRESENCE_ART_ASSETS = {
    download: "downloading",
    live: "live",
    logo: "banner-icon",
    pause: "pause",
    play: "play",
    read: "reading",
    search: "search",
    write: "writing"
  },
  presenceData: PresenceData = {
    largeImageKey: PRESENCE_ART_ASSETS.logo
  };

let ApiClient: ApiClient, presence: Presence;

/**
 * handleAudioPlayback - handles the presence when the audio player is active
 */
async function handleAudioPlayback(): Promise<void> {
  // sometimes the buttons are not created fast enough
  try {
    const audioElem = document.getElementsByTagName("audio")[0],
      infoContainer = document.getElementsByClassName("nowPlayingBar")[0],
      title: HTMLAnchorElement = infoContainer
        .getElementsByClassName("nowPlayingBarText")[0]
        .querySelector("a"),
      artist: HTMLDivElement = infoContainer.getElementsByClassName(
        "nowPlayingBarSecondaryText"
      )[0] as HTMLDivElement;

    presenceData.details = `Listening to: ${
      title ? title.innerText : "unknown title"
    }`;
    presenceData.state = `By: ${artist ? artist.innerText : "unknown artist"}`;

    // playing
    if (!audioElem.paused) {
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
      presenceData.smallImageText = "Playing";

      if (await presence.getSetting("showMediaTimestamps")) {
        presenceData.endTimestamp =
          presence.getTimestampsfromMedia(audioElem)[1];
      }

      // paused
    } else {
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.pause;
      presenceData.smallImageText = "Paused";

      delete presenceData.endTimestamp;
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * handleOfficialWebsite - handle the presence while the user is in the official website
 */
function handleOfficialWebsite(): void {
  presenceData.details = "At jellyfin.org";

  switch (location.pathname) {
    case "/":
      presenceData.state = "On landing page";
      break;
    case "/posts/":
      presenceData.state = "Reading the latest posts";
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
      break;
    case "/downloads/":
      presenceData.state = "On downloads";
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.download;
      break;
    case "/contribute/":
      presenceData.state = "Learning how to contribute";
      break;
    case "/contact/":
      presenceData.state = "On contact page";
      break;
    default:
      // reading the docs
      if (location.pathname.indexOf("/docs/") === 0) {
        presenceData.state = `Reading the docs: ${document.title
          .split("|")[0]
          .trim()}`;
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
      }
  }
}

/**
 * getUserId - obtains the user id
 *
 * @return {string}  user id
 */
function getUserId(): string {
  try {
    return ApiClient["_currentUser"]["Id"];
  } catch (e) {
    const servers = JSON.parse(
      localStorage.getItem("jellyfin_credentials")
    ).Servers;

    // server id available on browser location
    if (location.hash.indexOf("?") > 0) {
      for (const param of location.hash.split("?")[1].split("&")) {
        if (param.startsWith("serverId")) {
          const serverId = param.split("=")[1];

          for (const server of servers) {
            if (server.Id === serverId) {
              return server.UserId;
            }
          }
        }
      }
    } else {
      return servers[0].UserId;
    }
  }
}

// cache the requested media
// const media: Array<MediaInfo> = [];
const media: Record<string, string | MediaInfo> = {};

/**
 * obtainMediaInfo - obtain the metadata of the given id
 *
 * @param  {string} itemId id of the item to get metadata of
 * @return {object}        metadata of the item
 */
async function obtainMediaInfo(itemId: string): Promise<string | MediaInfo> {
  const pending = "pending";
  if (media[itemId] && media[itemId] !== pending) {
    return media[itemId];
  }

  media[itemId] = pending;
  const basePath = location.pathname.replace(
      location.pathname.split("/").slice(-2).join("/"),
      ""
    ),
    baseLocation = location.protocol + "//" + location.host + basePath,
    res = await fetch(`${baseLocation}Users/${getUserId()}/Items/${itemId}`, {
      credentials: "include",
      headers: {
        "x-emby-authorization":
          `MediaBrowser Client="${ApiClient["_appName"]}",` +
          `Device="${ApiClient["_deviceName"]}",` +
          `DeviceId="${ApiClient["_deviceId"]}",` +
          `Version="${ApiClient["_appVersion"]}",` +
          `Token="${ApiClient["_serverInfo"]["AccessToken"]}"`
      }
    }),
    mediaInfo = await res.json();

  if (media[itemId] === pending) {
    media[itemId] = mediaInfo;
  }

  return media[itemId];
}

/**
 * handleVideoPlayback - handles the presence when the user is using the video player
 */
async function handleVideoPlayback(): Promise<void> {
  const videoPlayerPage = document.getElementById("videoOsdPage");

  if (videoPlayerPage === null) {
    // elements not loaded yet
    return;
  }

  const videoPlayerElem = document.getElementsByTagName(
    "video"
  )[0] as HTMLVideoElement;

  // this variables content will be replaced in details and status properties on presenceData
  let title, subtitle;

  // title on the header
  const headerTitleElem = document.querySelector(
    "h3.pageTitle"
  ) as HTMLHeadingElement;

  // media metadata
  let mediaInfo: string | MediaInfo;

  // no background image, we're playing live tv
  if (videoPlayerElem.hasAttribute("poster")) {
    const backgroundImageUrl = videoPlayerElem.getAttribute("poster");

    mediaInfo = await obtainMediaInfo(backgroundImageUrl.split("/")[4]);
  }

  // display generic info
  if (!mediaInfo) {
    title = "Watching unknown content";
    subtitle = "No metadata could be obtained";
  } else if (typeof mediaInfo === "string") {
    return;
  } else {
    switch (mediaInfo.Type) {
      case "Movie":
        title = "Watching a Movie:";
        subtitle = headerTitleElem.innerText;
        break;
      case "Series":
        title = "Watching a Series:";
        subtitle = headerTitleElem.innerText;
        break;
      case "TvChannel":
        title = "Watching Live Tv";
        subtitle = headerTitleElem.innerText;
        break;
      default:
        title = `Watching ${mediaInfo.Type}`;
        subtitle = mediaInfo.Name;
    }
    // watching live tv
    if (mediaInfo && mediaInfo.Type === "TvChannel") {
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.live;
      presenceData.smallImageText = "Live TV";

      // playing
    } else if (!videoPlayerElem.paused) {
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
      presenceData.smallImageText = "Playing";

      if (await presence.getSetting("showMediaTimestamps")) {
        presenceData.endTimestamp =
          presence.getTimestampsfromMedia(videoPlayerElem)[1];
      }

      // paused
    } else {
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.pause;
      presenceData.smallImageText = "Paused";

      delete presenceData.endTimestamp;
    }
  }

  presenceData.details = title;
  presenceData.state = subtitle;

  if (!presenceData.state) {
    delete presenceData.state;
  }
}

/**
 * handleItemDetails - handles the presence when the user is viewing the details of an item
 */
async function handleItemDetails(): Promise<void> {
  const params = location.hash.split("?")[1].split("&");
  let id;

  for (const param of params) {
    if (param.startsWith("id=")) {
      id = param.split("=")[1];
      break;
    }
  }

  const data = await obtainMediaInfo(id);

  if (!data) {
    presenceData.details = "Browsing details of an item";
    presenceData.state = "Could not get item details";
  } else if (typeof data === "string") {
    return;
  } else {
    presenceData.details = `Browsing details of: ${data.Name}`;

    switch (data.Type) {
      case "Movie":
        presenceData.state = `${data.Type} ─ ${data.OriginalTitle} (${data.ProductionYear})`;
        break;
      case "Series":
        presenceData.state = `${data.Type} ─ (${data.Status})`;
        break;
      case "Season":
        presenceData.state = `${data.Type} ─ ${data.SeriesName}`;
        break;
      case "Episode":
        presenceData.state = `${data.Type} ─ ${data.SeriesName} - ${data.SeasonName}`;
        break;
      case "Person": {
        let description = "Description not available";

        if (data.Overview) {
          description =
            data.Overview.substr(0, 40) +
            (data.Overview.length > 40 ? "..." : "");
        }
        presenceData.state = `${data.Type} ─ ${description}`;
        break;
      }
      case "MusicAlbum":
        presenceData.state = `${data.Type} ─ ${data.RecursiveItemCount} songs`;
        break;
      case "MusicArtist":
      case "TvChannel":
        presenceData.state = `${data.Type} ─ No further information available`;
        break;
      default:
        presenceData.state = "No further information available";
    }
  }
}

/**
 * handleWebClient - handle the presence while the user is in the web client
 */
async function handleWebClient(): Promise<void> {
  const audioElems = document.body.getElementsByTagName("audio");

  // audio player active
  if (
    audioElems.length > 0 &&
    audioElems[0].classList.contains("mediaPlayerAudio") &&
    audioElems[0].src
  ) {
    await handleAudioPlayback();
    return;
  }

  presenceData.details = "At web client";

  // obtain the path, on the example would return "login.html"
  // https://media.domain.tld/web/index.html#!/login.html?serverid=randomserverid
  const path = location.hash.split("?")[0].substr(3);

  switch (path) {
    case "login.html":
      presenceData.state = "Logging in";
      break;
    case "home.html":
      presenceData.state = "At home";
      break;
    case "search.html":
      presenceData.state = "Searching";
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.search;
      break;

    // user preferences
    case "mypreferencesmenu.html":
    case "myprofile.html": // profile
    case "mypreferencesdisplay.html": // display
    case "mypreferenceshome.html": // home
    case "mypreferencesplayback.html": // playback
    case "mypreferencessubtitles.html": // subtitles
      presenceData.state = "On user preferences";
      break;

    // admin dashboard
    case "dashboard.html": // server section
    case "dashboardgeneral.html": // general
    case "userprofiles.html": // user profiles
    case "useredit.html": // editing user profile
    case "userlibraryaccess.html": // editing user profile > library access
    case "userparentalcontrol.html": // editing user profile > parental control
    case "userpassword.html": // editing user profile > password
    case "library.html": // managing library
    case "librarydisplay.html": // library display settings
    case "metadataimages.html": // library metadata settings
    case "metadatanfo.html": // library NFO settings
    case "encodingsettings.html": // encoding settings > transcoding
    case "playbackconfiguration.html": // encoding settings > resume
    case "streamingsettings.html": // encoding settings > streaming
    case "devices.html": // devices
    case "device.html": // editing device
    case "serveractivity.html": // server activity
    case "dlnasettings.html": // dlna settings > settings
    case "dlnaprofiles.html": // dlna settings > profiles
    case "dlnaprofile.html": // dlna settings > add profile
    case "livetvstatus.html": // manage live tv
    case "livetvtuner.html": // add/manage tv tuner
    case "livetvguideprovider.html": // add/manage tv guide provider
    case "livetvsettings.html": // live tv settings (dvr) // advanced section
    case "networking.html": // networking
    case "apikeys.html": // api keys
    case "log.html": // logs
    case "notificationsettings.html": // notification settings
    case "installedplugins.html": // plugins
    case "availableplugins.html": // plugins catalog
    case "scheduledtasks.html": // scheduled tasks
    case "configurationpage": // plugins configuration page
      presenceData.state = "On admin dashboard";
      break;

    case "movies.html":
      presenceData.state = "Browsing movies";
      break;

    case "tv.html":
      presenceData.state = "Browsing tv series";
      break;

    case "music.html":
      presenceData.state = "Browsing music";
      break;

    case "livetv.html":
      presenceData.state = "Browsing Live TV";
      break;

    case "edititemmetadata.html":
      presenceData.state = "Editing media metadata";
      break;

    case "details":
      await handleItemDetails();
      break;

    case "video":
      await handleVideoPlayback();
      break;

    case "nowplaying.html":
      presenceData.state = "Viewing the audio playlist";
      break;
  }
}

/**
 * setDefaultsToPresence - set default values to the presenceData object
 */
async function setDefaultsToPresence(): Promise<void> {
  if (presenceData.smallImageKey) {
    delete presenceData.smallImageKey;
  }
  if (presenceData.smallImageText) {
    delete presenceData.smallImageText;
  }
  if (presenceData.startTimestamp) {
    delete presenceData.startTimestamp;
  }
  if (presenceData.endTimestamp && isNaN(presenceData.endTimestamp)) {
    delete presenceData.endTimestamp;
  }

  if (await presence.getSetting("showTimestamps")) {
    presenceData.startTimestamp = Date.now();
  }
}

/**
 * isJellyfinWebClient - imports the ApiClient variable and
 * verifies that we are in the jellyfin web client
 *
 * @return {boolean} true once the variable has been imported, otherwise false
 */
async function isJellyfinWebClient(): Promise<boolean> {
  if (!ApiClient) {
    ApiClient = await presence.getPageletiable("ApiClient");
  }

  if (ApiClient && typeof ApiClient === "object") {
    if (ApiClient["_appName"] && ApiClient["_appName"] === APP_NAME) {
      return true;
    }
  }

  return false;
}

/**
 * updateData - tick function, this is called several times a second by UpdateData event
 */
async function updateData(): Promise<void> {
  await setDefaultsToPresence();

  let showPresence = false;

  // we are on the official jellyfin page
  if (location.host.toLowerCase() === JELLYFIN_URL) {
    showPresence = true;
    handleOfficialWebsite();

    // we are on the web client and has been verified
  } else if (await isJellyfinWebClient()) {
    showPresence = true;
    await handleWebClient();
  }

  // hide start timestamp on media playback
  if (
    presenceData.smallImageKey === PRESENCE_ART_ASSETS.play ||
    presenceData.smallImageKey === PRESENCE_ART_ASSETS.pause
  ) {
    delete presenceData.startTimestamp;
  }

  // if jellyfin is detected init/update the presence status
  if (showPresence) {
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
}

/**
 * init - check if the presence should be initialized, if so start doing the magic
 */
async function init(): Promise<void> {
  let validPage = false,
    infoMessage;

  // jellyfin website
  if (location.host === JELLYFIN_URL) {
    validPage = true;
    infoMessage = "Jellyfin website detected";

    // web client
  } else {
    try {
      const data = JSON.parse(localStorage.getItem("jellyfin_credentials"));

      for (const server of data.Servers) {
        // user has accessed in the last 30 seconds, should be enough for slow connections
        if (
          Date.now() - new Date(server.DateLastAccessed).getTime() <
          30 * 1000
        ) {
          validPage = true;
          infoMessage = "Jellyfin web client detected";
        }
      }
    } catch (e) {
      validPage = false;
    }
  }

  if (validPage) {
    presence = new Presence({
      clientId: "669359568391766018"
    });

    presence.info(infoMessage);
    presence.on("UpdateData", updateData);
  }
}
init();
