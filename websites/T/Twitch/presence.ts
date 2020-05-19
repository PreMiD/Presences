var presence = new Presence({
  clientId: "607754656453623843"
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
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

function getTime(list: string[]): number {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getElementTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  var splitAudioTime = audioTime.split(":").reverse();
  var splitAudioDuration = audioDuration.split(":").reverse();

  var parsedAudioTime = getTime(splitAudioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getElement(query: string): HTMLElement {
  return document.querySelector(query);
}

var title,
  streamer,
  largeImage = "twitch",
  smallImageKey,
  smallImageText,
  videoTime,
  videoDuration,
  elapsed,
  oldURL,
  type,
  logging = false;

presence.on("UpdateData", async () => {
  var elements = {
    squad: {
      users: getElement(
        ".tw-align-items-center.tw-flex.tw-mg-l-1:nth-child(2)"
      ),
      user: (index): Element => {
        return document.querySelectorAll(
          ".tw-interactive.tw-link.tw-link--hover-underline-none.tw-link--inherit"
        )[index];
      }
    },
    live: {
      label: getElement(".video-player .tw-channel-status-text-indicator"),
      title:
        getElement(".tw-ellipsis.tw-font-size-5.tw-word-break-word") ||
        getElement(
          ".channel-info-bar__content-container .tw-font-size-4.tw-line-height-body"
        ),
      streamer:
        getElement(".tw-c-text-base.tw-line-height-heading.tw-strong") ||
        getElement(
          ".channel-header-user-tab__user-content .tw-font-size-5.tw-white-space-nowrap"
        ),
      host: getElement(".video-player-hosting-ui__header .tw-c-text-overlay")
    },
    moderator: {
      title:
        getElement(".tw-ellipsis.tw-font-size-5.tw-line-clamp-2") ||
        getElement(".tw-c-text-overlay.tw-font-size-5"),
      streamer:
        getElement(".tw-ellipsis.tw-font-size-5.tw-line-height-heading") ||
        getElement(
          "p > a.tw-interactive.tw-link.tw-link--button.tw-link--overlay"
        ),
      live:
        getElement(".tw-font-size-6.tw-semibold.tw-upcase") ||
        getElement(".tw-font-size-6.tw-semibold.tw-upcase")
    },
    video: {
      title: getElement(
        ".channel-root__player-container .tw-font-size-4.tw-strong > span"
      ),
      streamer:
        getElement(".tw-c-text-base.tw-line-height-heading.tw-strong") ||
        getElement(
          ".channel-header-user-tab__user-content .tw-font-size-5.tw-white-space-nowrap"
        ),
      time: getElement(".vod-seekbar-time-labels > p:nth-child(1)"),
      duration: getElement(".vod-seekbar-time-labels > p:nth-child(2)")
    },
    clip: {
      title: getElement(
        ".channel-root__player-container .tw-font-size-4.tw-strong > span"
      ),
      streamer:
        getElement(".tw-c-text-base.tw-line-height-heading.tw-strong") ||
        getElement(
          ".channel-header-user-tab__user-content .tw-font-size-5.tw-white-space-nowrap"
        )
    }
  };

  if (window.location.href !== oldURL) {
    oldURL = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  var video: HTMLVideoElement = document.querySelector("video");

  var squad = getElement(".squad-stream-top-bar__container");

  if (squad) {
    type = "squad";
  } else if (
    (elements.live.title && elements.live.streamer && elements.live.label) ||
    elements.live.host
  ) {
    type = "live";
  } else if (elements.moderator.title && elements.moderator.streamer) {
    type = "moderator";
  } else if (
    elements.video.title &&
    elements.video.streamer &&
    elements.video.time &&
    elements.video.duration
  ) {
    type = "video";
  } else if (elements.clip.title && elements.clip.streamer) {
    type = "clip";
  } else {
    type = "browsing";
  }

  if (logging) {
    console.log(`Type: ${type}`);
    console.log(`Video Time: ${video ? video.currentTime : 0}`);
    console.log(`Video Duration: ${video ? video.duration : 0}`);
  }

  try {
    var timestamps = null;

    if (type === "squad") {
      var users = [];
      var user_path = elements.squad.users;

      for (var index = 0; index <= user_path.children.length - 1; index++) {
        users = users.concat(elements.squad.user(index).textContent);
      }

      title = "Squad Stream";
      streamer = users.join(", ");
      smallImageKey = "live";
      smallImageText = (await strings).live;
      videoTime = elapsed;
      videoDuration = undefined;
    } else if (type === "live" || type === "moderator") {
      if (type !== "moderator") {
        title = elements.live.title
          ? elements.live.title.textContent
          : elements.live.host.textContent;
        streamer = elements.live.streamer.textContent;
      }
      if (window.location.pathname.includes("/moderator")) {
        title = elements.moderator.title.textContent;
        streamer = `Moderating ${elements.moderator.streamer.textContent}`;
      }
      if (elements.moderator.live.textContent === "Online" || type === "live") {
        smallImageKey = "live";
        smallImageText = (await strings).live;
      }
      videoTime = elapsed;
      videoDuration = undefined;
    } else if (type === "video") {
      title = elements.video.title.textContent;
      streamer = elements.video.streamer.textContent;
      smallImageKey = video.paused ? "pause" : "play";
      smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      timestamps = getElementTimestamps(
        elements.video.time.textContent,
        elements.video.duration.textContent
      );
      videoTime = timestamps[0];
      videoDuration = timestamps[1];
    } else if (type === "clip") {
      title = elements.clip.title.textContent;
      streamer = elements.clip.streamer.textContent;
      smallImageKey = video.paused ? "pause" : "play";
      smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      videoTime = timestamps[0];
      videoDuration = timestamps[1];
    } else if (type === "browsing") {
      var location = window.location.pathname;

      title = "Browsing...";
      streamer = undefined;
      smallImageKey = undefined;
      smallImageText = undefined;
      videoTime = undefined;
      videoDuration = undefined;

      var user = location.match("/(\\S*)/(\\S*)");
      var user_header = getElement(".tw-bold.tw-font-size-2");

      if (elements.live.streamer && user && user_header) {
        streamer = elements.live.streamer.textContent + "'s " + user[2];
      }

      if (location.includes("/directory")) {
        streamer = "Categories";
      }

      if (location.includes("/directory/all")) {
        streamer = "Live";
      }

      if (location.includes("/directory/following")) {
        title = "Browsing Following";
        streamer = "Overview";
      }

      if (location.includes("/directory/following/live")) {
        streamer = "Live";
      }

      if (location.includes("/directory/following/videos")) {
        streamer = "Videos";
      }

      if (location.includes("/directory/following/hosts")) {
        streamer = "Hosts";
      }

      if (location.includes("/directory/following/games")) {
        streamer = "Categories";
      }

      if (location.includes("/directory/following/channels")) {
        streamer = "Channels";
      }

      if (location.includes("/directory/esports")) {
        streamer = "Esports";
      }

      if (location.includes("/directory/game")) {
        title = "Browsing Game";
        streamer = document.querySelector(
          ".tw-flex.tw-justify-content-between.tw-relative > h1"
        ).textContent;
      }
    }
  } catch (err) {
    console.log("Error! Please contact dev of this presence.");
    console.error(err);
  }

  var data: presenceData = {
    details: title,
    state: streamer,
    largeImageKey: largeImage,
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: videoTime,
    endTimestamp: videoDuration
  };

  if (video && video.paused) {
    delete data.startTimestamp;
    delete data.endTimestamp;
  }

  if (title !== null && streamer !== null) {
    presence.setActivity(data, video ? !video.paused : true);
    presence.setTrayTitle(title);
  }
});
