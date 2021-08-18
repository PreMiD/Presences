const presence = new Presence({
    clientId: "864304063804997702"
  }),
  elapsed = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
  const { pathname, origin } = window.location,
    data: PresenceData = {
      startTimestamp: elapsed,
      largeImageKey: "logo"
    };

  let state, details, buttons: [ButtonData, ButtonData?];

  if (/^\/$/.test(pathname)) details = "Viewing Home Page";
  else if (/^\/comics\/?$/.test(pathname)) details = "Viewing Comic List";
  else if (/^\/comics\/[0-9a-z-]+\/?$/i.test(pathname)) {
    details = "Viewing Comic Page";
    state = document.querySelector(".entry-title").textContent;
    const viewComicButton: ButtonData = {
      label: "Visit Comic Page",
      url: origin + pathname
    };
    buttons = [viewComicButton];
  } else if (/\/[a-z-19]+(chapter|ch)-[0-9]+\/?$/i.test(pathname)) {
    const comicLink = (document.querySelector(".allc > a") as HTMLAnchorElement)
      .href;
    details = "Reading Comic";
    state = document.querySelector(".entry-title").textContent;
    const viewComicButton: ButtonData = {
        label: "Visit Comic Page",
        url: origin + comicLink
      },
      visitChapterButton: ButtonData = {
        label: "Visit Chapter",
        url: origin + pathname
      };
    buttons = [viewComicButton, visitChapterButton];
  } else {
    details = "Browsing Asura Scans";
    state = document.title;
  }

  data.details = details;
  data.state = state;
  data.buttons = buttons;

  if (data.details) presence.setActivity(data);
});
