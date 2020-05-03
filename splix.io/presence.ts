var presence = new Presence({
  clientId: "640321591108042762"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var ui: any;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "splix"
  };

  if (document.location.pathname == "/") {
    ui = document.querySelector("#playUI");
    if (ui.style.cssText == "display: none;") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Getting ready...";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details =
        document.querySelector("#scoreBlock > span:nth-child(5)").textContent +
        " " +
        document.querySelector("#scoreBlock > span:nth-child(1)").textContent;
      presenceData.state = document.querySelector(
        "#scoreBlock > span:nth-child(7)"
      ).textContent;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
