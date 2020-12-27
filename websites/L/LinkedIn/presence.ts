const presence = new Presence({
    clientId: "785263902321541181" //Presence Application ID on Discord Developers.
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "linkedin_logo"
    },
    path = document.location.pathname;

  if (document.location.hostname == "www.linkedin.com") {
    //Feed section.
    if (path == "/feed/") {
      presenceData.details = "Browsing Feed.";
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
