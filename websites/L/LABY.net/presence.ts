const presence = new Presence({
    clientId: "867452106016161822"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "large_image",
    details: "LABY.net",
    startTimestamp: browsingTimestamp
  };
  if (document.location.pathname.startsWith("/skins"))
    presenceData.details = "Viewing skins";
  else if (document.location.pathname.startsWith("/skin"))
    presenceData.details = "Viewing skins";
  else if (document.location.pathname.startsWith("/cloaks"))
    presenceData.details = "Viewing LabyMod cloaks";
  else if (document.location.pathname.startsWith("/capes"))
    presenceData.details = "Viewing Minecraft capes";
  else if (document.location.pathname.startsWith("/@")) {
    presenceData.details = "Viewing profile of:";
    presenceData.state = document.querySelector(
      "div.profile-header>h1"
    ).textContent;
  } else if (document.location.pathname.startsWith("/settings"))
    presenceData.details = "Viewing profile settings";
  else if (document.location.pathname.startsWith("/server")) {
    presenceData.details = "Viewing server:";
    presenceData.state = document.querySelector(
      "div.server-info-wrapper>h1"
    ).textContent;
  } else if (document.location.pathname.startsWith("/badge")) {
    presenceData.details = "Viewing badge:";
    presenceData.state = document.querySelector("div.mb-1>h1").textContent;
  } else if (document.location.pathname.startsWith("/cape")) {
    presenceData.details = "Viewing cape:";
    presenceData.state = document.querySelector("div.mb-1>h1").textContent;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
