const presence = new Presence({
  clientId: "864631234339930132"
});
const browsingStamp = Math.floor(Date.now() / 1000);

let username: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "small",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/mall/") {
    username = document.querySelector(".username");
    presenceData.details = "Browsing GeForce NOW";
    presenceData.smallImageText = username.innerText;
  } else if (document.location.pathname === "/games" && !document.querySelector("gfn-evidence-panel-tile")) {
    presenceData.details = "Playing " + document.title.replace(" on GeForce NOW", "");
    presenceData.smallImageText = username.innerText;
  } else if (document.location.pathname === "/games") {
    const game = document.querySelector("gfn-evidence-panel-tile .evidence-panel-title span") as HTMLElement;
    presenceData.details = "Viewing " + game.innerText;
    presenceData.smallImageText = username.innerText;
  } else {
    presenceData.details = "Unknown Page";
    delete presenceData.smallImageKey
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
