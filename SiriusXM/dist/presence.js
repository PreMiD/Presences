var presence = new Presence({
  clientId: "704186478410072065",
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "logo",
  };
  if (document.location.pathname == "/home/foryou") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing SiriusXM Home";
  } else if (document.location.pathname == "/home/music") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Music Home";
  } else if (document.location.pathname == "/home/sports") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Sports Home";
  } else if (document.location.pathname == "/home/news") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing News Home";
  } else if (document.location.pathname == "/home/entertainment") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Talk Home";
  } else if (document.location.pathname == "/home/howard") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Howard Stern Home";
  } else if (document.location.pathname == "/now-playing") {
    channelName = document.querySelector("p.channel-name");
    channelNumber = document.querySelector("p.channel-number");
    songName = document.querySelector("span.track-name");
    songArtist = document.querySelector("span.artist-name");
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = songName.innerText + " - " + songArtist.innerText;
    presenceData.state =
      channelName.innerText + " - " + channelNumber.innerText;
  } else if (document.location.pathname == "/favorites/channels") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Favorite Channels";
  } else if (document.location.pathname == "/favorites/shows") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Favorite Shows";
  } else if (document.location.pathname == "/favorites/episodes") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Favorite Episodes";
  } else if (document.location.pathname == "/recently-played") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Recently Played Stations";
  } else if (document.location.pathname == "/query") {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Searching SiriusXM";
  } else if (document.location.pathname.includes("/query")) {
    searchTerm = document.querySelector("h2.search-page-header");
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing: ";
    presenceData.state = searchTerm.innerText;
  } else if (document.location.pathname.includes("/category-listing")) {
    categoryTerm = document.querySelector("span.sxm-breadcrumb__text");
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Viewing Category: ";
    presenceData.state = categoryTerm.innerText;
  } else {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
