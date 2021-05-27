const presence = new Presence({
    clientId: "835652520637890620"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname;

  if (pathname === "/" && document.location.search.substr(0, 2) == "?q") {
    const query = document.querySelector(".caption").textContent;
    data.details = "Searching:";
    data.state = query;
    data.smallImageKey = "search";
  } else if (pathname === "/") {
    data.details = "Viewing the Homepage";
  } else if (pathname.startsWith("/app")) {
    data.details = "Viewing app page";
  } else if (pathname.startsWith("/ads")) {
    data.details = "Viewing ads page";
  } else if (pathname.startsWith("/podcast")) {
    const title = document.querySelector(".caption").textContent,
      link = window.location.href;
    data.details = "Viewing:";
    data.state = title;
    data.smallImageKey = "view";
    data.buttons = [{ label: "View Podcast", url: link }];
  } else if (pathname.startsWith("/episode")) {
    const title = document.querySelector(".pure-button").innerHTML,
      episode = document.querySelector(".title").textContent,
      playPause = document.querySelector("#play-pause-button"),
      link = window.location.href,
      remainingTime = presence.timestampFromFormat(
        document.querySelector("#remainingTime").textContent.substr(1)
      ),
      elapsedTime = presence.timestampFromFormat(
        document.querySelector("#elapsedTime").textContent
      ),
      timestamps = presence.getTimestamps(
        elapsedTime,
        remainingTime + elapsedTime
      );

    data.buttons = [{ label: "Listen Along", url: link }];
    data.details = title;
    data.state = episode;
    if (!playPause.classList.contains("fa-play-circle")) {
      data.endTimestamp = timestamps[1];
      data.smallImageKey = "play";
    } else data.smallImageKey = "pause";
  }
  presence.setActivity(data);
});
