const presence = new Presence({
    clientId: "797749214175035412"
  }),
  timeStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: timeStamp
    },
    { title, location: { pathname: page } } = document,
    details = (page) => {
      return page === "/" ? "Viewing:"
        : page.startsWith("/learn") ? "Learning:"
        : page.startsWith("/news") ? "Viewing page:" : "";
    },
    state = (page, title) => {
      return page === "/" ? "The Main Page"
        : page.startsWith("/learn") && !title.startsWith("Learn to Code") ? title.slice(0, title.length - 19) // gets rid of " | freeCodeCamp.org"
        : page.startsWith("/learn") && title.startsWith("Learn to Code") ? "Selecting Course"
        : page.startsWith("/news") ? title : "";
    };
  presenceData.details = details(page);
  presenceData.state = state(page, title);
  presence.setActivity(presenceData);
});
