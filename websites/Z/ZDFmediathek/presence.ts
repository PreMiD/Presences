let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const presence = new Presence({
    clientId: "854999470357217290"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "general.browsing",
    browsingThrough: "discord.browseThrough",
    buttonWatchVideo: "general.buttonWatchVideo",
    buttonWatchStream: "general.buttonWatchStream"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "zdf"
    },
    path = location.pathname.replace(/\/?$/, "/"),
    video: HTMLVideoElement = document.querySelector(
      "div.zdfplayer-video_wrapper video"
    );

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (video !== null) {
    if (path.startsWith("/live-tv")) {
      // Livestream
      const liveVideo: HTMLVideoElement = document.querySelector(
          "div.item.livetv-item.js-livetv-scroller-cell.m-activated-done.m-activated.m-active.m-active-done div figure div video"
        ),
        mediathekLivechannel = document
          .querySelector(
            "div.item.livetv-item.js-livetv-scroller-cell.m-active-done.m-activated-done.m-activated.m-active h2[class='visuallyhidden']"
          )
          .innerHTML.replace(/ {2}/g, " ")
          .replace(/ im Livestream/g, "")
          .replace(/ Livestream/g, ""),
        videoInfoResults = document.getElementsByClassName(
          "zdfplayer-teaser-title"
        );

      let videoInfoTag = null;
      for (let i = 0; i < videoInfoResults.length; i++) {
        if (
          videoInfoResults[i].innerHTML
            .toLowerCase()
            .includes(` ${mediathekLivechannel.toLowerCase()} `) ||
          videoInfoResults[i].innerHTML
            .toLowerCase()
            .includes(`>${mediathekLivechannel.toLowerCase()}<`)
        ) {
          videoInfoTag = videoInfoResults[i].innerHTML;
          break;
        }
      }
      const videoTitle = videoInfoTag
        .substring(videoInfoTag.lastIndexOf(">") + 1, videoInfoTag.length - 1)
        .trim();

      presenceData.largeImageKey = mediathekLivechannel.toLowerCase();
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = "Live";
      presenceData.details = `${mediathekLivechannel} Live`;
      presenceData.state = videoTitle;
      presenceData.startTimestamp = elapsed;
      presenceData.buttons = [
        { label: (await strings).buttonWatchStream, url: prevUrl }
      ];

      if (liveVideo.paused) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
        presenceData.startTimestamp = 0;
        presenceData.endTimestamp = 0;
      }
    } else {
      // Video-on-demand
      presenceData.largeImageKey = "zdf";
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = (await strings).play;

      const videoInfoTag = document.querySelector(
          ".zdfplayer-teaser-title"
        ).innerHTML,
        showTitleTag = videoInfoTag.substring(
          videoInfoTag.indexOf(">") + 1,
          videoInfoTag.lastIndexOf("<")
        ),
        episodeTitle = videoInfoTag
          .substring(videoInfoTag.lastIndexOf(">") + 1, videoInfoTag.length - 1)
          .trim(),
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );

      presenceData.state = episodeTitle;
      presenceData.details = showTitleTag.includes("|")
        ? showTitleTag.substring(
            showTitleTag.indexOf("|") + 1,
            showTitleTag.length
          )
        : showTitleTag;
      [, presenceData.endTimestamp] = timestamps;
      presenceData.buttons = [
        { label: (await strings).buttonWatchVideo, url: prevUrl }
      ];
      if (video.paused) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else {
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = (await strings).browsingThrough;
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = elapsed;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
