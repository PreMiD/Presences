const presence = new Presence({
  clientId: "735588731637203080"
});
const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browse: "presence.activity.browsing"
});

const getElement = (query: string): string | undefined => {
  return document.querySelector(query)?.textContent;
};

const getTimestamps = (
  videoTime: number,
  videoDuration: number
): Array<number> => {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), Math.floor(endTime)];
};

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const statics = {
  "/": {
    details: "Browsing...",
    state: "Home"
  },
  "/myshazam/": {
    details: "Viewing Page...",
    state: "My Shazam"
  },
  "/apps/": {
    details: "Viewing Page...",
    state: "Mobile App"
  },
  "/company/": {
    details: "Viewing Page...",
    state: "About Shazam"
  },
  "/terms/": {
    details: "Viewing Page...",
    state: "Terms of Service"
  },
  "/privacy/": {
    details: "Viewing Page...",
    state: "Privacy Policy"
  }
};

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/");

  const showSong = await presence.getSetting("song");
  const showTimestamps = await presence.getSetting("timestamp");

  const song: HTMLVideoElement = document.querySelector("#audioctrl");
  const songPlaying = song ? !song.paused : false;

  let data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "shazam",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: elapsed,
    endTimestamp: undefined
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  for (const [k, v] of Object.entries(statics)) {
    if (path.match(k)) {
      data = { ...data, ...v };
    }
  }

  if (showSong && songPlaying) {
    data.details = getElement(".track .heading");
    data.state = getElement(".track .subheading");
    data.smallImageKey = "play";
    data.smallImageText = (await strings).play;

    const timestamps = getTimestamps(song.currentTime, song.duration);
    data.startTimestamp = timestamps[0];
    data.endTimestamp = timestamps[1];
  }

  if (!songPlaying) {
    if (path.includes("/charts/")) {
      data.details = "Viewing Charts...";
      data.state = getElement(".quicklinks-content > li:not(.show-link)");
    }

    if (path.includes("/track/")) {
      data.details = "Viewing Track...";
      data.state = `${getElement(".details h1")} by ${getElement(
        ".details h2"
      )}`;
    }

    if (path.includes("/artist/")) {
      data.details = "Viewing Artist...";
      data.state = getElement(".details h1");
    }
  }

  if (data.details) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    if (!showTimestamps) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
