// Note: Developer has been working on a new website design for ages,
//       maybe at some point he'll finish it and this will need updating.

const presence = new Presence({
    clientId: "629355416714739732" // Contact if you want me to edit the discord assets/keys/whatever
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    episode: "presence.media.info.episode",
    browse: "presence.activity.browsing"
  });

let iframe_response = {
  paused: true,
  duration: 0,
  current_time: 0
};

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getTimes(time: number): Record<string, number> {
  let seconds = Math.round(time),
    minutes = Math.floor(seconds / 60);

  seconds -= minutes * 60;

  const hours = Math.floor(minutes / 60);

  minutes -= hours * 60;

  return {
    sec: seconds,
    min: minutes,
    hrs: hours
  };
}

function lessTen(digit: number): string {
  return digit < 10 ? "0" : "";
}

function getTimestamp(time: number): string {
  const { sec, min, hrs } = getTimes(time);

  return hrs > 0
    ? hrs + ":" + lessTen(min) + min + ":" + lessTen(sec) + sec
    : min + ":" + lessTen(sec) + sec;
}

presence.on(
  "iFrameData",
  (data: { paused: boolean; duration: number; current_time: number }) => {
    iframe_response = data;
  }
);

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "animepahe",
      details: "loading",
      state: "animepahe"
    };
  if (!path.includes("anime")) {
    presenceData.smallImageKey = "presence_browsing_home";
    presenceData.smallImageText = (await strings).browse;
    presenceData.details = `${(await strings).browse.slice(
      0,
      -3
    )} Latest Releases`;
    presenceData.state = "animepahe";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (path == "/anime") {
    presenceData.smallImageKey = "presence_browsing_all";
    presenceData.smallImageText = (await strings).browse;
    presenceData.details = `${(await strings).browse.slice(0, -3)} A-Z`;
    presenceData.state = "animepahe";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (!path.split("anime/")[1].includes("/")) {
    let type: string;

    for (const info of document.querySelector("div.col-sm-4.anime-info")
      .children) {
      // Not uniform info order... ugh
      if (info.children[0].textContent == "Type:")
        info.children[1].textContent == "TV"
          ? (type = "Season")
          : (type = info.children[1].textContent);
    }

    presenceData.smallImageKey = "presence_browsing_season";
    presenceData.smallImageText = (await strings).browse;
    presenceData.details = `${
      document.getElementsByClassName("title-wrapper")[0].children[1]
        .textContent
    }`;
    presenceData.state = `${(await strings).browse.slice(0, -3)} ${type}`;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }
  if (path.split("/")[1] == "play") {
    const timestamps = getTimestamps(
        Math.floor(iframe_response.current_time),
        Math.floor(iframe_response.duration)
      ),
      movie: boolean =
        document.querySelector(
          "body > section > article > div > div > div.theatre-info > div.anime-status > a"
        ).textContent == "Movie";

    presenceData.smallImageKey = `presence_playback_${
      iframe_response.paused ? "paused" : "playing"
    }`;

    presenceData.smallImageText = iframe_response.paused
      ? (await strings).pause
      : (await strings).play;

    presenceData.details = `Watching ${
      !movie
        ? `${(await strings).episode.slice(0, -3)}
          ${document
            .querySelector("#episodeMenu")
            .textContent.split("Episode ")[1]
            .replace(/^\s+|\s+$/g, "")} of `
        : ""
    }${
      document.querySelector(
        "body > section > article > div > div > div.theatre-info > h1 > a"
      ).textContent
    }`;
    if (!iframe_response.paused) {
      presenceData.state = `${(await strings).play}`;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    } else {
      presenceData.startTimestamp = null;
      presenceData.state = `${(await strings).pause} - ${getTimestamp(
        iframe_response.current_time
      )}`;
    }
    presence.setActivity(presenceData, true);
  } else {
    presence.setActivity(presenceData, false);
  }
});
