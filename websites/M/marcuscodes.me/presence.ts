const presence = new Presence({ clientId: "782532120047779850" }),
  timeStamp = Math.floor(Date.now() / 1000),
  page = window.location.href;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "gen",
    startTimestamp: timeStamp
  };

  if (page == "https://marcuscodes.me/") {
    presenceData.details = "Home";
  } else if (page == "https://marcuscodes.me/inkthought-legacy") {
    presenceData.details = "inkthought labs legacy";
  } else if (page == "https://marcuscodes.me/blog") {
    presenceData.details = "Blog";
  } else if (page == "https://marcuscodes.me/inkthought") {
    presenceData.details = "inkthought labs website";
  } else if (page == "https://marcuscodes.me/sfx") {
    presenceData.details = "SFX page";
  } else if (page == "https://marcuscodes.me/sfx1") {
    presenceData.details = "SFX 1";
  } else if (page == "https://marcuscodes.me/sfx2") {
    presenceData.details = "SFX 2";
  } else {
    presenceData.details = "404";
  }

  presence.setActivity(presenceData);
});
