var presence = new Presence({
  clientId: "636614830698004480"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var user: any;
var title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rlswaps"
  };

  title = document.querySelector("#offer-balance");
  user = document.querySelector("#receive-balance");

  if (document.location.pathname.includes("/history")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their history";
  } else if (title.innerText !== "0.00" || user.innerText !== "0.00") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Trading...";
    presenceData.state =
      title.innerText + " keys worth for " + user.innerText + "worth of items";
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Going to trade...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
