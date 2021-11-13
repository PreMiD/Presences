const presence = new Presence({
    clientId: "827892428266274857"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setTimeElapsed = await presence.getSetting("timeElapsed"),
    setShowButtons = await presence.getSetting("showButtons"),
    setPrivacy = await presence.getSetting("privacy"),
    setLogo = await presence.getSetting("logo"),
    presenceData: PresenceData = {
      largeImageKey: setLogo === 0 ? "logo" : "logo2"
    },
    urlpath = window.location.pathname.split("/");

  if (setTimeElapsed) presenceData.startTimestamp = browsingStamp;

  if (!urlpath[1]) presenceData.details = "Home";
  else if (urlpath[1] === "rooms") {
    if (urlpath[2]) {
      presenceData.details = setPrivacy
        ? "In room"
        : document.querySelector("div.roomName.noselect").textContent;
      if (!setPrivacy) {
        presenceData.state = document.querySelector(
          "div.userCount.noselect"
        ).textContent;
      }

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "Join room",
            url: window.location.href
          }
        ];
      }
    } else presenceData.details = "Browsing rooms";
  } else presenceData.details = "Other";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
