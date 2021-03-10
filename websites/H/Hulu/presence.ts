const presence = new Presence({
    clientId: "607719679011848220"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

function capitalize(text: string): string {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

let elapsed: number = undefined,
  oldUrl: string = undefined,
  header,
  title,
  item;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null,
    details = undefined,
    state = undefined,
    smallImageKey = undefined,
    smallImageText = undefined,
    startTimestamp = undefined,
    endTimestamp = undefined;

  const href = window.location.href,
    path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  details = "Browsing";
  state = undefined;
  startTimestamp = elapsed;

  if (path.includes("/hub")) {
    header = document.querySelector(".Hub__title");
    title = document.querySelector(".SimpleModalNav__title");
    details = "Viewing Category";
    if (header) {
      state = header.textContent;
      if (title) {
        state = state + ` (${title.textContent})`;
      }
    }
  } else if (path.includes("/genre")) {
    header = document.querySelector(".Hub__title");
    title = document.querySelector(".SimpleModalNav__title");
    details = "Viewing Genre";
    if (header) {
      state = header.textContent;
      if (title) {
        state = state + ` (${title.textContent})`;
      }
    }
  } else if (path.includes("/series")) {
    title = document.querySelector(".Masthead__title");
    item = document.querySelector(".Subnav__item.active");
    details = "Viewing Series";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.includes("/movie")) {
    title = document.querySelector(".Masthead__title");
    item = document.querySelector(".Subnav__item.active");
    details = "Viewing Movie";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.includes("/network")) {
    const brand: HTMLImageElement = document.querySelector(
      ".SimpleModalNav__brandImage"
    );
    item = document.querySelector(".Subnav__item.active");
    details = "Viewing Network";
    if (brand) {
      state = brand.alt;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.includes("/sports_episode")) {
    title = document.querySelector(".Masthead__title");
    item = document.querySelector(".Subnav__item.active");
    details = "Viewing Sports Episode";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.includes("/sports_team")) {
    title = document.querySelector(".Masthead__title");
    item = document.querySelector(".Subnav__item.active");
    details = "Viewing Sports Team";
    if (title) {
      state = title.textContent;
      if (item) {
        state = state + `'s ${item.textContent}`;
      }
    }
  } else if (path.includes("/search")) {
    const input: HTMLInputElement = document.querySelector(".cu-search-input");
    details = "Searching";
    smallImageKey = "search";
    smallImageText = (await strings).search;
    if (input && input.value.length > 0) {
      state = input.value;
    }
  } else if (path.includes("/live")) {
    const category = document.querySelector(
      ".LiveGuide__filter-item--selected"
    );
    title = document.querySelector(".ModalHeader__showname");
    details = "Viewing Live";
    if (category) {
      state = capitalize(category.textContent);
      if (title) {
        state = state + ` (${title.textContent})`;
      }
    }
  } else if (path.includes("/my-stuff")) {
    details = "Viewing My Stuff";
  } else if (path.includes("/manage-dvr")) {
    item = document.querySelector(".Subnav__item.active");
    details = "Viewing My DVR";
    if (item) {
      state = capitalize(item.textContent);
    }
  } else if (path.includes("/watch")) {
    video = document.querySelector(".content-video-player");
    if (video) {
      title = document.querySelector(".metadata-area__second-line");
      const content = document.querySelector(".metadata-area__third-line"),
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        live = timestamps[1] === Infinity;
      details = "Watching";
      if (title) {
        details = title.textContent;
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
    } else {
      video = document.querySelector("video#content-video-player");
      details = "Viewing Watch History";
      if (video) {
        title = document.querySelector(
          "#web-player-app div.PlayerMetadata__titleText"
        );
        const content = document.querySelector(
            "#web-player-app div.PlayerMetadata__subTitle"
          ),
          timestamps = presence.getTimestamps(
            Math.floor(video.currentTime),
            Math.floor(video.duration)
          ),
          live = timestamps[1] === Infinity;
        details = "Watching";
        if (title) {
          details = title.textContent;
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
  }

  const data: PresenceData = {
    details: details,
    state: state,
    largeImageKey: "hulu",
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp
  };
  presence.setActivity(data, video ? !video.paused : true);
  presence.setTrayTitle(details);
});
