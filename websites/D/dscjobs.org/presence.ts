const presence = new Presence({
  clientId: "807748912940711996"
});

let browsingStamp = Math.floor(Date.now() / 1000),
  lastPlaybackState,
  playback;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Browsing in Home...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/moderators") {
    presenceData.details = "Searching in";
    presenceData.state = "Most voted moderators";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/profile") {
    presenceData.details = "At Profile";
    presenceData.state = "Author profile page";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/create") {
    presenceData.details = "Creating Curriculum Vitae";
    presence.setActivity(presenceData);
  }else if (document.location.pathname == "/settings") {
    presenceData.details = "Modifying Curriculum Vitae";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/cv/")) {
    const nameofprofile = document.location.pathname.split("/");
    presenceData.details = "Viewing Curriculum Vitae";
    presenceData.state = "dscjobs.org/" + nameofprofile[2];
    presence.setActivity(presenceData);
  }
  presence.setActivity(presenceData);
});
