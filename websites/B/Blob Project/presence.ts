const presence = new Presence({
    clientId: "776424408549425162"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "vertigo-blob",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname == "blob-project.com") {
    if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Blob Project's Team";
    } else if (document.location.pathname.includes("/server-rules")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Discord Server Rules";
    } else if (document.location.pathname.includes("/blob")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Blob Project Development";
    } else if (
      document.location.pathname.includes("/dancing-in-the-spotlight")
    ) {
      presenceData.details = "Project 8:";
      presenceData.state = "Dancing In The Spotlight";
    } else if (document.location.pathname.includes("/antinsfw")) {
      presenceData.details = "Project 10:";
      presenceData.state = "Anti-NSFW";
    } else if (document.location.pathname.includes("/vector")) {
      presenceData.details = "Project 14:";
      presenceData.state = "Vector";
    } else if (document.location.pathname.includes("/cookie-policy")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Cookie Policy";
    } else if (document.location.pathname.includes("/privacy-policy")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Privacy Policy";
    } else if (document.location.pathname.includes("/vertigo/requirements")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Vertigo - Requirements";
    } else if (document.location.pathname.includes("/vertigo/acceptableuse")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Vertigo - Acceptable Use";
    } else if (document.location.pathname.includes("/vertigo/warranty")) {
      presenceData.details = "Reading Page:";
      presenceData.state = "Vertigo - Warranty Policy";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
