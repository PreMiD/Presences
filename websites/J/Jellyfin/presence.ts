// official website
const JELLYFIN_URL = "jellyfin.org";

// web client app name
const APP_NAME = "Jellyfin Web";

// all the presence art assets uploaded to discord
const PRESENCE_ART_ASSETS = {
  download: "downloading",
  live: "live",
  logo: "banner-icon",
  pause: "pause",
  play: "play",
  read: "reading",
  search: "search",
  write: "writing"
};

const presenceData: PresenceData = {
  largeImageKey: PRESENCE_ART_ASSETS.logo
};

let ApiClient, ApiClientt;

// generic log style for PMD_[info|error|success] calls
const GENERIC_LOG_STYLE = "font-weight: 800; padding: 2px 5px; color: white;";

/**
 * PMD_info - log into the user console info messages
 *
 * @param  {string} txt text to log into the console
 */
function PMD_info(message): void {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    GENERIC_LOG_STYLE + "border-radius: 25px 0 0 25px; background: #596cae;",
    GENERIC_LOG_STYLE + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

let presence;

/**
 * handleAudioPlayback - handles the presence when the audio player is active
 */
function handleAudioPlayback(): void {
  // sometimes the buttons are not created fast enough
  try {
    const audioElem = document.getElementsByTagName("audio")[0];
    const infoContainer = document.getElementsByClassName("nowPlayingBar")[0];
    const buttons = infoContainer.querySelectorAll("button.itemAction");

    presenceData.details = `Listening to: ${
      buttons.length >= 1 ? buttons[0].textContent : "unknown title"
    }`;
    presenceData.state = `By: ${
      buttons.length >= 2 ? buttons[1].textContent : "unknown artist"
    }`;

    // playing
    if (!audioElem.paused) {
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
      presenceData.smallImageText = "Playing";
      presenceData.endTimestamp = new Date(
        Date.now() + (audioElem.duration - audioElem.currentTime) * 1000
      ).getTime();

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
    return ApiClientt["_currentUser"]["Id"];
  } catch (e) {
    const servers = JSON.parse(localStorage.getItem("jellyfin_credentials"))
      .Servers;

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
const media = [];

/**
 * obtainMediaInfo - obtain the metadata of the given id
 *
 * @param  {string} itemId id of the item to get metadata of
 * @return {object}        metadata of the item
 */
async function obtainMediaInfo(itemId): Promise<any> {
  if (media[itemId]) {
    if (media[itemId] !== "pending") {
      return media[itemId];
    }

    return;
  }

  media[itemId] = "pending";

  fetch(`/Users/${getUserId()}/Items/${itemId}`, {
    credentials: "include",
    headers: {
      "x-emby-authorization": `MediaBrowser Client="${ApiClientt["_appName"]}", Device="${ApiClientt["_deviceName"]}", DeviceId="${ApiClientt["_deviceId"]}", Version="${ApiClientt["_appVersion"]}", Token="${ApiClientt["_serverInfo"]["AccessToken"]}"`
    }
  })
    .then((resp) => resp.json())
    .then((json) => {
      media[itemId] = json;
      return media[itemId];
    });
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

  const videoPlayerElem = document.getElementsByTagName("video")[0];

  // this variables content will be replaced in details and status properties on presenceData
  let title;
  let subtitle;

  // title on the header
  const headerTitleElem = document.querySelector("h3.pageTitle");

  // title on the osdControls
  const osdTitleElem = videoPlayerPage.querySelector("h3.osdTitle");

  // media metadata
  let mediaInfo;

  const videoPlayerContainerElem = document.body.getElementsByClassName(
    "videoPlayerContainer"
  )[0];

  // no background image, we're playing live tv
  if ((videoPlayerContainerElem as HTMLVideoElement).style.backgroundImage) {
    // with this url we can obtain the id of the item we are playing back
    const backgroundImageUrl = (videoPlayerContainerElem as HTMLVideoElement).style.backgroundImage
      .split('"')[1]
      .replace(ApiClientt["_serverAddress"], "");

    mediaInfo = await obtainMediaInfo(backgroundImageUrl.split("/")[2]);
  } else {
    // simulate the expected data
    mediaInfo = {
      Type: "TvChannel"
    };
  }

  // display generic info
  if (!mediaInfo) {
    title = "Watching unknown content";
    subtitle = "No metadata could be obtained";
  } else {
    switch (mediaInfo.Type) {
      case "Movie":
        title = "Watching a Movie";
        subtitle = osdTitleElem.textContent;
        break;
      case "Series":
        title = `Watching ${headerTitleElem.textContent}`;
        subtitle = osdTitleElem.textContent;
        break;
      case "TvChannel":
        title = "Watching Live Tv";
        subtitle = osdTitleElem.textContent;
        break;
      default:
        title = `Watching ${mediaInfo.Type}`;
        subtitle = mediaInfo.Name;
    }
  }

  // watching live tv
  if (mediaInfo && mediaInfo.Type === "TvChannel") {
    presenceData.smallImageKey = PRESENCE_ART_ASSETS.live;
    presenceData.smallImageText = "Live TV";

    // playing
  } else if (!videoPlayerElem.paused) {
    presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
    presenceData.smallImageText = "Playing";
    presenceData.endTimestamp = new Date(
      Date.now() +
        (videoPlayerElem.duration - videoPlayerElem.currentTime) * 1000
    ).getTime();

    // paused
  } else {
    presenceData.smallImageKey = PRESENCE_ART_ASSETS.pause;
    presenceData.smallImageText = "Paused";
    delete presenceData.endTimestamp;
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
    handleAudioPlayback();
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
    case "mypreferenceslanguages.html": // languages
    case "mypreferencessubtitles.html": // subtitles
      presenceData.state = "On user preferences";
      break;

    // admin dashboard
    case "dashboard.html": // server section
    case "dashboardgeneral.html": // general
    case "userprofiles.html": // user profiles
    case "useredit.html": // editing user profile
    case "library.html": // managing library
    case "librarydisplay.html": // library display settings
    case "metadataimages.html": // library metadata settings
    case "metadatanfo.html": // library NFO settings
    case "encodingsettings.html": // encoding settings // devices section
    case "devices.html": // devices
    case "device.html": // editing device
    case "serveractivity.html": // server activity
    case "dlnasettings.html": // dlna settings // live tv section
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

    case "itemdetails.html":
      await handleItemDetails();
      break;

    case "videoosd.html":
      await handleVideoPlayback();
      break;

    case "nowplaying.html":
      presenceData.state = "Viewing the audio playlist";
      break;
  }
}

/**
 * setDefaultsToPresence - set defaul values to the presenceData object
 */
function setDefaultsToPresence(): void {
  if (presenceData.smallImageKey) {
    delete presenceData.smallImageKey;
  }
  if (presenceData.smallImageText) {
    delete presenceData.smallImageText;
  }
  if (presenceData.startTimestamp) {
    delete presenceData.startTimestamp;
  }
  if (presenceData.endTimestamp) {
    delete presenceData.endTimestamp;
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
    ApiClientt = await presence.getPageletiable("ApiClient");
  } else {
    ApiClientt = ApiClient;
  }

  if (ApiClientt && typeof ApiClientt === "object") {
    if (ApiClientt["_appName"] && ApiClientt["_appName"] === APP_NAME) {
      return true;
    }
  }

  return false;
}

/**
 * updateData - tick function, this is called several times a second by UpdateData event
 */
async function updateData(): Promise<void> {
  setDefaultsToPresence();

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

  // force the display of some counter
  if (!presenceData.startTimestamp || !presenceData.endTimestamp) {
    presenceData.startTimestamp = Date.now();
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
  let validPage = false;

  // jellyfin website
  if (location.host === JELLYFIN_URL) {
    validPage = true;
    PMD_info("Jellyfin website detected");

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
          PMD_info("Jellyfin web client detected");
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

    presence.on("UpdateData", updateData);
  }
}
init();
