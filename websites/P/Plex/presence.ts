var presence = new Presence({
    clientId: "645028677033132033"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var language = window.navigator.language; //Make this change-able with presence settings
//en = English
//nl = Nederlands
//Language list can be found here: https://api.premid.app/v2/langFile/list

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

/**
 * Send PreMiD error message in console of browser
 * @param message the message that you want to be sent in console
 */
function PMD_error(message: string): void {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

/**
 * Get Translation
 * @param stringName Name of string you want to get
 */
function getTranslation(stringName: string): string {
  switch (stringName) {
    case "HomePage":
      switch (language) {
        case "nl":
          return "Bekijkt de startpagina";
          break;
        case "de":
          return "Ist auf der Startseite";
          break;
        default:
          return "Viewing home page";
          break;
      }
      break;
    case "News":
      switch (language) {
        case "nl":
          return "Bladeren door het niews";
          break;
        case "de":
          return "Sieht sich News an";
          break;
        default:
          return "Browsing news";
          break;
      }
      break;
    case "WebShows":
      switch (language) {
        case "nl":
          return "Bladeren door alle shows";
          break;
        case "de":
          return "Sieht sich Shows an";
          break;
        default:
          return "Browsing shows";
          break;
      }
      break;
    case "Podcasts":
      switch (language) {
        case "nl":
          return "Bladeren door podcasts";
          break;
        case "de":
          return "Sieht sich Podcasts an";
          break;
        default:
          return "Browsing podcasts";
          break;
      }
      break;
    case "Music":
      switch (language) {
        case "nl":
          return "Bladeren door muziek";
          break;
        case "de":
          return "Sieht sich Musik an";
          break;
        default:
          return "Browsing music";
          break;
      }
      break;
    case "Search":
      switch (language) {
        case "nl":
          return "Zoekt naar:";
          break;
        case "de":
          return "Sucht nach:";
          break;
        default:
          return "Searching for:";
          break;
      }
      break;
    case "Library":
      switch (language) {
        case "nl":
          return "Bekijkt bibliotheek:";
          break;
        case "de":
          return "Ist in der Bibliothek:";
          break;
        default:
          return "Viewing library:";
          break;
      }
      break;
    case "Collection":
      switch (language) {
        case "nl":
          return "Bekijkt collectie:";
          break;
        case "de":
          return "Ist in der Kollektion";
          break;
        default:
          return "Viewing collection:";
          break;
      }
      break;
    case "Playlist":
      switch (language) {
        case "nl":
          return "Bekijkt afspeellijst:";
          break;
        case "de":
          return "Ist in der Playlist";
          break;
        default:
          return "Viewing playlist:";
          break;
      }
      break;
    default:
      PMD_error(
        "Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.gg/premid)"
      );
      return "Unknown stringName";
      break;
  }
}

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var search: any;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "plex"
  };

  if (document.querySelector("#plex") !== null) {
    if (
      document.querySelector("#plex > div:nth-child(7) > div > div > video") !==
        null ||
      document.querySelector("#plex > div:nth-child(7) > div > div > audio") !==
        null
    ) {
      var currentTime: any,
        duration: any,
        paused: any,
        timestamps: any,
        video: HTMLVideoElement;
      video =
        document.querySelector(
          "#plex > div:nth-child(7) > div > div > video"
        ) ||
        document.querySelector("#plex > div:nth-child(7) > div > div > audio");
      currentTime = video.currentTime;
      duration = video.duration;
      paused = video.paused;
      timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      user =
        document.querySelector(
          "#plex > div:nth-child(7) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > a"
        ) ||
        document.querySelector(
          "#plex > div:nth-child(7) > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div > a"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div.ControlsContainer-controlsContainer-1Wn7vp > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span:nth-child(1)"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div:nth-child(2) > div > div > div.PlayerControls-controls-e59abb.PlayerControls-hasLandscapePoster-23Gat5 > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div.PlayerControlsMetadata-container-2wqMfv > a"
        ) ||
        document.querySelector(
          "#plex > div > div > div > div > div > div > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a"
        );
      title =
        document.querySelector(
          "#plex > div:nth-child(7) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > span > a"
        ) ||
        document.querySelector(
          "#plex > div:nth-child(7) > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div > span"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div.AudioVideoInfoBar-container-2ewFys > div:nth-child(1)"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span"
        ) ||
        document.querySelector(
          "#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div:nth-child(2) > div > div > div.PlayerControls-controls-e59abb.PlayerControls-hasLandscapePoster-23Gat5 > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div.PlayerControlsMetadata-container-2wqMfv > span"
        ) ||
        document.querySelector(
          "#plex > div > div > div > div > div > div > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span"
        );
      presenceData.details = user.textContent;
      if (title) {
        title = (title.textContent || "").split("—");
        presenceData.state = title[1] || title[0];
        if (title.length > 1) {
          var chapterNumber: string = title[0].replace("·", "-");
          presenceData.state = `${chapterNumber} - ${presenceData.state}`;
        }
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (document.URL.includes("/tv.plex.provider.webshows")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("WebShows");
    } else if (document.URL.includes("/tv.plex.provider.news")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("News");
    } else if (document.URL.includes("/tv.plex.provider.podcasts")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Podcasts");
    } else if (document.URL.includes("/tv.plex.provider.music")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Music");
    } else if (document.URL.includes("/search")) {
      search = document.querySelector(
        "#content > div > div > div:nth-child(2) > div > div:nth-child(2) > span"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Search");
      presenceData.state = search.textContent.split('"')[1].replace('"', "");
      presenceData.smallImageKey = "search";
    } else if (document.URL.includes("/com.plexapp.plugins.library")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Library");
      presenceData.state = document.querySelector(
        "#content > div > div > div:nth-child(2) > div > div > div > a > div"
      ).textContent;
    } else if (document.URL.includes("content.collections")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Collection");
      presenceData.state = document.querySelector(
        "#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span"
      ).textContent;
    } else if (
      document.URL.includes("content.playlists") &&
      document.querySelector(
        "#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span"
      ) !== null
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Playlist");
      presenceData.state = document.querySelector(
        "#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span"
      ).textContent;
    } else if (
      document.URL == "https://app.plex.tv/" ||
      document.URL == "https://app.plex.tv/desktop" ||
      document.URL == "https://app.plex.tv/desktop#" ||
      document.location.pathname == "/web/index.html" ||
      document.location.pathname == "/web/index.html#"
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("HomePage");
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
});
