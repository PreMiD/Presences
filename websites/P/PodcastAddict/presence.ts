const presence = new Presence({
    clientId: "835652520637890620"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/" && document.location.search.substr(0, 2) === "?q") {
    presenceData.details = "Searching:";
    presenceData.state = document.querySelector(".caption").textContent;
    presenceData.smallImageKey = "search";
  } else if (pathname === "/") presenceData.details = "Viewing the Homepage";
  else if (pathname.startsWith("/app"))
    presenceData.details = "Viewing app page";
  else if (pathname.startsWith("/ads"))
    presenceData.details = "Viewing ads page";
  else if (pathname.startsWith("/podcast")) {
    presenceData.details = "Viewing:";
    presenceData.state = document.querySelector(".caption").textContent;
    presenceData.smallImageKey = "view";
    presenceData.buttons = [
      { label: "View Podcast", url: window.location.href }
    ];
  } else if (pathname.startsWith("/episode")) {
    const elapsedTime = presence.timestampFromFormat(
      document.querySelector("#elapsedTime").textContent
    );

    presenceData.buttons = [
      { label: "Listen Along", url: window.location.href }
    ];
    presenceData.details = document.querySelector(".pure-button").textContent;
    presenceData.state = document.querySelector(".title").textContent;
    if (
      !document
        .querySelector("#play-pause-button")
        .classList.contains("fa-play-circle")
    ) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        elapsedTime,
        presence.timestampFromFormat(
          document.querySelector("#remainingTime").textContent.substr(1)
        ) + elapsedTime
      );
      presenceData.smallImageKey = "play";
    } else presenceData.smallImageKey = "pause";
  }
  presence.setActivity(presenceData);
});
