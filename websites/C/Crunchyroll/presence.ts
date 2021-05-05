var presence = new Presence({
    clientId: "608065709741965327"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    reading: "presence.activity.reading",
    viewManga: "general.viewManga",
    watchEpisode: "general.buttonViewEpisode",
    manga: "general.manga"
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

var lastPlaybackState = null;
var playback: boolean;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

var iFrameVideo: any, currentTime: any, duration: any, paused: any;

presence.on("iFrameData", (data: any) => {
  playback = data.iframe_video !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (!playback && document.location.pathname.includes("/manga")) {
    let reading: boolean = false;

    if(document.location.pathname.includes("/read")) {
      browsingStamp = Math.floor(Date.now() / 1000);
      let title = document.querySelector(".chapter-header a").innerHTML;
      let currChapter = document.querySelector(".chapter-header").innerHTML.split("</a>")[1].split("\n")[0];
      let currPage = document.querySelector(".first-page-number").innerHTML;
      currPage = currPage == "" ? "1" : currPage;
      let lastPage = document.querySelector(".images").children.length;

      presenceData.details = title;
      presenceData.state = `${(await strings).reading} ${currChapter}`;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "book_open";
      presenceData.smallImageText = `Page ${currPage}/${lastPage}`;
      presenceData.buttons = [{
        "label": "Read Chapter",
        "url": document.location.toString()
      }];

      reading = true;
    } else if(document.location.pathname.includes("/volumes"))  {
      let title = document.querySelector(".ellipsis").innerHTML.split("&gt;")[1];

      presenceData.details = (await strings).viewManga;
      presenceData.state = title;
      presenceData.buttons = [{
        "label": "View " + (await strings).manga,
        "url": document.location.toString()
      }];
      reading = false;
    } else {

      presenceData.details = (await strings).browse;
      presenceData.startTimestamp = browsingStamp;

      delete presenceData.state;
      delete presenceData.smallImageKey;

      reading = true;
    }

    presence.setActivity(presenceData, reading);
  }

  if (!playback && !document.location.pathname.includes("/manga")) {
    presenceData.details = (await strings).browse;
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  if (iFrameVideo !== false && !isNaN(duration)) {
    var videoTitle: any, episod: any, episode: any, epName: any;

    videoTitle = document.querySelector(".ellipsis .text-link span");
    episod = document.querySelectorAll("#showmedia_about_media h4");
    epName = document.querySelector("h4#showmedia_about_name");
    episode = episod[1].innerText + " - " + epName.innerText;

    var timestamps = getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    );
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(
      paused
        ? ""
        : videoTitle !== null
        ? videoTitle.innerText
        : "Title not found..."
    );

    presenceData.details =
      videoTitle !== null ? videoTitle.innerText : "Title not found...";
    presenceData.state = episode;

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {

      presenceData.buttons = [{ 
        "label": (await strings).watchEpisode,
        "url": document.location.toString()
      }];
      presence.setActivity(presenceData, !paused);
    }
  }
});
