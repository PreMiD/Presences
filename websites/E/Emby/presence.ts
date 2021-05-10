const
  // official website
  EMBY_URL = "emby.media",
  // web client app name
  APP_NAME = "Emby Web",
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
  // cache the requested media
  media: Array<any> = [];

let presence: Presence, ApiClient: any, ApiClientt: any;
const presenceData: PresenceData = {
  largeImageKey: PRESENCE_ART_ASSETS.logo
};

/**
 * handleOfficialWebsite - handle the presence while the user is in the official website
 */
function handleOfficialWebsite(): void {
  presenceData.details = `At ${EMBY_URL}`;

  switch (location.pathname) {
    case "/":
    case "/index.html":
      presenceData.state = "On landing page";
      break;
    case "/about.html":
      presenceData.state = "On about page";
      break;
    case "/blog.html":
      presenceData.state = "Reading the blog";
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
      break;
    case "/download.html":
      presenceData.state = "On downloads";
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.download;
      break;
    case "/premiere.html":
    case "/premiere-ext.html": // extended premiere options
    case "/premiereterms.html": // tos
      presenceData.state = "Learning about premiere";
      break;
    case "/support.html":
      presenceData.state = "On support page";
      break;
    default:
      // reading the docs
      if (location.pathname.startsWith("/community")) {
        presenceData.state = "On community page";
      } else if (
        document.querySelector(".w-pagehead > h1") &&
        document.querySelector(".w-pagehead > h1").textContent === "Emby Blog"
      ) {
        presenceData.state = "Reading the blog";
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
      }
  }
}

/**
 * isEmbyWebClient - imports the ApiClient variable and
 * verifies that we are in the emby web client
 *
 * @return {boolean} true once the variable has been imported, otherwise false
 */
