const presence = new Presence({
    clientId: "700338425953386587"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    searching: "presence.activity.searching",
    reading: "presence.activity.reading"
  });

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function parseQueryString(queryString?: string): any {
  if (!queryString) {
    queryString = window.location.search.substring(1);
  }
  const params = {};
  const queries = queryString.split("&");
  queries.forEach((indexQuery: string) => {
    const indexPair = indexQuery.split("=");
    const queryKey = decodeURIComponent(indexPair[0]);
    const queryValue = decodeURIComponent(
      indexPair.length > 1 ? indexPair[1] : ""
    );
    params[queryKey] = queryValue;
  });
  return params;
}

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  const pageTitle = document.querySelector("title").textContent.split(" | ");
  const browsingStamp = Math.floor(Date.now() / 1000);
  const route = document.location.pathname.split("/");
  const query = await parseQueryString(document.location.hash).search;

  if (document.location.pathname == "/") {
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/videos/")) {
    if (document.location.pathname.includes("/category/")) {
      presenceData.details = query
        ? (await strings).searching
        : (await strings).browsing;
      const routes = [
        "humour",
        "malaise",
        "game",
        "musique",
        "insolite",
        "18",
        "18-gore",
        "18-insolite",
        "18-vr"
      ];
      routes.forEach((r) => {
        if (route[3] === `${r}`) {
          presenceData.state = `${pageTitle[0]} - page ${
            route[4] ? route[5] : 1
          }`;
        }
      });
      presenceData.startTimestamp = browsingStamp;
    } else {
      const video: HTMLVideoElement = document.querySelector(
        ".mejs-mediaelement > mediaelementwrapper > video"
      );
      presenceData.details = pageTitle[0];
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("/upload")) {
    presenceData.details = pageTitle[0];
    presenceData.smallImageKey = "uploading";
  } else {
    presenceData.details = pageTitle[0];
    presenceData.state = (await strings).reading;
    presenceData.startTimestamp = browsingStamp;
  }
  if (query) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).searching;
    presenceData.details = `${(await strings).searching} : ${query}`;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
