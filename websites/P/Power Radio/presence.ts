var presence = new Presence({
  clientId: "640617785696976906"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ppower"
  };
  if (document.querySelector("#pauseButtoni").className == "fa fa-pause") {
    user = document.querySelector("#infocontainer > div:nth-child(2) > p");
    title = document.querySelector("#infocontainer > div:nth-child(3) > p");
    presenceData.details = user.textContent;
    presenceData.state = title.textContent;
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = "playing";
  }

  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing...";
    presence.setActivity(presenceData);
  } else {
    presence.setActivity(presenceData);
  }
});
