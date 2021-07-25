const presence = new Presence({
    clientId: "864631234339930132"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let username: HTMLElement;

presence.on("UpdateData", async () => {
  const privacy: boolean = await presence.getSetting("privacy"),
    showTimestamp: boolean = await presence.getSetting("timestamp"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      smallImageKey: "small",
      startTimestamp: browsingStamp
    };

  if (!showTimestamp) delete presenceData.startTimestamp;

  if (document.location.pathname === "/mall/") {
    username = document.querySelector(".username");
    presenceData.details = "Browsing GeForce NOW";
  } else if (
    document.location.pathname === "/games" &&
    !document.querySelector("gfn-evidence-panel-tile")
  ) {
    presenceData.details = `Playing ${document.title.replace(
      " on GeForce NOW",
      ""
    )}`;
  } else if (document.location.pathname === "/games") {
    const game = document.querySelector(
      "gfn-evidence-panel-tile .evidence-panel-title span"
    ) as HTMLElement;
    presenceData.details = `Viewing ${game.innerText}`;
  } else presenceData.details = "Unknown Page";

  if (username && !privacy) presenceData.smallImageText = username.innerText;
  else {
    delete presenceData.smallImageText;
    delete presenceData.smallImageKey;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
