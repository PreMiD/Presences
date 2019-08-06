var presence = new Presence({
  clientId: "607754656453623843",
  mediaKeys: true
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

var title,
streamer,
largeImage = "twitch",
smallImageKey,
smallImageText,
videoTime,
videoDuration,
live,
elapsed,
oldURL,
type,
logging = false;

presence.on("UpdateData", async () => {
  var elements = {
    squad: {
      users: document.querySelector(
        "div.tw-align-items-center.tw-flex.tw-flex-row.tw-mg-l-1.tw-pd-l-05 > div.tw-align-items-center.tw-flex.tw-mg-l-1"
      ),
      user: index => {
        return document.querySelector(
          `div:nth-child(${index}) > div > div.tw-absolute.tw-balloon.tw-balloon--down.tw-hide > div > div > div > div.tw-flex.tw-flex-column.tw-flex-grow-1.tw-pd-b-1.tw-pd-t-4.tw-pd-x-1 > div.tw-align-center.tw-flex.tw-flex-column.tw-justify-content-center > p > a`
        );
      }
    },
    live: {
      title: document.querySelector(
        "div.tw-flex.tw-justify-content-between.tw-mg-b-05 > h2"
      ),
      streamer: document.querySelector(
        "div.channel-header__banner-toggle.channel-header__user.channel-header__user--selected.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-pd-r-2.tw-pd-y-05 > div > h5"
      )
    },
    video: {
      title: document.querySelector("div.tw-mg-b-05 > p"),
      streamer: document.querySelector(
        "a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05 > div > h5"
      ),
      time: document.querySelector("div.player-seek__time-container > span:nth-child(1)"),      
      duration: document.querySelector("span.player-seek__time.player-seek__time--total")
    },
    clip: {
      title: document.querySelector("span.tw-ellipsis.tw-font-size-5.tw-strong"),
      streamer: document.querySelector("a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05 > div > h5");
    }
  };

  if (window.location.href !== oldURL) {
    oldURL = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  var video: HTMLVideoElement = document.querySelector(
    "div.player-video > video"
  );

  var squad = document.querySelector(
    "div.squad-stream-top-bar__container.tw-align-items-center.tw-c-background-base.tw-flex.tw-flex-shrink-0.tw-relative"
  );

  if (squad) {
    type = "squad";
  } else if (elements.live.title) {
    type = "live";
  } else if (elements.video.title) {
    type = "video";
  } else if (elements.clip.title) {
    type = "clip";
  } else {
    type = "browsing"
  }

  if (logging) {
    console.log(`Type: ${type}`);
    console.log(`Video Time: ${video ? video.currentTime : 0}`)
    console.log(`Video Duration: ${video ? video.duration : 0}`)
  }

  /* Catch */
  try {
    if (type === "squad") {
      var users = [];
      var user_path = elements.squad.users;
  
      for (var index = 1; index <= user_path.children.length; index++) {
        users = users.concat(elements.squad.user(index).textContent);
      }
  
      title = "Squad Stream";
      streamer = users.join(", ");
      smallImageKey = "live";
      smallImageText = (await strings).live;
      videoTime = elapsed;
      videoDuration = undefined;
    } else if (type === "live") {
      title = elements.live.title.textContent;
      streamer = elements.live.streamer.textContent;
      smallImageKey = "live";
      smallImageText = (await strings).live;
      videoTime = elapsed;
      videoDuration = undefined;
    } else if (type === "video") {
      title = elements.video.title.textContent;
      streamer = elements.video.streamer.textContent;
      smallImageKey = video.paused ? "pause" : "play";
      smallImageText = video.paused ? (await strings).pause : (await strings).play;
      var timestamps = getElementTimestamps(elements.video.time.textContent, elements.video.duration.textContent);
      videoTime= timestamps[0];
      videoDuration = timestamps[1];
    } else if (type === "clip") {
      title = elements.clip.title.textContent;
      streamer = elements.clip.streamer.textContent;
      smallImageKey = video.paused ? "pause" : "play";
      smallImageText = video.paused ? (await strings).pause : (await strings).play;
      var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
      videoTime= timestamps[0];
      videoDuration = timestamps[1];
    } else if (type === "browsing") {
      var location = window.location.pathname;
  
      title = "Browsing"
      streamer = "Home"
      smallImageKey = undefined;
      smallImageText = undefined;
      videoTime = undefined;
      videoDuration = undefined;
  
      var user = location.match("/(\\S*)/(\\S*)");
      var user_header = document.querySelector(
        "a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05"
      );
      if (user && user_header) {
        title = "Browsing";
        streamer = user[1] + "'s " + user[2];
      }
  
      if (location.match("/directory")) {
        title = "Browsing";
        streamer = "All";
      }
  
      if (location.match("/directory/following")) {
        title = "Browsing Followers";
        streamer = "Overview";
      }
  
      if (location.match("/directory/following/live")) {
        streamer = "Channels";
      }
  
      if (location.match("/directory/following/hosts")) {
        streamer = "Hosts";
      }
  
      if (location.match("/directory/following/games")) {
        streamer = "Categories";
      }
      
      if (location.match("/directory/game")) {
        var game = document.querySelector(
          "div.tw-flex.tw-justify-content-between.tw-mg-b-1.tw-relative > h1"
        ).textContent;
        title = "Browsing Game";
        if (game) streamer = game;
      }
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
      presence.setTrayTitle(data.title);
    }
  } catch (error) {}

});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var pause: HTMLButtonElement = document.querySelector(
        "div.player-buttons-left > button"
      );
      if (pause) pause.click();
      break;
  }
});

function hub() {
  var details = "Browsing";
  var state = undefined;

  var location = window.location.pathname;

  if (location.match("/directory")) {
    details = "Browsing";
    state = "All";
  }

  if (location.match("/directory/following")) {
    details = "Browsing Followers";
    state = "Overview";
  }

  if (location.match("/directory/following/live")) {
    state = "Channels";
  }

  if (location.match("/directory/following/hosts")) {
    state = "Hosts";
  }

  if (location.match("/directory/following/games")) {
    state = "Categories";
  }
  
  if (location.match("/directory/game")) {
    var game = document.querySelector(
      "div.tw-flex.tw-justify-content-between.tw-mg-b-1.tw-relative > h1"
    ).textContent;
    details = "Browsing Game";
    if (game) state = game;
  }
  /*
  var user = location.match("/(\\S*)/(\\S*)");
  var user_header = document.querySelector(
    "a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05"
  );
  if (user && user_header) {
    details = "Browsing";
    state = user[1] + "'s " + user[2];
  }
  */


  presence.setActivity(
    {
      details: details,
      state: state,
      largeImageKey: "twitch"
    },
    true
  );
}

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getElementTimestamps(audioTime: string, audioDuration: string) {
  var splitAudioTime = audioTime.split(":").reverse();
  var splitAudioDuration = audioDuration.split(":").reverse();

  var parsedAudioTime = getTime(splitAudioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getTime(list: string[]) {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}