var presence = new Presence({
  clientId: "607719679011848220",
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live",
  search: "presence.activity.searching",
});

var elapsed = undefined,
  oldUrl = undefined;

presence.on("UpdateData", async () => {
  var video: HTMLVideoElement = null,
    details = undefined,
    state = undefined,
    smallImageKey = undefined,
    smallImageText = undefined,
    startTimestamp = undefined,
    endTimestamp = undefined;

  var href = window.location.href;
  var path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  details = "Browsing";
  state = undefined;
  startTimestamp = elapsed;

  if (path.match("/hub")) {
    var header = document.querySelector(".Hub__title");
    var title = document.querySelector(".SimpleModalNav__title");
    details = "Viewing Category";
    if (header) {
      state = header.textContent;
      if (title) {
        state = state + ` (${title.textContent})`;
      }
    }
  } else if (path.match("/genre")) {
    var header = document.querySelector(".Hub__title");
    var title = document.querySelector(".SimpleModalNav__title");
    details = "Viewing Genre";
    if (header) {
      state = header.textContent;
      if (title) {
        state = state + ` (${title.textContent})`;
      }
    }
  } else if (path.match("/series")) {
    var title = document.querySelector(".Masthead__title");
    var item = document.querySelector(".Subnav__item.active");
    details = "Viewing Series";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.match("/movie")) {
    var title = document.querySelector(".Masthead__title");
    var item = document.querySelector(".Subnav__item.active");
    details = "Viewing Movie";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.match("/network")) {
    var brand: HTMLImageElement = document.querySelector(
      ".SimpleModalNav__brandImage"
    );
    var item = document.querySelector(".Subnav__item.active");
    details = "Viewing Network";
    if (brand) {
      state = brand.alt;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.match("/sports_episode")) {
    var title = document.querySelector(".Masthead__title");
    var item = document.querySelector(".Subnav__item.active");
    details = "Viewing Sports Episode";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.match("/sports_team")) {
    var title = document.querySelector(".Masthead__title");
    var item = document.querySelector(".Subnav__item.active");
    details = "Viewing Sports Team";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.match("/search")) {
    var input: HTMLInputElement = document.querySelector(".cu-search-input");
    details = "Searching";
    smallImageKey = "search";
    smallImageText = (await strings).search;
    if (input && input.value.length > 0) {
      state = input.value;
    }
  } else if (path.match("/live")) {
    var category = document.querySelector(".LiveGuide__filter-item--selected");
    var title = document.querySelector(".ModalHeader__showname");
    details = "Viewing Live";
    if (category) {
      state = capitalize(category.textContent);
      if (title) {
        state = state + ` (${title.textContent})`;
      }
    }
  } else if (path.match("/my-stuff")) {
    details = "Viewing My Stuff";
  } else if (path.match("/manage-dvr")) {
    var item = document.querySelector(".Subnav__item.active");
    details = "Viewing My DVR";
    if (item) {
      state = capitalize(item.textContent);
    }
  } else if (path.match("/watch")) {
    video = document.querySelector(".video-player");
    details = "Viewing Watch History";
    if (video) {
      var title = document.querySelector(".metadata-area__second-line");
      var content = document.querySelector(".metadata-area__third-line");
      var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      var live = timestamps[1] === Infinity;
      details = "Watching";
      if (title) {
        details = `Watching ${title.textContent}`;
      }
      if (content && content.textContent.length > 0) {
        state = content.textContent;
      }
      smallImageKey = live ? "live" : video.paused ? "pause" : "play";
      smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play;
      startTimestamp = live ? elapsed : timestamps[0];
      endTimestamp = live ? undefined : timestamps[1];
      if (video.paused) {
        startTimestamp = undefined;
        endTimestamp = undefined;
      }
    }
  }

  var data: presenceData = {
    details: details,
    state: state,
    largeImageKey: "hulu",
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp,
  };

  if (data) {
    presence.setActivity(data, video ? !video.paused : true);
    presence.setTrayTitle(details);
  }
});

function capitalize(text: string) {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
