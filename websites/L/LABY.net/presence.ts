const presence = new Presence({
    clientId: "867452106016161822"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "large_image",
    details: "LABY.net"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname.startsWith("/skins"))
    presenceData.details = "Viewing skins";
  else if (document.location.pathname.startsWith("/skin"))
    presenceData.details = "Viewing skins";
  else if (document.location.pathname.startsWith("/cloaks"))
    presenceData.details = "Viewing LabyMod cloaks";
  else if (document.location.pathname.startsWith("/capes"))
    presenceData.details = "Viewing Minecraft capes";
  else if (document.location.pathname.startsWith("/@")) {
    const user = document.querySelector("div.profile-header>h1").textContent;
    presenceData.details = "Viewing profile of:";
    presenceData.state = user;
  } else if (document.location.pathname.startsWith("/settings"))
    presenceData.details = "Viewing profile settings";
  else if (document.location.pathname.startsWith("/server")) {
    const server = document.querySelector(
      "div.server-info-wrapper>h1"
    ).textContent;
    presenceData.details = "Viewing server:";
    presenceData.state = server;
  } else if (document.location.pathname.startsWith("/badge")) {
    const badge = document.querySelector("div.mb-1>h1").textContent;
    presenceData.details = "Viewing badge:";
    presenceData.state = badge;
  } else if (document.location.pathname.startsWith("/cape")) {
    const cape = document.querySelector("div.mb-1>h1").textContent;
    presenceData.details = "Viewing cape:";
    presenceData.state = cape;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
