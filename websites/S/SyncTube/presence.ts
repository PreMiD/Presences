const presence = new Presence({
    clientId: "827892428266274857"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const set_timeElapsed = await presence.getSetting("timeElapsed"),
    set_showButtons = await presence.getSetting("showButtons"),
    set_privacy = await presence.getSetting("privacy"),
    set_logo = await presence.getSetting("logo"),
    presenceData = {
      largeImageKey: set_logo === 0 ? "logo" : "logo2"
    },
    urlpath = window.location.pathname.split("/");

  if (set_timeElapsed) presenceData.startTimestamp = browsingStamp;

  if (!urlpath[1]) {
    presenceData.details = "Home";
  } else if (urlpath[1] === "rooms") {
    if (urlpath[2]) {
      presenceData.details = set_privacy
        ? "In room"
        : document.querySelector("div.roomName.noselect").textContent;
      if (!set_privacy)
        presenceData.state = document.querySelector(
          "div.userCount.noselect"
        ).textContent;

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Join room",
            url: window.location.href
          }
        ];
      }
    } else {
      presenceData.details = "Browsing rooms";
    }
  } else {
    presenceData.details = "Other";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
