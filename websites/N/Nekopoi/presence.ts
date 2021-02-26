const presence = new Presence({
    clientId: "795282263256203297"
  }),
  path: string = document.location.pathname,
  regex: string[] = path.match(/\/([a-z0-9\-._~%!$&'()*+,;=:@/]*)/),
  title = `${document
    .querySelector("title")
    .textContent.replace(/(Subtitle|Indonesia|NekoPoi|[^\p{L}\d\s@#])/gu, "")}`,
  ttl = ["Hentai", "JAV"];

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "nekopoi",
    startTimestamp: Date.now()
  };

  if (document.location.search.startsWith("?s")) {
    presenceData.details = "Searching for:";
    presenceData.state = `${title.replace(/Search Results/g, "")}`;
  } else if (path == "/") {
    presenceData.details = "Viewing home page";
  } else if (path == "/genre-list/") {
    presenceData.details = "Viewing at Genre List";
  } else if (path == "/jadwal-new-hentai/") {
    presenceData.details = "Viewing a page";
    presenceData.state = "New Hentai Schedule";
  } else if (path == `${regex[0]}`) {
    if (title.includes("Genres")) {
      presenceData.details = "Selecting a genre";
      presenceData.state = title;
    } else if (ttl.some((x) => title.includes(x))) {
      presenceData.details = "Viewing a page";
      presenceData.state = title;
    } else {
      presenceData.details = title;
    }
  }
  return presence.setActivity(presenceData);
});
