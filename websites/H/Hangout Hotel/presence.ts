const presence = new Presence({
    clientId: "630418879411126282"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "habbologo"
  };
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname.toLowerCase().includes("/client"))
    presenceData.state = "Playing Hangout Hotel";

  if (
    window.location.pathname.toLowerCase().startsWith("/community/articles")
  ) {
    presenceData.details = "Reading an article:";
    presenceData.state = `Article number: ${window.location.pathname.replace(
      "/community/articles/",
      ""
    )}`;
  }
  if (window.location.pathname.toLowerCase() === "/community/articles") {
    presenceData.details = "Community:";
    presenceData.state = "Articles";
  }
  if (window.location.pathname.toLowerCase() === "/community")
    presenceData.details = "Community";

  if (window.location.pathname.toLowerCase() === "/community/articles/") {
    presenceData.details = "Community:";
    presenceData.state = "Articles";
  }
  if (window.location.pathname.toLowerCase() === "/community/")
    presenceData.details = "Community";

  if (window.location.pathname.toLowerCase().startsWith("/community/photos")) {
    presenceData.details = "Community:";
    presenceData.state = "Photos";
  }

  if (
    window.location.pathname.toLowerCase().startsWith("/community/leaderboards")
  ) {
    presenceData.details = "Community:";
    presenceData.state = "Leaderboards";
  }
  if (
    window.location.pathname.toLowerCase().startsWith("/community/management")
  ) {
    presenceData.details = "Community:";
    presenceData.state = "Management";
  }
  if (window.location.pathname.toLowerCase().startsWith("/store/packages")) {
    presenceData.details = "Store:";
    presenceData.state = "Packages";
  }
  if (window.location.pathname.toLowerCase().startsWith("/store/ranks")) {
    presenceData.details = "Store:";
    presenceData.state = "Ranks";
  }
  if (window.location.pathname.toLowerCase() === "/settings")
    presenceData.details = "Settings";

  if (window.location.pathname.toLowerCase() === "/settings/")
    presenceData.details = "Settings";

  if (window.location.pathname.toLowerCase().startsWith("/settings/password")) {
    presenceData.details = "Settings:";
    presenceData.state = "Changing password";
  }
  if (window.location.pathname.toLowerCase().startsWith("/home")) {
    presenceData.details = "Home:";
    presenceData.state = document.title.replace("Hangout - ", "");
  }
  if (window.location.pathname.toLowerCase().startsWith("/me"))
    presenceData.details = "Home";

  if (window.location.pathname.toLowerCase().startsWith("/login"))
    presenceData.details = "Logging in";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
