const presence = new Presence({
    clientId: "795564487910227968"
  }),
  presenceData: PresenceData = {
    largeImageKey: "vidio",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

presence.on("UpdateData", async () => {
  switch (
    document.location.pathname.endsWith("/") &&
    document.location.pathname.length > 1
      ? document.location.pathname.slice(
          0,
          document.location.pathname.length - 1
        )
      : document.location.pathname
  ) {
    case "/":
      presenceData.details = "Viewing homepage";
      break;
    case "/live":
      presenceData.details = "Viewing live streaming video";
      break;
    case "/search":
      presenceData.smallImageKey = "search";
      presenceData.details = "Searching for";
      presenceData.state = (
        document.querySelector("#q") as HTMLInputElement
      ).value;
      break;
    case "/packages":
      presenceData.details = "Viewing packages pricing";
      break;
    default: {
      if (document.location.pathname.startsWith("/dashboard")) {
        presenceData.details = "Viewing account dashbaord";
      }
      if (document.location.pathname.startsWith("/categories")) {
        presenceData.details = `Viewing ${toTitleCase(
          document.location.pathname
            .substring("categories".length + 2)
            .split("-")
            .slice(1)
            .join(" ")
        )} category`;
      }
      if (document.location.pathname.startsWith("/premier")) {
        presenceData.details = "Viewing a series";
        presenceData.state = document.querySelector(
          ".profile-info__title"
        ).textContent;
      }
      if (document.location.pathname.startsWith("/watch")) {
        const video: HTMLVideoElement = document.querySelector(
          "#vod-player_html5_api"
        );
        if (video) {
          const title = document.querySelector(".video-property__title");
          if (title) presenceData.details = title.textContent;
          else
            presenceData.details = document.querySelector(
              ".content-title-season"
            ).textContent;
          const series = document.querySelector(".user-name.video-channel");
          if (series) presenceData.state = series.textContent;
          else
            presenceData.state =
              document.querySelector(".content-title-big").textContent;
          const timestamps = presence.getTimestamps(
            video.currentTime,
            video.duration
          );
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];
          if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Video Paused";
          } else {
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
          }
        }
      }
      if (document.location.pathname.startsWith("/live/")) {
        const video = document.querySelector(
          "#livestreaming-player__player_html5_api"
        ) as HTMLVideoElement;
        if (video) {
          presenceData.details = document.getElementsByClassName(
            "b-livestreaming-detail__title section__title"
          )[1].textContent;
          presenceData.state = document.querySelector(
            ".b-livestreaming-user__name"
          ).textContent;
          if (video.paused) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Live Paused";
          } else {
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "Playing";
          }
        }
      }
      break;
    }
  }
  presence.setActivity(presenceData);
});

function toTitleCase(string: string) {
  return string
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}