async function isEmbyWebClient(): Promise<boolean> {
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
 * handleAudioPlayback - handles the presence when the audio player is active
 */
function handleAudioPlayback(): void {
  // sometimes the buttons are not created fast enough
  try {
    const audioElem = document.getElementsByTagName("audio")[0],
      infoContainer = document.getElementsByClassName("nowPlayingBar")[0],
      buttons = infoContainer.querySelectorAll("button.itemAction");

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
 * getUserId - obtains the user id
 *
 * @return {string}  user id
 */
function getUserId(): string {
  try {
    return ApiClientt["_currentUser"]["Id"];
  } catch (e) {
    const servers = JSON.parse(localStorage.getItem("servercredentials3"))
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

/**
 * obtainMediaInfo - obtain the metadata of the given id
 *
 * @param  {string} itemId id of the item to get metadata of
 * @return {object}        metadata of the item
 */
async function obtainMediaInfo(itemId: any): Promise<any> {
  if (media[itemId]) {
    if (media[itemId] !== "pending") {
      return media[itemId];
    }

    return;
  }

  media[itemId] = "pending";
  fetch(`/emby/Users/${getUserId()}/Items/${itemId}`, {
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
  const videoPlayerPage = document.querySelector("[data-type='video-osd']");

  if (videoPlayerPage === null) {
    // elements not loaded yet
    return;
  }

  const videoPlayerElem = document.getElementsByTagName("video")[0];

  // this variables content will be replaced in details and status properties on presenceData
  let title,
    subtitle;

  // title on the header
  const headerTitleElem = videoPlayerPage.querySelector("h3.videoOsdTitle"),
    // title on the osdControls
    osdParentTitleElem = videoPlayerPage.querySelector(
    "h2.videoOsdParentTitle"
  );

  // media metadata
  let mediaInfo;

  const videoPlayerContainerElem = document.body.getElementsByClassName(
    "videoPlayerContainer"
  )[0];

  // no background image, we're playing live tv
  if ((videoPlayerContainerElem as HTMLVideoElement).style.backgroundImage) {
    // with this url we can obtain the id of the item we are playing back
    const mediaId = (videoPlayerContainerElem as HTMLVideoElement).style.backgroundImage
      .split('"')[1]
      .split("/")[5];

    mediaInfo = await obtainMediaInfo(mediaId);
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
        subtitle = osdParentTitleElem.textContent;
        break;
      case "Series":
        title = `Watching ${headerTitleElem.textContent}`;
        subtitle = osdParentTitleElem.textContent;
        break;
      case "TvChannel":
        title = "Watching Live Tv";
        subtitle = osdParentTitleElem.textContent;
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
    case "startup/login.html":
    case "startup/manuallogin.html":
    case "startup/forgotpassword.html":
      presenceData.state = "Logging in";
      break;
    case "home":
      presenceData.state = "At home";
      break;
    case "search":
      presenceData.state = "Searching";
      presenceData.smallImageKey = PRESENCE_ART_ASSETS.search;
      break;

    // user preferences
    case "settings":
    case "settings/display.html": // display
    case "settings/homescreen.html": // home screen
    case "settings/playback.html": // playback
    case "settings/subtitles.html": // subtitles
    case "settings/profile.html": // profile
    case "settings/password.html": // password
    case "settings/keyboard.html": // keyboard and remote
      presenceData.state = "On user preferences";
      break;

    // admin dashboard
    case "dashboard": // server section
    case "dashboardgeneral.html": // general
    case "users": // user profiles
    case "useredit.html": // editing user profile
    case "userlibraryaccess.html": // editing user library access
    case "userparentalcontrol.html": // editing user parental control
    case "userpassword.html": // editing user password
    case "supporterkey.html": // emby premiere key
    case "librarysetup/library.html": // managing library
    case "librarysetup/advanced.html": // managing library advanced
    case "network": // network section
    case "transcoding": // transcode settings
    case "syncactivity.html": // conversions && downloads
    case "syncsettings.html": // conversions settings
    case "configurationpage": // generic config page // devices section
    case "devices": // devices
    case "devices/device.html": // editing device
    case "devices/cameraupload.html": // camera upload // live tv section
    case "livetvsetup/livetvstatus.html": // manage live tv
    case "livetvsetup/livetvtuner.html": // add/manage tv tuner
    case "livetvsetup/guideprovider.html": // add/manage tv guide provider
    case "livetvsetup/livetvsettings.html": // live tv settings (dvr) // advanced section
    case "logs": // logs
    case "notificationsettings.html": // notification settings
    case "plugins/plugins.html": // plugins
    case "plugins/plugincatalog.html": // plugins catalog
    case "plugins/addplugin.html": // add plugin
    case "scheduledtasks": // scheduled tasks
    case "scheduledtask": // scheduled task settings
    case "apikeys": // api keys
      presenceData.state = "On admin dashboard";
      break;

    case "movies":
      presenceData.state = "Browsing movies";
      break;

    case "tv":
      presenceData.state = "Browsing tv series";
      break;

    case "music":
      presenceData.state = "Browsing music";
      break;

    case "metadatamanager":
      presenceData.state = "Editing media metadata";
      break;

    case "item":
      await handleItemDetails();
      break;

    case "videoosd/videoosd.html":
      await handleVideoPlayback();
      break;

    default:
      if (path.substr(0, 3) !== "dlg") {
        presence.info(`path: ${path}`);
      }
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
 * updateData - tick function, this is called several times a second by UpdateData event
 */
async function updateData(): Promise<void> {
  setDefaultsToPresence();

  let showPresence = false;

  // we are on the official emby page
  if (location.host.toLowerCase() === EMBY_URL) {
    showPresence = true;
    handleOfficialWebsite();

    // we are on the web client and has been verified
  } else if (await isEmbyWebClient()) {
    showPresence = true;
    await handleWebClient();
  }

  // force the display of some counter
  if (!presenceData.startTimestamp || !presenceData.endTimestamp) {
    presenceData.startTimestamp = Date.now();
  }

  // if emby is detected init/update the presence status
  if (showPresence) {
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
      presence.info(JSON.stringify(presenceData));
    }
  }
}

/**
 * init - check if the presence should be initialized, if so start doing the magic
 *
 * @return {void}
 */
async function init(): Promise<void> {
  let validPage = false,
    isWebClient = false;

  // emby website
  if (location.host === EMBY_URL) {
    validPage = true;
    presence.info("Emby website detected");

    // web client
  } else {
    try {
      const data = JSON.parse(localStorage.getItem("servercredentials3"));

      for (const server of data.Servers) {
        // user has accessed in the last 30 seconds, should be enough for slow connections
        if (
          Date.now() - new Date(server.DateLastAccessed).getTime() <
          30 * 1000
        ) {
          validPage = true;
          isWebClient = true;
        }
      }
    } catch (e) {
      validPage = false;
    }
  }

  if (validPage) {
    presence = new Presence({
      clientId: "671807692297207828"
    });

    if (isWebClient) {
      presence.info("Emby web client detected");
    }

    presence.on("UpdateData", updateData);
  }
}
init();
