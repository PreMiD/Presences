const presence = new Presence({
    clientId: "645028677033132033"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  language = window.navigator.language; //Make this change-able with presence settings
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
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

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
        case "de":
          return "Ist auf der Startseite";
        case "sv":
          return "Kollar på startsidan";
        default:
          return "Viewing home page";
      }
    case "News":
      switch (language) {
        case "nl":
          return "Bladeren door het niews";
        case "de":
          return "Sieht sich News an";
        case "sv":
          return "Bläddrar igenom nyheter";
        default:
          return "Browsing news";
      }
    case "WebShows":
      switch (language) {
        case "nl":
          return "Bladeren door alle web shows";
        case "de":
          return "Sieht sich Web-Shows an";
        case "sv":
          return "Bläddrar igenom web shows";
        default:
          return "Browsing web shows";
      }
    case "Podcasts":
      switch (language) {
        case "nl":
          return "Bladeren door podcasts";
        case "de":
          return "Sieht sich Podcasts an";
        case "sv":
          return "Bläddrar igenom podcasts";
        default:
          return "Browsing podcasts";
      }
    case "Music":
      switch (language) {
        case "nl":
          return "Bladeren door muziek";
        case "de":
          return "Sieht sich Musik an";
        case "sv":
          return "Bläddrar igenom musik";
        default:
          return "Browsing music";
      }
    case "Search":
      switch (language) {
        case "nl":
          return "Zoekt naar:";
        case "de":
          return "Sucht nach:";
        case "sv":
          return "Söker efter:";
        default:
          return "Searching for:";
      }
    case "Library":
      switch (language) {
        case "nl":
          return "Bekijkt bibliotheek:";
        case "de":
          return "Ist in der Bibliothek:";
        case "sv":
          return "Kollar på bibliotek:";
        default:
          return "Viewing library:";
      }
      break;
    case "Collection":
      switch (language) {
        case "nl":
          return "Bekijkt collectie:";
        case "de":
          return "Ist in der Kollektion";
        case "sv":
          return "Kollar på samling:";
        default:
          return "Viewing collection:";
      }

    case "Playlist":
      switch (language) {
        case "nl":
          return "Bekijkt afspeellijst:";
        case "de":
          return "Ist in der Playlist";
        case "sv":
          return "Kollar på spellista:";
        default:
          return "Viewing playlist:";
      }
    case "Vod":
      switch (language) {
        case "nl":
          return "Bekijkt Film/TV Show/VOD:";
        case "de":
          return "Schaut Film/TV-Sendung/VOD:";
        case "sv":
          return "Kollar på Film/TV Show/VOD:";
        default:
          return "Viewing Movie/TV Show/VOD:";
      }
    default:
      PMD_error(
        "Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.premid.app)"
      );
      return "Unknown stringName";
  }
}

const browsingStamp = Math.floor(Date.now() / 1000);

let user, title, search;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "plex"
  };

  if (document.querySelector("#plex") !== null) {
    if (document.querySelector("#plex > div:nth-child(4) > div") !== null) {
      const video: HTMLVideoElement = document.querySelector(
          "#plex > div:nth-child(4) > div > div:nth-child(1) > video"
        ),
        currentTime = video.currentTime,
        duration = video.duration,
        paused = video.paused,
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      user =
        document.querySelector(
          "#plex > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > a"
        ) ||
        document.querySelector(
          "#plex > div:nth-child(4) > div > div:nth-child(4) > div > div > div:nth-child(2) > div:nth-child(1) > div > a"
        );
      title =
        document.querySelector(
          "#plex > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span"
        ) ||
        document.querySelector(
          "#plex > div:nth-child(4) > div > div:nth-child(4) > div > div > div:nth-child(2) > div:nth-child(1) > div > span"
        );
      presenceData.details = user.textContent;
      if (title) {
        title = (title.textContent || "").split("—");
        presenceData.state = title[1] || title[0];
        if (title.length > 1) {
          const chapterNumber: string = title[0].replace("·", " - ");
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
      const title = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span"
      );
      if (title !== null) {
        presenceData.details = "Viewing webshow:";
        presenceData.state = title.textContent;
      }
    } else if (document.URL.includes("/tv.plex.provider.news")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("News");
    } else if (document.URL.includes("/tv.plex.provider.podcasts")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Podcasts");
      const title = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span"
      );
      if (title !== null) {
        presenceData.details = "Viewing podcast:";
        presenceData.state = title.textContent;
      }
    } else if (document.URL.includes("/tv.plex.provider.music")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Music");
      const title = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span"
      );
      if (title !== null) {
        presenceData.details = "Viewing album:";
        presenceData.state = title.textContent;
      }
    } else if (document.URL.includes("/search")) {
      search = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(2) > span"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Search");
      presenceData.state = search.textContent.split('"')[1].replace('"', "");
      presenceData.smallImageKey = "search";
    } else if (document.URL.includes("/com.plexapp.plugins.library")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Library");
      presenceData.state = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a > div:nth-child(1)"
      ).textContent;
    } else if (document.URL.includes("content.collections")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Collection");
      presenceData.state = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span"
      ).textContent;
    } else if (
      document.URL.includes("content.playlists") &&
      document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span"
      ) !== null
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Playlist");
      presenceData.state = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span"
      ).textContent;
    } else if (document.URL.includes("tv.plex.provider.vod")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Vod");
      presenceData.state = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > span"
      ).textContent;
    } else if (document.URL.includes("/server/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = getTranslation("Vod");
      const title = document.querySelector(
        "#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > span"
      );
      presenceData.state = title.textContent;
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
