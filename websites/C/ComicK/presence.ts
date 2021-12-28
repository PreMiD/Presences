const presence = new Presence({
    clientId: "866604211248824371"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "large",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/") presenceData.details = "Browsing Homepage";
  else if (pathname === "/list") presenceData.details = "Viewing Followed List";
  else if (pathname.startsWith("/comic")) {
    if (!document.querySelector(".images-reader-container")) {
      const infoReader = document.querySelector(".info-reader-container"),
        imageReader = document.querySelector(".images-reader-container");
      if (infoReader) {
        const title = infoReader.querySelector<HTMLAnchorElement>("a"),
          chapter = infoReader.querySelector<HTMLHeadingElement>("h1");
        if (title) presenceData.details = `Reading ${title.textContent}`;
        if (chapter) presenceData.state = chapter.textContent;
      } else if (imageReader) {
        const img = imageReader.querySelector<HTMLImageElement>("img"),
          chapter = document.querySelector<HTMLHeadingElement>("h1");
        if (img) {
          presenceData.details = `Reading ${img.alt.substring(
            0,
            img.alt.indexOf("chapter")
          )}`;
        }
        if (chapter) presenceData.state = chapter.textContent;
      }
      presenceData.smallImageKey = "small";
      presenceData.buttons = [
        {
          label: "Read Chapter",
          url: document.location.href
        }
      ];
    } else {
      const title = document.querySelector<HTMLHeadingElement>("h1");
      if (title) {
        presenceData.details = "Checking Description";
        presenceData.state = title.textContent;
        presenceData.buttons = [
          {
            label: "Check Description",
            url: document.location.href
          }
        ];
      }
    }
  } else if (pathname.startsWith("/group")) {
    presenceData.details = "Looking at group";
    presenceData.state =
      document.querySelector<HTMLHeadingElement>("h1").textContent;
  } else if (pathname.startsWith("/search")) {
    presenceData.details = "Searching";
    for (const t of document.querySelectorAll("h1.mb-3 > div")) {
      if (t.textContent) {
        presenceData.state = t.textContent;
        break;
      }
    }
  } else if (pathname === "/ranking")
    presenceData.details = "Looking at rankings";
  else if (pathname === "/comment_list")
    presenceData.details = "Looking at comment list";
  else if (pathname === "/settings") presenceData.details = "Settings";
  else if (pathname === "/languages") presenceData.details = "Languages";
  else if (pathname === "/privacy") presenceData.details = "Privacy POlicy";
  else if (pathname === "/install_app") presenceData.details = "ComicK App";

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
