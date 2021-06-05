const presence: Presence = new Presence({
    clientId: "614220272790274199"
  }),
  startTimestamp: number = Math.floor(Date.now() / 1000),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "anilist_lg",
    startTimestamp
  };
  const { pathname } = window.location;
  if (pathname.startsWith(`/home`)) {
    presenceData.details = (await strings).browsing;
    presenceData.state = "Home";
  } else if (pathname.startsWith(`/user`)) {
    const user = document.querySelector(".name").textContent;
    if (pathname.includes(`mangalist`)) {
      presenceData.details = `Viewing ${user}'s manga list`;
    } else if (pathname.includes(`animelist`)) {
      presenceData.details = `Viewing ${user}'s anime list`;
    } else {
      presenceData.details = `Viewing ${user}'s profile`;
    }
  } else if (pathname.startsWith(`/search`)) {
    presenceData.details = "Searching";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Searching";
  } else if (pathname.startsWith(`/anime`)) {
    const title = document.querySelector("div.content > h1").textContent.trim();
    presenceData.details = "Viewing an anime";
    presenceData.state = title;
  } else if (pathname.startsWith(`/manga`)) {
    const title = document.querySelector("div.content > h1").textContent.trim();
    presenceData.details = "Viewing a manga";
    presenceData.state = title;
  } else if (pathname.startsWith(`/forum`)) {
    if (pathname.split("/").length > 3) {
      presenceData.details = "Reading a forum post";
      presenceData.state = `'${document
        .querySelector("h1.title")
        .textContent.trim()}'`;
      presenceData.smallImageKey = `reading`;
      presenceData.smallImageText = (await strings).reading;
    } else {
      presenceData.details = "Browsing the forum";
    }
  } else if (pathname.startsWith(`/studio`)) {
    presenceData.details = "Viewing a studio";
    presenceData.state =
      document.querySelector("div.container > h1").textContent;
  } else if (pathname.startsWith(`/review`)) {
    const title = document.querySelector(`a.title`).textContent.trim();
    presenceData.details = `Reading a '${title}' review`;
    const author = document
      .querySelector(`a.author`)
      .textContent.trim()
      .replace(`a review `, ``);
    presenceData.state = `${author}`;
    presenceData.smallImageKey = `reading`;
    presenceData.smallImageText = (await strings).reading;
  } else if (pathname.startsWith(`/notifications`)) {
    presenceData.details = `Viewing notifications`;
  } else if (pathname.startsWith(`/settings`)) {
    presenceData.details = `Changing settings`;
  }
  presence.setActivity(presenceData, true);
});
