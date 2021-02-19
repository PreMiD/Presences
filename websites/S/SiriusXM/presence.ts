const presence = new Presence({ clientId: "704186478410072065" });

let channelName: HTMLElement,
  channelNumber: HTMLElement,
  songName: HTMLElement,
  songArtist: HTMLElement,
  searchTerm: HTMLElement,
  categoryTerm: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/home/foryou") {
    presenceData.details = "Viewing SiriusXM Home";
  } else if (document.location.pathname == "/home/music") {
    presenceData.details = "Viewing Music Home";
  } else if (document.location.pathname == "/home/sports") {
    presenceData.details = "Viewing Sports Home";
  } else if (document.location.pathname == "/home/news") {
    presenceData.details = "Viewing News Home";
  } else if (document.location.pathname == "/home/entertainment") {
    presenceData.details = "Viewing Talk Home";
  } else if (document.location.pathname == "/home/howard") {
    presenceData.details = "Viewing Howard Stern Home";
  } else if (
    document.querySelector("p.now-playing-info-label__text").textContent ===
    "On Air Show"
  ) {
    channelName = document.querySelector("p.channel-name");
    channelNumber = document.querySelector("p.channel-number");
    songName = document.querySelector("span.track-name");
    songArtist = document.querySelector("span.artist-name");

    presenceData.details = songName.innerText + " - " + songArtist.innerText;
    presenceData.state =
      channelName.innerText + " - " + channelNumber.innerText;
  } else if (
    document.querySelector("p.now-playing-info-label__text").textContent ===
    "Xtra Channel"
  ) {
    channelName = document.querySelector("p.channel-name");
    songName = document.querySelector("span.track-name");
    songArtist = document.querySelector("span.artist-name");

    presenceData.details = songName.innerText + " - " + songArtist.innerText;
    presenceData.state = channelName.innerText + " - Xtra Channel";
  } else if (
    document.querySelector("p.now-playing-info-label__text").textContent ===
    "Episode"
  ) {
    songName = document.querySelector("p.track-name");
    songArtist = document.querySelector("p.show-title");

    presenceData.details = songName.innerText + " - " + songArtist.innerText;
    presenceData.state = "On Demand Episode";
  } else if (
    document.querySelector("p.now-playing-info-label__text").textContent ===
    "Pandora Station"
  ) {
    channelName = document.querySelector("p.channel-name");
    songName = document.querySelector("span.track-name");
    songArtist = document.querySelector("span.artist-name");

    presenceData.details = songName.innerText + " - " + songArtist.innerText;
    presenceData.state = channelName.innerText + " - Pandora Station";
  } else if (document.location.pathname == "/favorites/channels") {
    presenceData.details = "Viewing Favorite Channels";
  } else if (document.location.pathname == "/favorites/shows") {
    presenceData.details = "Viewing Favorite Shows";
  } else if (document.location.pathname == "/favorites/episodes") {
    presenceData.details = "Viewing Favorite Episodes";
  } else if (document.location.pathname == "/recently-played") {
    presenceData.details = "Viewing Recently Played Stations";
  } else if (document.location.pathname == "/query") {
    presenceData.details = "Searching SiriusXM";
  } else if (document.location.pathname.includes("/query")) {
    searchTerm = document.querySelector("h2.search-page-header");

    presenceData.details = "Viewing: ";
    presenceData.state = searchTerm.innerText;
  } else if (document.location.pathname.includes("/category-listing")) {
    categoryTerm = document.querySelector("span.sxm-breadcrumb__text");

    presenceData.details = "Viewing Category: ";
    presenceData.state = categoryTerm.innerText;
  } else {
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
