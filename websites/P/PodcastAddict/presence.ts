const presence = new Presence({
    clientId: "835652520637890620"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/" && document.location.search.substr(0, 2) === "?q") {
    presenceData.details = "Searching:";
    data.state = document.querySelector(".caption").textContent;
    data.smallImageKey = "search";
  } else if (pathname === "/") presenceData.details = "Viewing the Homepage";
  else if (pathname.startsWith("/app"))
    presenceData.details = "Viewing app page";
  else if (pathname.startsWith("/ads"))
    presenceData.details = "Viewing ads page";
  else if (pathname.startsWith("/podcast")) {
    presenceData.details = "Viewing:";
    data.state = document.querySelector(".caption").textContent;
    data.smallImageKey = "view";
    data.buttons = [{ label: "View Podcast", url: window.location.href }];
  } else if (pathname.startsWith("/episode")) {
    const elapsedTime = presence.timestampFromFormat(
      document.querySelector("#elapsedTime").textContent
    );
    data.buttons = [{ label: "Listen Along", url: window.location.href }];
    presenceData.details = document.querySelector(".pure-button").innerHTML;
    data.state = document.querySelector(".title").textContent;
    if (
      !document
        .querySelector("#play-pause-button")
        .classList.contains("fa-play-circle")
    ) {
      [, data.endTimestamp] = presence.getTimestamps(
        elapsedTime,
        presence.timestampFromFormat(
          document.querySelector("#remainingTime").textContent.substr(1)
        ) + elapsedTime
      );
      data.smallImageKey = "play";
    } else data.smallImageKey = "pause";
  }
  presence.setActivity(data);
});
