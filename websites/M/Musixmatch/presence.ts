const presence = new Presence({
    clientId: "797128590524153889"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    path = (text: string): boolean => {
      return document.location.pathname.includes(text);
    };

  if (path("/explore/genre/")) {
    const genre = document
      .querySelector("#content > div > div.explore-panel > h1 > div")
      .textContent.replace("lyrics", "")
      .trim();
    presenceData.details = "Viewing a genre";
    presenceData.state = genre;
  } else if (path("/explore")) {
    presenceData.details = "Exploring lyrics";
  } else if (path("/lyrics/")) {
    const name = document
        .querySelector("#site h1")
        .textContent.replace("Lyrics", ""),
      artist = document.querySelector("#site h2 > span > a").textContent;
    presenceData.details = name;
    presenceData.state = artist;
    presenceData.smallImageKey = "reading";
  } else if (path("/community")) {
    presenceData.details = "Viewing community";
  } else if (path("/profile/")) {
    const user = document.querySelector("h1").textContent;
    presenceData.details = "Viewing the profile:";
    presenceData.state = user;
  } else if (path("/artist/")) {
    const artist = document.querySelector("#content h1").textContent;
    presenceData.details = "Viewing an artist:";
    presenceData.state = artist;
  } else if (path("/search/")) {
    const search = document.querySelector("#content span > span").textContent;
    presenceData.details = "Searching";
    presenceData.state = search;
    presenceData.smallImageKey = "search";
  }

  presence.setActivity(presenceData);
});
