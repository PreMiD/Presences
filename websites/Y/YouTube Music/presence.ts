const presence = new Presence({
    clientId: "463151177836658699"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getAuthorString(): string {
  //* Get authors
  const authors = document.querySelectorAll(
    "span yt-formatted-string.ytmusic-player-bar a"
  ) as NodeListOf<HTMLAnchorElement>;
  let authorsArray: HTMLAnchorElement[], authorString: string;

  //* Author tags more than one => YouTube Music Song listing with release year etc.
  if (authors.length > 1) {
    //* Convert to js array for .map function
    authorsArray = Array.from(authors);

    //* If song is from a channel and not a video
    if (
      document.querySelector(
        'span yt-formatted-string.ytmusic-player-bar a[href*="channel/"]'
      ) &&
      !document.querySelector("ytmusic-player-page[video-mode_]")
    ) {
      //* Get release year of song
      let year = document.querySelector(
        "span yt-formatted-string.ytmusic-player-bar"
      ).textContent;
      year = year.slice(year.length - 4, year.length);

      //* Build output string
      authorString = `${authorsArray
        .slice(0, authorsArray.length - 1)
        .map((a) => a.textContent)
        .join(", ")} - ${
        authorsArray[authorsArray.length - 1].textContent
      } (${year})`;
    } else {
      //* Build output string
      authorString = `${authorsArray
        .slice(0, authorsArray.length - 1)
        .map((a) => a.textContent)
        .join(", ")} - ${authorsArray[authorsArray.length - 1].textContent}`;
    }
  } else {
    authorString = (document.querySelector(
      "span yt-formatted-string.ytmusic-player-bar a"
    ) as HTMLAnchorElement)
      ? (
          document.querySelector(
            "span yt-formatted-string.ytmusic-player-bar a"
          ) as HTMLAnchorElement
        ).textContent
      : (
          document.querySelector(
            "span yt-formatted-string.ytmusic-player-bar span:nth-child(1)"
          ) as HTMLAnchorElement
        ).textContent;
  }

  return authorString;
}

presence.on("UpdateData", async () => {
  const title = (
      document.querySelector(".ytmusic-player-bar.title") as HTMLElement
    ).textContent,
    video = document.querySelector(".video-stream") as HTMLVideoElement,
    progressBar = document.querySelector("#progress-bar") as HTMLElement,
    repeatMode = document
      .querySelector('ytmusic-player-bar[slot="player-bar"]')
      .getAttribute("repeat-Mode_"),
    buttons = await presence.getSetting("buttons"),
    time = await presence.getSetting("time");
  if (title !== "" && !isNaN(video.duration)) {
    const presenceData: PresenceData = {
      details: title,
      state: getAuthorString(),
      largeImageKey: "ytm_lg",
      smallImageKey: video.paused
        ? "pause"
        : repeatMode === "ONE"
        ? "repeat-one"
        : repeatMode === "ALL"
        ? "repeat"
        : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : repeatMode === "ONE"
        ? "On loop"
        : repeatMode === "ALL"
        ? "Playlist on loop"
        : (await strings).play,
      endTimestamp:
        Date.now() +
        Number(progressBar.getAttribute("aria-valuemax")) * 1000 -
        Number(progressBar.getAttribute("value")) * 1000
    };

    if (buttons) {
      presenceData.buttons = [
        {
          label: "Listen Along",
          url: `https://music.youtube.com/watch?v=${
            document
              .querySelector<HTMLAnchorElement>(
                "a.ytp-title-link.yt-uix-sessionlink"
              )
              .href.match(/v=([^&#]{5,})/)[1]
          }`
        }
      ];
    }

    if (!time) delete presenceData.endTimestamp;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    } else presence.setTrayTitle(title);

    presence.setActivity(presenceData);
  } else presence.setActivity();
});
