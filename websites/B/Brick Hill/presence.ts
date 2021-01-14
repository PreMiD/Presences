const presence = new Presence({
    clientId: "797879854343127040"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "brick-hill"
  };

  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/dashboard"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing dashboard";
  } else if (document.location.pathname.includes("/play/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing games...";
  } else if (document.location.pathname == "/shop/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing the catalog...";
  } else if (document.location.pathname.includes("/clans/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing clans...";
  } else if (document.location.pathname.includes("/search/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching for a user...";
  } else if (document.location.pathname == "/forum/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing the forums...";
  } else if (document.location.pathname.includes("/membership/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Looking at membership options...";
  } else if (document.location.pathname.includes("/customize/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Customizing Avatar";
  } else if (document.location.pathname.includes("/client/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Downloading the client...";
  } else if (document.location.pathname.includes("/trades/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Looking at trades...";
  } else if (document.location.pathname.includes("/sets/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "My Sets";
  } else if (document.location.pathname.includes("/currency/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing currency...";
  } else if (document.location.pathname.includes("/settings/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Changing profile settings...";
  } else if (document.location.pathname.includes("/thread/")) {
    presenceData.startTimestamp = browsingStamp;
    const title = document.querySelector(".top");
    presenceData.details = "Viewing Thread:";
    presenceData.state = title.textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
