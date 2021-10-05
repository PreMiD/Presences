const presence = new Presence({
    clientId: "630093952342687794" // CLIENT ID FOR YOUR PRESENCE
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
  title: HTMLElement,
  views: HTMLElement,
  air: HTMLElement,
  search: string,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  lastPlaybackState: boolean,
  playback: boolean;

interface IFrameData {
  iframeVideo: {
    dur: number;
    iFrameVideo: boolean;
    paused: boolean;
    currTime: number;
  };
}

if (
  document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode")
) {
  presence.on("iFrameData", (data: IFrameData) => {
    playback = data.iframeVideo.dur !== null ? true : false;

    if (playback) {
      ({ iFrameVideo, paused } = data.iframeVideo);
      currentTime = data.iframeVideo.currTime;
      duration = data.iframeVideo.dur;
    }
  });
}

presence.on("UpdateData", async () => {
  if (lastPlaybackState !== playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
  const [startTimestamp, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "aniflix",
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
      startTimestamp,
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
    if (iFrameVideo === true && !isNaN(duration)) {
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
    } else if (iFrameVideo === null && isNaN(duration)) {
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
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
    presenceData.startTimestamp = browsingStamp;
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
    presenceData.startTimestamp = browsingStamp;
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
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/airing") {
    presenceData.details = "Viewing the calendar";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/all") {
    presenceData.details = "Viewing the list";
    presenceData.state = "of all shows";
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/about") {
    presenceData.details = "Viewing the about page";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing the main page";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
