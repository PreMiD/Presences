  const presence = new Presence({
  clientId: "759921592926339072"
});

let browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "destiny",
    smallImageKey: "really_bad_d_gg_logo_upscale"
  };

  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/home/"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the homepage.";
  } else if (document.location.pathname.includes("/bigscreen")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching Destiny.";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
