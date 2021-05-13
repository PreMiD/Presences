const presence = new Presence({ clientId: "837270687638224906" });

presence.on("UpdateData", async () => {
  const buttons = await presence.getSetting("buttons"),
    floatingViewer: HTMLElement = document.querySelector(
      ".content__viewer--floating"
    ),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  if (document.location.pathname === "/" && !floatingViewer) {
    presenceData.details = "Browsing homepage";
  } else if (document.location.pathname.startsWith("/$/")) {
    const path = document.location.pathname;
    if (path.includes("/$/following")) {
      presenceData.details = "Browsing followed content";
    } else if (path.includes("/$/uploads")) {
      presenceData.details = "Browsing own uploads";
    } else if (path.includes("/$/channels")) {
      presenceData.details = "Browsing own channels";
    } else if (path.includes("/$/settings")) {
      presenceData.details = "Browsing settings";
    } else if (path.includes("/$/wallet")) {
      presenceData.details = "Looking inside wallet";
    } else if (path.includes("/$/dashboard")) {
      presenceData.details = "Reading dashboard";
    } else if (path.includes("/$/rewards")) {
      presenceData.details = "Browsing own rewards";
    } else if (path.includes("/$/notifications")) {
      presenceData.details = "Reading notifications";
    } else if (path.includes("/$/upload")) {
      presenceData.details = "Planning to upload some content";
    } else {
      presenceData.details = "Browsing subpage";
    }
  } else if (floatingViewer || document.location.pathname.includes("/@")) {
    const userName: HTMLVideoElement =
        document.querySelector("h1.channel__title"),
      userTag: HTMLVideoElement = document.querySelector("span.channel-name");
    if (userName) {
      presenceData.details = `Viewing ${userName.textContent} page`;
      presenceData.state = userTag.textContent;
    } else {
      const title: HTMLElement = floatingViewer
          ? document.querySelector(
              ".content__viewer--floating div.claim-preview__title span.button__label"
            )
          : document.querySelector("h1.card__title"),
        uploaderName: HTMLElement = floatingViewer
          ? document.querySelector(
              ".content__viewer--floating span.channel-name"
            )
          : document.querySelector(
              "div.card__main-actions div.claim-preview__title > span.truncated-text"
            ),
        video: HTMLVideoElement = floatingViewer
          ? document.querySelector(".content__viewer--floating .vjs-tech")
          : document.querySelector(".vjs-tech"),
        uploaderUrlElement: HTMLLinkElement = floatingViewer
          ? document.querySelector("div.draggable.content__info > a")
          : document.querySelector(
              "div.media__subtitle > a.button--uri-indicator"
            ),
        uploaderTag: HTMLElement = floatingViewer
          ? undefined
          : document.querySelector(
              "div.card__main-actions div.media__subtitle  span.channel-name"
            );
      if (title && uploaderName) {
        presenceData.details = title.textContent;
        presenceData.state =
          uploaderName.textContent +
          (uploaderTag ? " " + uploaderTag.textContent : "");
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = "Paused";

        if (uploaderUrlElement && buttons) {
          presenceData.buttons = [
            {
              label: "Watch Video",
              url: document.URL
            },
            {
              label: "View Channel",
              url: uploaderUrlElement.href
            }
          ];
        }
        if (video) {
          presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
          presenceData.smallImageKey = video.paused ? "paused" : "play";
          presenceData.smallImageText = video.paused ? "Paused" : "Watching";
          if (video.paused) {
            delete presenceData.endTimestamp;
          }
        }
      }
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
