const presence = new Presence({ clientId: "837270687638224906" });
presence.on("UpdateData", async () => {
  if (document.location.hostname === "odysee.com") {
    const presenceData: PresenceData = {
      details: "Odysee",
      largeImageKey: "logo"
    };
    if (document.location.pathname === "/") {
      presenceData.details = "Browsing homepage";
    } else if (document.location.pathname.includes("/$/following")) {
      presenceData.details = "Browsing followed content";
    } else if (document.location.pathname.includes("/$/uploads")) {
      presenceData.details = "Browsing own uploads";
    } else if (document.location.pathname.includes("/$/channels")) {
      presenceData.details = "Browsing own channels";
    } else if (document.location.pathname.includes("/$/settings")) {
      presenceData.details = "Browsing settings";
    } else if (document.location.pathname.includes("/$/wallet")) {
      presenceData.details = "Looking inside wallet";
    } else if (document.location.pathname.includes("/$/dashboard")) {
      presenceData.details = "Reading dashboard";
    } else if (document.location.pathname.includes("/$/rewards")) {
      presenceData.details = "Browsing own rewards";
    } else if (document.location.pathname.includes("/$/notifications")) {
      presenceData.details = "Reading notifications";
    } else if (document.location.pathname.includes("/$/upload")) {
      presenceData.details = "Planning to upload some content";
    } else if (document.location.pathname.includes("/$/")) {
      presenceData.details = "Browsing subhomepage";
    } else if (document.location.pathname.includes("/@")) {
      const userName: HTMLVideoElement = document.querySelector(
          "h1.channel__title"
        ),
        userTag: HTMLVideoElement = document.querySelector("span.channel-name");
      if (userName) {
        presenceData.details = `Viewing ${userName.textContent} page`;
        presenceData.state = userTag.textContent;
      }
    } else {
      const title: HTMLElement = document.querySelector("h1.card__title"),
        uploaderName: HTMLElement = document.querySelector(
          "div.card__main-actions div.claim-preview__title > span.truncated-text"
        ),
        uploaderTag: HTMLElement = document.querySelector(
          "div.card__main-actions div.media__subtitle  span.channel-name"
        ),
        video: HTMLVideoElement = document.querySelector("video");
      if (title && uploaderName) {
        presenceData.details = title.textContent;
        presenceData.state =
          uploaderName.textContent + " " + uploaderTag.textContent;
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = "Paused";
      }
      if (video) {
        presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
        presenceData.smallImageKey = video.paused ? "paused" : "play";
        presenceData.smallImageText = video.paused ? "Paused" : "Watching";
        if (video.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
    }
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
});
