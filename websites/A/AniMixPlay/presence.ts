const presence = new Presence({
    clientId: "787739407720513596"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let endTimestamp,
  video,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback;

presence.on(
  "iFrameData",
  (data: {
    iframeVideo: {
      duration: number;
      iFrameVideo: boolean;
      currentTime: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframeVideo.duration !== null ? true : false;
    if (playback)
      ({ iFrameVideo, currentTime, duration, paused } = data.iframeVideo);
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo-v2",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("q")) {
      presenceData.details = "Currently searching for...";
      presenceData.state = `"${urlParams.get("q")}"`;
      presenceData.smallImageKey = "browsing-v1";
      presenceData.smallImageText = (await strings).browsing;
    } else if (urlParams.get("genre")) {
      presenceData.details = "Currently exploring...";
      presenceData.state = `${urlParams
        .get("genre")
        .toLowerCase()
        .replace(/,/g, " + ")} related anime`;
      presenceData.smallImageKey = "browsing-v1";
      presenceData.smallImageText = "Exploring...";
    } else if (urlParams.get("season") && urlParams.get("year")) {
      presenceData.details = "Currently exploring...";
      presenceData.state = `${urlParams.get("season").toLowerCase()} ${urlParams
        .get("year")
        .toLowerCase()} anime`;
      presenceData.smallImageKey = "browsing-v1";
      presenceData.smallImageText = "Exploring...";
    } else {
      presenceData.details = "Currently browsing...";
      presenceData.smallImageKey = "browsing-v1";
      presenceData.smallImageText = (await strings).browsing;
    }
  } else if (new RegExp("^/v.").test(document.location.pathname)) {
    if (iFrameVideo) {
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    } else {
      video = document.querySelector<HTMLVideoElement>(
        "#playercontainer > div > div.plyr__video-wrapper > video"
      );
      ({ currentTime, duration, paused } = video);
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    }
    const title = document.querySelector(
        "#aligncenter > span.animetitle"
      ).textContent,
      episode = document
        .querySelector("#eptitle > span#eptitleplace")
        .textContent.replace(/\D/g, "");

    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause-v1" : "play-v1";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;
      presenceData.details = `Watching ${title}`;
      presenceData.state = `Episode ${episode}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("/anime/")) {
    const animepagetitle =
        document.querySelector("#animepagetitle").textContent,
      animepagetype = document
        .querySelector("#addInfo")
        .textContent.split(" ")[5]
        .trim();
    presenceData.details = "Currently reading...";
    presenceData.state = `${animepagetitle} (${animepagetype})`;
    presenceData.smallImageKey = "reading-v1";
    presenceData.smallImageText = "Reading...";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
