const presence = new Presence({
    clientId: "641402862961950733"
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
  const startTime = Date.now(),
   endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const browsingStamp = Math.floor(Date.now() / 1000);
 let episodeTitle: string,
 dramaTitle: string,
 currentTime: number,
  duration: number,
  paused: boolean,
  playback: boolean;
  
presence.on("iFrameData", (data: {iframe_video: {currTime: number, duration:number, paused:boolean, iFrameVideo:boolean}}) => {
  playback = data.iframe_video.duration !== null ? true : false;

  //console.log(data.iframe_video);
  //console.log(document.location.pathname);

  if (playback) {
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.duration;
    paused = data.iframe_video.paused;
  }
});
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ka"
  },
  episodeSelection = document.querySelector("div#all-episodes");
  if (document.location.hostname == "kissasian.la") {
    if (document.location.pathname == "/") {
      const searchField: HTMLInputElement = document.querySelector("input[type='search'].search-field");
      if (searchField.value !== ""){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching for";
        presenceData.state = searchField.value;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
      }
    } else if (document.querySelector("header.entry-header > div.entry-meta") && document.querySelector("header.entry-header > div.entry-meta").textContent.toLowerCase().includes("posted")) {
      presenceData.startTimestamp = browsingStamp;
      const userElement = document.querySelector(
        "h1.entry-title"
      );
      presenceData.details = "Reading post:";
      presenceData.state = userElement.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.querySelector("div.synopsis")) {
      presenceData.startTimestamp = browsingStamp;
      const userElement = document.querySelector(
        "header.entry-header"
      );
      presenceData.details = "Viewing drama:";
      presenceData.state = userElement.textContent;
      presenceData.smallImageKey = "reading";
    } else if (episodeSelection) {
      episodeTitle = document
        .querySelector("div#player-content > header > h1").textContent;
        // .textContent.replace("information", "")
        // .replace("Drama", "");
      dramaTitle = document
      .querySelector(".meta-cat > a").textContent;

      const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = dramaTitle;
        presenceData.state = episodeTitle.replace(dramaTitle.trim(), "");

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking at:";
        presenceData.state = episodeTitle;
      }
    } else if (document.location.pathname.includes("/asian-drama-list/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing drama list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/tag/most-popular/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing most popular dramas";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/drama/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing dramas";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/movies/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing movies";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/latest-asian-drama-releases/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing lastest asian drama releases";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/latest-kshow-releases/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing lastest kshow releases";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/asian-movie-list/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing movie list";
      presenceData.smallImageKey = "reading";
    } 
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
