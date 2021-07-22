const presence = new Presence({
    clientId: "866604211248824371"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "large",
      startTimestamp: browsingStamp
    },
    { pathname } = document.location;

  if (pathname === "/") presenceData.details = "Browsing Homepage";
  else if (pathname === "/list") presenceData.details = "Viewing Followed List";
  else if (pathname.startsWith("/comic")) {
    const reading = !!document.querySelector(".images-reader-container");
    if (reading) {
      const infoReader = document.querySelector(".info-reader-container"),
        imageReader = document.querySelector(".images-reader-container");
      if (infoReader) {
        const title = infoReader.querySelector<HTMLAnchorElement>("a"),
          chapter = infoReader.querySelector<HTMLHeadingElement>("h1");
        if (title) presenceData.details = `Reading ${title.innerText}`;
        if (chapter) presenceData.state = chapter.innerText;
      } else if (imageReader) {
        const img = imageReader.querySelector<HTMLImageElement>("img"),
          chapter = document.querySelector<HTMLHeadingElement>("h1");
        if (img) {
          presenceData.details = `Reading ${img.alt.substring(
            0,
            img.alt.indexOf("chapter")
          )}`;
        }
        if (chapter) presenceData.state = chapter.innerText;
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
        presenceData.state = title.innerText;
        presenceData.buttons = [
          {
            label: "Check Description",
            url: document.location.href
          }
        ];
      }
    }
  } else if (pathname.startsWith("/group")) {
    const name = document.querySelector<HTMLHeadingElement>("h1");
    presenceData.details = "Looking at group";
    presenceData.state = name.innerText;
  } else if (pathname.startsWith("/search")) {
    const tags: NodeListOf<HTMLDivElement> =
      document.querySelectorAll("h1.mb-3 > div");
    presenceData.details = "Searching";
    for (const t of tags) {
      if (t.innerText) {
        presenceData.state = t.innerText;
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

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
