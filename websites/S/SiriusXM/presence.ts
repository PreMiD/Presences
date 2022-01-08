const presence = new Presence({
  clientId: "843058220398542878"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/home/foryou")
    presenceData.details = "Viewing SiriusXM Home";
  else if (document.location.pathname === "/home/music")
    presenceData.details = "Viewing Music Home";
  else if (document.location.pathname === "/home/sports")
    presenceData.details = "Viewing Sports Home";
  else if (document.location.pathname === "/home/news")
    presenceData.details = "Viewing News Home";
  else if (document.location.pathname === "/home/entertainment")
    presenceData.details = "Viewing Talk Home";
  else if (document.location.pathname === "/home/howard")
    presenceData.details = "Viewing Howard Stern Home";
  else if (document.location.pathname === "/favorites/channels")
    presenceData.details = "Viewing Favorite Channels";
  else if (document.location.pathname === "/favorites/shows")
    presenceData.details = "Viewing Favorite Shows";
  else if (document.location.pathname === "/favorites/episodes")
    presenceData.details = "Viewing Favorite Episodes";
  else if (document.location.pathname === "/recently-played")
    presenceData.details = "Viewing Recently Played Stations";
  else if (document.location.pathname === "/query")
    presenceData.details = "Searching SiriusXM";
  else if (document.location.pathname.includes("/query")) {
    presenceData.details = "Viewing: ";
    presenceData.state = document.querySelector<HTMLInputElement>(
      '[name="searchText"]'
    ).value;
  } else if (document.location.pathname.includes("/category-listing")) {
    presenceData.details = "Viewing Category: ";
    presenceData.state = document.querySelector(
      "span.sxm-breadcrumb__text"
    ).textContent;
  } else presenceData.details = "Unknown page";

  if (document.querySelector(".sxm-player-controls.no-select")) {
    const data = {
      channel: document.querySelector(".channel-name")?.textContent,
      track: document.querySelector(".track-name")?.textContent ?? "Loading",
      artist: document.querySelector(".artist-name")?.textContent ?? "Loading"
    };

    if (data.track === data.artist) presenceData.details = data.track;
    else if (data.channel)
      presenceData.details = `${data.track} - ${data.artist}`;
    else presenceData.details = data.track;

    if (data.channel) presenceData.state = data.channel;
    else presenceData.state = data.artist;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
