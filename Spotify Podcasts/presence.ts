const genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_error(message): void {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

const presence = new Presence({
    clientId: "619561001234464789"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

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

let title: any, uploader: any, search: any;
let video: any,
  videoDuration: any,
  videoCurrentTime: any,
  progress: any,
  progressduration: any,
  progress2: any,
  progressduration2: any,
  pause: any;

const browsingStamp = Math.floor(Date.now() / 1000);
let playback: boolean;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "spotify"
  };

  video = document.querySelector("span.react-contextmenu-wrapper > span > a");

  if (video !== null) {
    if (video.href.includes("/show/")) {
      playback = true;
    } else {
      playback = false;
    }
  } else {
    playback = false;
  }

  console.log(playback);

  if (!playback) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    if (
      document.location.hostname == "open.spotify.com" &&
      document.querySelector(
        ".control-button.spoticon-pause-16.control-button--circled"
      ) == null
    ) {
      if (document.location.pathname.includes("browse/featured")) {
        presenceData.details = "Browsing through the"; //general.viewList
        presenceData.state = "featured songs"; //spotify.featured
      } else if (document.location.pathname.includes("browse/podcasts")) {
        presenceData.details = "Browsing through the"; //general.viewList
        presenceData.state = "best podcasts"; //spotify.bestPodcasts
      } else if (document.location.pathname.includes("browse/charts")) {
        presenceData.details = "Browsing through"; //spotify.charts
        presenceData.state = "the charts";
      } else if (document.location.pathname.includes("browse/genres")) {
        presenceData.details = "Browsing through"; //spotify.genres
        presenceData.state = "the genres";
      } else if (document.location.pathname.includes("browse/newreleases")) {
        presenceData.details = "Browsing through the"; //spotify.latest
        presenceData.state = "latest releases";
      } else if (document.location.pathname.includes("browse/discover")) {
        presenceData.details = "Discovering new songs"; //spotify.discover
      } else if (document.location.pathname.includes("/search/")) {
        search = document.querySelector("input");
        presenceData.details = "Searching for:"; //general.searchFor general.searchSomething
        presenceData.state = search.value;
        if (search.value.length <= 3) {
          presenceData.state = "something...";
        }
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("/search")) {
        presenceData.details = "Searching for"; //general.searchSomething
        presenceData.state = "new songs";
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("collection/playlists")) {
        presenceData.details = "Browsing through"; //spotify.browse
        presenceData.state = "their playlists"; //spotify.playlists
      } else if (
        document.location.pathname.includes("collection/made-for-you")
      ) {
        presenceData.details = "Browsing through"; //spotify.browse
        presenceData.state = '"Made for you"'; //spotify.madeForYou
      } else if (document.location.pathname.includes("collection/tracks")) {
        presenceData.details = "Browsing through"; //spotify.browse
        presenceData.state = "songs that they like"; //spotify.songsLike
      } else if (document.location.pathname.includes("collection/albums")) {
        presenceData.details = "Browsing through"; //spotify.browse
        presenceData.state = "albums that they like"; //spotify.albumLike
      } else if (document.location.pathname.includes("collection/artists")) {
        presenceData.details = "Browsing through"; //spotify.browse
        presenceData.state = "artists that they like"; //spotify.artistsLike
      } else if (document.location.pathname.includes("collection/podcasts")) {
        presenceData.details = "Browsing through"; //spotify.browse
        presenceData.state = "podcasts that they like"; //spotify.podcastsLike
      } else if (document.location.pathname.includes("/playlist/")) {
        title = document.querySelector(".mo-info-name > span");
        presenceData.details = "Viewing playlist:"; //general.viewPlaylist
        presenceData.state = title.textContent;
        delete presenceData.smallImageKey;
      } else if (document.location.pathname.includes("/settings")) {
        presenceData.details = "Viewing their settings"; //general.viewAccount
        delete presenceData.smallImageKey;
      }
    } else if (document.location.hostname == "support.spotify.com") {
      presenceData.details = "Browsing through the";
      presenceData.state = "Support Center";
    } else if (document.location.hostname == "investors.spotify.com") {
      presenceData.details = "Browsing through the";
      presenceData.state = "Support Center";
    } else if (document.location.hostname == "developer.spotify.com") {
      presenceData.details = "Browsing through the";
      presenceData.state = "Spotify for Developers";
    } else if (document.location.hostname == "artists.spotify.com") {
      presenceData.details = "Browsing through the";
      presenceData.state = "Spotify for Artists";
    } else if (document.location.hostname == "newsroom.spotify.com") {
      presenceData.details = "Browsing through the";
      presenceData.state = "Spotify for Newsroom";
    } else if (document.location.hostname == "www.spotify.com") {
      if (document.location.pathname.includes("/premium")) {
        presenceData.details = "Looking at"; //general.viewing
        presenceData.state = "Spotify Premium";
        delete presenceData.smallImageKey;
      } else if (document.location.pathname.includes("/download")) {
        presenceData.details = "Downloading Spotify"; //spotify.download
        presenceData.smallImageKey = "downloading";
      } else if (document.location.pathname.includes("/account")) {
        presenceData.details = "Looking at"; //general.viewAccount
        presenceData.state = "their account";
        delete presenceData.smallImageKey;
      }
    }
    if (
      document.querySelector(
        ".control-button.spoticon-pause-16.control-button--circled"
      ) == null
    ) {
      if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
      } else {
        presence.setActivity(presenceData);
      }
    } else {
      presence.clearActivity();
    }
  } else {
    progress = document.querySelector(
      ".playback-bar__progress-time:nth-child(1)"
    );
    progress2 = progress.textContent.split(":");
    progressduration = document.querySelector(
      ".playback-bar__progress-time:nth-child(3)"
    );
    progressduration2 = progressduration.textContent.split(":");

    videoCurrentTime = progress2[0] * 60 + +progress2[1];
    videoDuration = progressduration2[0] * 60 + +progressduration2[1];

    if (
      document.querySelector(
        ".control-button.spoticon-play-16.control-button--circled"
      ) !== null
    ) {
      pause = true;
    } else {
      pause = false;
    }

    const timestamps = getTimestamps(
      Math.floor(videoCurrentTime),
      Math.floor(videoDuration)
    );

    presenceData.smallImageKey = pause ? "pause" : "play"; // if the video is paused, show the pause icon else the play button
    presenceData.smallImageText = pause
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    if (pause) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    title = document.querySelector("div.react-contextmenu-wrapper > span > a");
    uploader = document.querySelector(
      "span.react-contextmenu-wrapper > span > a"
    );
    presenceData.details = title.textContent;
    presenceData.state = uploader.textContent;
    if (title !== null && uploader !== null) {
      presence.setActivity(presenceData);
    } else {
      PMD_error("Error while getting podcast name and title");
    }
  }
});
