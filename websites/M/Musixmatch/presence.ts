const presence = new Presence({
  clientId: "797128590524153889"
}),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: 'logo',
    startTimestamp: browsingTimestamp
  },
    path = (text: string): boolean => {
      return document.location.pathname.includes(text);
    };

  if (path("/explore")) {
    presenceData.details = "Exploring lyrics";
  } else if (path("/lyrics/")) {
    const name = document.querySelector("#site h1").textContent.replace("Lyrics", "");
    presenceData.details = "Viewing lyrics:";
    presenceData.state = name;
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