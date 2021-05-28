const presence = new Presence({
    clientId: "630093952342687794" // CLIENT ID FOR YOUR PRESENCE
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let title: HTMLElement,
  views: HTMLElement,
  air: HTMLElement,
  search: string,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  lastPlaybackState = null,
  playback;
if (
  document.querySelector(
    "#view-wrapper > div:nth-child(2) > div > div.episode"
  ) !== null
) {
  presence.on(
    "iFrameData",
    (data: {
      iframeVideo: {
        iFrameVideo: boolean;
        paused: boolean;
        currentTime: number;
        duration: number;
      };
    }) => {
      playback = data.iframeVideo.duration !== null ? true : false;

      if (playback)
        ({ iFrameVideo, paused, currentTime, duration } = data.iframeVideo);
    }
  );
}

if (lastPlaybackState !== playback) lastPlaybackState = playback;

presence.on("UpdateData", async () => {
  const [, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "aniflix",
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
      endTimestamp
    };

  search = document.querySelector<HTMLInputElement>(
    "#searchbar > div > input[type=text]"
  ).value;
  if (
    document.querySelector(
      "#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > h1"
    ) !== null
  ) {
    if (iFrameVideo && !isNaN(duration)) {
      title = document.querySelector(
        "#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > a"
      );
      views = document.querySelector(
        "#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > div.episode-number"
      );
      presenceData.state = `${title.innerText} (${views.innerText})`;

      air = document.querySelector(
        "#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > h1"
      );
      presenceData.details = air.innerText;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      presence.setActivity(presenceData);
    } else if (!iFrameVideo && isNaN(duration)) {
      delete presenceData.endTimestamp;

      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > a"
      );
      views = document.querySelector(
        "#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > div.episode-number"
      );
      presenceData.state = `${title.innerText} (${views.innerText})`;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    }
  } else if (search !== "" && search.length >= 2) {
    presenceData.details = "Searching for:";
    presenceData.state = search;
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    presenceData.smallImageKey = "search";
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/show/") &&
    document.location.pathname.includes("/reviews")
  ) {
    title = document.querySelector(
      "#view-wrapper > div > div > div.reviews-header > div"
    );
    presenceData.details = "Viewing reviews of show:";
    presenceData.state = title.innerText.replace("Reviews zu ", "");
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/show/")) {
    title = document.querySelector(
      "#view-wrapper > div.show > div > div.header-wrapper > div.show-header > div > div:nth-child(1) > div.name-wrapper > h1"
    );
    presenceData.details = "Viewing show:";
    presenceData.state = title.innerText;
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/airing") {
    presenceData.details = "Viewing the calendar";
    delete presenceData.state;
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/all") {
    presenceData.details = "Viewing the list";
    presenceData.state = "of all shows";
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/about") {
    presenceData.details = "Viewing the about page";
    delete presenceData.state;
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing the main page";
    delete presenceData.state;
    delete presenceData.endTimestamp;

    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
