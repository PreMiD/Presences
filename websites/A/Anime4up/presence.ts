const presence = new Presence({
  clientId: "770030754356396052"
});

let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (location.pathname.startsWith("/episode")) {
    const timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    data.details = document
      .querySelectorAll(".container")[1]
      .textContent.slice(1, -1)
      .split(" ")
      .slice(0, -2)
      .join(" ");
    data.state = `Episode: ${document
      .querySelectorAll(".container")[1]
      .textContent.slice(1, -1)
      .split(" ")
      .pop()}`;

    data.smallImageKey = video.paused ? "paused" : "played";
    data.smallImageText = video.paused ? "Paused" : "Played";
    data.startTimestamp = timestamps[0];
    data.endTimestamp = timestamps[1];
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, !video.paused);
  } else if (
    location.href.startsWith("https://ww.anime4up.com/?search_param=animes&s=")
  ) {
    data.smallImageKey = "searching";
    data.smallImageText = "Searching";
    data.details = `Searching: ${document
      .querySelectorAll(".container")[1]
      .textContent.split(" ")
      .slice(4, -1)
      .join(" ")}`;
    data.state = `Results: ${
      document.querySelectorAll(".col-lg-2").length
        ? document.querySelectorAll(".col-lg-2").length
        : "Nothing"
    }`;
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/anime/")) {
    data.smallImageKey = "location";
    data.smallImageText = "Viewing";
    data.details = document.querySelector(".anime-details-title").textContent;
    data.state = "Viewing an Anime";
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith(
      "/%d9%82%d8%a7%d8%a6%d9%85%d8%a9-%d8%a7%d9%84%d8%a7%d9%86%d9%85%d9%8a"
    ) ||
    location.pathname.includes("/anime-")
  ) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Anime";
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith(
      "/%d9%85%d9%88%d8%a7%d8%b9%d9%8a%d8%af-%d8%b9%d8%b1%d8%b6-%d8%ad%d9%84%d9%82%d8%a7%d8%aa-%d8%a7%d9%84%d8%a7%d9%86%d9%85%d9%8a"
    )
  ) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Discovering";
    data.details = "Discovering Episodes Dates";
    presence.setActivity(data);
  } else if (location.pathname === "/") {
    data.details = "On Homepage";
    presence.setActivity(data);
  }
});
