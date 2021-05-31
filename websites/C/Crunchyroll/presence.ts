const presence = new Presence({
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

let lastPlaybackState = null,
  playback: boolean,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean;

interface iFrameData {
  iframe_video: {
    iFrameVideo: boolean;
    currTime: number;
    dur: number;
    paused: boolean;
  };
}

presence.on("iFrameData", (data: iFrameData) => {
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
    if (document.location.pathname.includes("/read")) {
      const title = document.querySelector(".chapter-header a").innerHTML,
        currChapter = document
          .querySelector(".chapter-header")
          .innerHTML.split("</a>")[1]
          .split("\n")[0],
        lastPage = document.querySelector(".images").children.length,
        currPage =
          document.querySelector(".first-page-number").innerHTML === ""
            ? "1"
            : document.querySelector(".first-page-number").innerHTML;

      presenceData.details = title;
      presenceData.state = `${(await strings).reading} ${currChapter}`;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "book_open";
      presenceData.smallImageText = `Page ${currPage}/${lastPage}`;
      presenceData.buttons = [
        {
          label: "Read Chapter",
          url: document.location.toString()
        }
      ];
    } else if (document.location.pathname.includes("/volumes")) {
      const title = document
        .querySelector(".ellipsis")
        .innerHTML.split("&gt;")[1];

      presenceData.details = (await strings).viewManga;
      presenceData.state = title;
      presenceData.buttons = [
        {
          label: "View " + (await strings).manga,
          url: document.location.toString()
        }
      ];
    } else {
      presenceData.details = (await strings).browse;
      presenceData.startTimestamp = browsingStamp;

      delete presenceData.state;
      delete presenceData.smallImageKey;
    }

    presence.setActivity(presenceData);
  }

  if (!playback && !document.location.pathname.includes("/manga")) {
    presenceData.details = (await strings).browse;
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  if (iFrameVideo !== false && !isNaN(duration)) {
    const videoTitle = document.querySelector(".ellipsis .text-link span"),
      episod = document.querySelectorAll("#showmedia_about_media h4"),
      epName = document.querySelector("h4#showmedia_about_name"),
      episode = episod[1].innerHTML + " - " + epName.innerHTML,
      timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(
      paused
        ? ""
        : videoTitle !== null
        ? videoTitle.innerHTML
        : "Title not found..."
    );

    presenceData.details =
      videoTitle !== null ? videoTitle.innerHTML : "Title not found...";
    presenceData.state = episode;

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presenceData.buttons = [
        {
          label: (await strings).watchEpisode,
          url: document.location.toString()
        }
      ];
      presence.setActivity(presenceData, !paused);
    }
  }
});
