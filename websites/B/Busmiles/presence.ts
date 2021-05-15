const presence = new Presence({clientId: "841094648319049768"}), browsingStamp = Math.floor(Date.now() / 1000);
var title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "busmiles"
  };

  presenceData.startTimestamp = browsingStamp;
  if (
    document.location.hostname == "busmiles.uk" ||
    document.location.hostname == "buswanker.uk" || 
    document.location.hostname == "shop.busmiles.uk"
  ) {
    if (document.location.pathname.includes("/mybusmiles/")) {
      title = document.querySelector(
        "h1.display-1"
      );

      presenceData.details = "Viewing:";
      if (title.innerText.length > 128) {
        presenceData.state = title.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = title.innerText;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/")) {
      title = document.querySelector(
        "title"
      );

      if (title != null) {
        presenceData.details = "Viewing:";
        presenceData.state = title.innerText;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing:";

        presence.setActivity(presenceData);
      }
    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
} else {
  presence.setActivity();
  presence.setTrayTitle();
}
});
