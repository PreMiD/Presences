const presence = new Presence({
    clientId: "640275259282686015"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: HTMLElement,
  currentTime: number,
  video: HTMLVideoElement,
  duration: number,
  paused: boolean;

presence.on("UpdateData", async () => {
  const [startTimestamp, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "tv"
    };

  if (
    document.querySelector("#bitmovinplayer-video-player_container") !== null
  ) {
    video = document.querySelector("#bitmovinplayer-video-player_container");
    ({ currentTime, duration, paused } = video);
    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;

      title = document.querySelector(
        "body > now-root > now-seo > article > h1 > font > font"
      );
      if (title !== null) {
        const [details] = title.textContent.split("-");
        presenceData.details = details;
      } else {
        title = document.querySelector(
          "body > now-root > now-seo > article > h1"
        );
        presenceData.details = document.querySelector(
          "body > now-root > now-footer > footer > now-breadcrumb > ul > li:nth-child(3) > a > span"
        ).textContent;
        presenceData.state = title.textContent;
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "body > now-root > now-seo > article > h1 > font > font"
      );
      if (title) {
        const [state] = title.textContent.split("-");
        presenceData.state = state;
      } else {
        title = document.querySelector(
          "body > now-root > now-seo > article > h1"
        );
        presenceData.state = `${
          document.querySelector(
            "body > now-root > now-footer > footer > now-breadcrumb > ul > li:nth-child(3) > a > span"
          ).textContent
        } - ${title.textContent}`;
      }
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/serien/")) {
    const [state] = document
      .querySelector("head > title")
      .textContent.split(" - ");

    presenceData.details = "Viewing serie:";
    presenceData.state = state;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/shows/")) {
    const [state] = document
      .querySelector("head > title")
      .textContent.split(" - ");

    presenceData.details = "Viewing show:";
    presenceData.state = state;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/serien")) {
    presenceData.details = "Viewing all series";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/shows")) {
    presenceData.details = "Viewing all shows";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/filme/")) {
    const [state] = document
      .querySelector("head > title")
      .textContent.split(" - ");

    presenceData.details = "Viewing show:";
    presenceData.state = state;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/filme")) {
    presenceData.details = "Viewing all series";
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
