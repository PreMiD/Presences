const presence = new Presence({
    clientId: "636588416854917130"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, search: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "1337x"
  };

  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/home/"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("/movie-library")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the movie library";
  } else if (document.location.pathname.includes("/series-library")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the series library";
  } else if (document.location.pathname.includes("/new-episodes")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the latest episodes";
  } else if (document.location.pathname.includes("/top-100")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the top 100";
  } else if (document.location.pathname.includes("/trending")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing what's trending";
  } else if (document.location.pathname.includes("/cat/Anime/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Anime torrents";
  } else if (document.location.pathname.includes("/sub/")) {
    title = document.querySelector(
      "body > main > div > div > div.box-info.trending > div > h1"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing:";
    presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/cat/Apps/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Apps Torrents";
  } else if (document.location.pathname.includes("/cat/Documentaries/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Documentaries Torrents";
  } else if (document.location.pathname.includes("/cat/Games/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Games Torrents";
  } else if (document.location.pathname.includes("/cat/Movies/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Movies Torrents";
  } else if (document.location.pathname.includes("/cat/Music/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Music Torrents";
  } else if (document.location.pathname.includes("/cat/Other/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Other Torrents";
  } else if (document.location.pathname.includes("/cat/TV/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing TV Torrents";
  } else if (document.location.pathname.includes("/cat/XXX/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing XXX Torrents";
  } else if (document.location.pathname.includes("/upload")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Uploading something...";
  } else if (document.location.pathname.includes("/rules")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading the rules";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/contact")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Writing to 1337x";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading about 1337x";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/torrent/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing torrent:";
    title = document.querySelector(
      "body > main > div > div > div > div.box-info-heading.clearfix > h1"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/search")) {
    search = document.querySelector(
      "body > main > div > div > div > div.box-info-heading.clearfix > h1 > span"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching for:";
    presenceData.state = search.innerText;
    presenceData.smallImageKey = "search";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
