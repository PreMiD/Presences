const presence = new Presence({
    clientId: "827892428266274857"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setTimeElapsed = await presence.getSetting<boolean>("timeElapsed"),
    setShowButtons = await presence.getSetting<boolean>("showButtons"),
    setPrivacy = await presence.getSetting<boolean>("privacy"),
    setLogo = await presence.getSetting<number>("logo"),
    presenceData: PresenceData = {
      largeImageKey: setLogo === 0 ? "logo" : "logo2"
    },
    urlpath = window.location.pathname.split("/");

  if (setTimeElapsed) presenceData.startTimestamp = browsingTimestamp;

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

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
