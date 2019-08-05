var presence = new Presence({
  clientId: "607754656453623843",
  mediaKeys: true
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

var live, elapsed, oldURL;

presence.on("UpdateData", async () => {
  var video: HTMLVideoElement = document.querySelector(
    "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.persistent-player.tw-border-radius-none > div > div.video-player.video-player--logged-in > div > div.player-video > video"
  );

  var live_indicator = document.querySelector(
    "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div:nth-child(1) > div > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-justify-content-between.tw-mg-x-3 > div.tw-align-items-stretch.tw-flex.tw-flex-nowrap.tw-flex-shrink-0 > div.channel-header__banner-toggle.channel-header__user.channel-header__user--selected.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-pd-r-2.tw-pd-y-05 > div > div.tw-mg-l-1 > div > div.tw-align-center.tw-border-radius-small.tw-c-text-overlay.tw-channel-status-text-indicator.tw-font-size-6.tw-inline-block.tw-pd-x-05 > p"
  );

  if (live_indicator) {
    live = true;
  } else {
    live = false;
  }

  if (window.location.href !== oldURL) {
    oldURL = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (video && !isNaN(video.duration)) {
    if (!live) {
      var title = document.querySelector(
        "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.tw-full-height > div.channel-root__player-container.tw-pd-b-2 > div > div.tw-c-background-base.tw-elevation-1 > div > div.tw-flex-grow-1.tw-full-height.tw-pd-x-1.tw-pd-y-1.video-description__info-container > div > div > div.video-info__container > div.tw-mg-b-05 > p"
      );
      var streamer = document.querySelector(
        "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div:nth-child(1) > div > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-justify-content-between.tw-mg-x-3 > div.tw-align-items-stretch.tw-flex.tw-flex-nowrap.tw-flex-shrink-0 > a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05 > div > h5"
      );
      var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
    } else {
      var title = document.querySelector(
        "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.tw-full-height > div.channel-root__player-container.tw-pd-b-2 > div > div.channel-info-bar.tw-border-b.tw-border-bottom-left-radius-large.tw-border-bottom-right-radius-large.tw-border-l.tw-border-r.tw-border-t.tw-flex.tw-flex-wrap.tw-justify-content-between.tw-lg-pd-b-0.tw-lg-pd-t-1.tw-lg-pd-x-1.tw-pd-1 > div > div > div > div.channel-info-bar__content-right.tw-full-width > div.tw-flex.tw-justify-content-between.tw-mg-b-05 > h2"
      );
      var streamer = document.querySelector(
        "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div:nth-child(1) > div > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-justify-content-between.tw-mg-x-3 > div.tw-align-items-stretch.tw-flex.tw-flex-nowrap.tw-flex-shrink-0 > div.channel-header__banner-toggle.channel-header__user.channel-header__user--selected.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-pd-r-2.tw-pd-y-05 > div > h5"
      );
      var timestamps: number[] = [elapsed, undefined];
    }

    var data: presenceData = {
      details: title.textContent,
      state: streamer.textContent,
      largeImageKey: "twitch",
      smallImageKey: video.paused ? "pause" : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };

    if (live) {
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    } else if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && streamer !== null) {
      presence.setActivity(data, !video.paused);
      presence.setTrayTitle(data.title);
    }
  } else {
    hub();
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var pause: HTMLButtonElement = document.querySelector(
        "#default-player > div > div.hover-display.pl-hover-transition-in > div > div.pl-controls-bottom.pl-flex.qa-controls-bottom > div.player-buttons-left > button"
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
      "#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div.directory-header-new__banner-cover.tw-overflow-hidden.tw-relative > div.tw-bottom-0.tw-left-0.tw-mg-b-2.tw-mg-t-3.tw-mg-x-3.tw-right-0 > div > div.tw-flex.tw-flex-column.tw-full-width.tw-justify-content-center > div.tw-flex.tw-justify-content-between.tw-mg-b-1.tw-relative > h1"
    ).textContent;
    details = "Browsing Game";
    if (game) state = game;
  }

  var user = location.match("/(\\S*)/(\\S*)");
  if (user) {
    details = "Browsing";
    state = user[1] + "'s " + user[2];
  }

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
