const presence = new Presence({
    clientId: "739290632463319141"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

interface FilmData {
  "@type": string;
  name: string;
  image: string;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "mdl-logo",
      startTimestamp: browsingTimestamp
    },
    coverEnabled = await presence.getSetting("cover");

  if (document.location.pathname === "/") {
    presenceData.details = "Viewing the homepage";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Browsing";
  } else if (document.location.pathname.startsWith("/episode-calendar")) {
    presenceData.details = "Viewing Upcomming Shows";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/search")) {
    let searchThing = decodeURIComponent(
      document.location.search.substring(3)
    ).replace(/\+/g, " ");

    if (searchThing.includes("&"))
      searchThing = searchThing.substring(0, searchThing.indexOf("&"));

    presenceData.details = "Searching for a show...";
    presenceData.state = searchThing;
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (window.location.href.match("/[^-][0-9]{1,5}")) {
    if (document.location.pathname.startsWith("/profile/")) {
      const profilePicture = document.querySelector(
        ".box-user-profile :is(video, img)"
      );

      presenceData.details = `Viewing ${document
        .querySelector("profile-header h1")
        .textContent.trim()}'s profile`;
      presenceData.largeImageKey =
        profilePicture.getAttribute("poster") ??
        profilePicture.getAttribute("src");
      presenceData.smallImageKey = "mdl-logo";
      presenceData.smallImageText = "MDL";
    } else if (document.location.pathname.startsWith("/people/")) {
      presenceData.details = "Viewing an actor:";
      presenceData.state = document.querySelector(
        "#content > div > div.container-fluid > div > div.col-lg-4.col-md-4 > div > div:nth-child(1) > div.box-header.p-b-0.text-center > h1"
      ).textContent;
      presenceData.largeImageKey =
        document.querySelector<HTMLImageElement>(".box-body > img").src;
      presenceData.smallImageKey = "mdl-logo";
      presenceData.smallImageText = "MDL";
    } else {
      const filmData: FilmData = JSON.parse(
        document.querySelector('[type="application/ld+json"]').textContent
      ).mainEntity;

      presenceData.details = `Viewing ${
        filmData["@type"] === "Movie" ? "movie" : "show"
      }:`;
      presenceData.state = filmData.name;
      presenceData.largeImageKey = filmData.image;
      presenceData.smallImageKey = "mdl-logo";
      presenceData.smallImageText = "MDL";
    }
  } else if (document.location.pathname.startsWith("/article/")) {
    presenceData.details = "Reading an article:";
    presenceData.state = document.querySelector(
      "#article > div.box-header > h1 > a"
    ).textContent;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Reading and article";
  } else if (document.location.pathname === "/articles") {
    presenceData.details = "Browsing articles";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/trailers")) {
    presenceData.details = "Looking at Trailers";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/feeds")) {
    presenceData.details = "Browsing through feeds";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/list")) {
    presenceData.details = "Looking at user lists";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/contributors")) {
    presenceData.details = "Looking at Top Contributors";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/discussions")) {
    presenceData.details = "Browsing forums";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/shows/")) {
    presenceData.details = "Browsing Shows List";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/reviews/")) {
    presenceData.details = "Reading Reviews";
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/profile/")) {
    /*
    There are two profile sections due to regex mathcing, some profiles have numbers some dont.
    */
    const profilePicture = document.querySelector(
      ".box-user-profile :is(video, img)"
    );

    presenceData.details = `Viewing ${document
      .querySelector("profile-header h1")
      .textContent.trim()}'s profile`;
    presenceData.largeImageKey =
      profilePicture.getAttribute("poster") ??
      profilePicture.getAttribute("src");
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/recommendations")) {
    presenceData.details = "Looking at personailized recommendations";
    presenceData.smallImageKey = "mdl-logo";
  }

  if (presenceData.largeImageKey.includes("http") && !coverEnabled)
    presenceData.largeImageKey = "mdl-logo";

  presence.setActivity(presenceData);
});
