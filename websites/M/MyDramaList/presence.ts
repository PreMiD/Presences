const presence = new Presence({
    clientId: "739290632463319141"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mdl-logo",
    startTimestamp: browsingTimestamp
  };
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
      presenceData.details = "Looking at user profiles";
      presenceData.state = document.querySelector(
        "#content > div > div.container-fluid.profile-container > div > div.col-lg-8.col-md-8 > div.box > div.box-header.box-navbar > div.profile-header > div.hidden-sm-down > h1"
      ).textContent;
    } else if (document.location.pathname.startsWith("/people/")) {
      presenceData.details = "Looking at Actors";
      presenceData.state = document.querySelector(
        "#content > div > div.container-fluid > div > div.col-lg-4.col-md-4 > div > div:nth-child(1) > div.box-header.p-b-0.text-center > h1"
      ).textContent;
      presenceData.smallImageKey = "mdl-logo";
      presenceData.smallImageText = "MDL";
    } else {
      presenceData.details = "Viewing show page ...";
      presenceData.state = document.querySelector(
        "div.col-lg-8.col-md-8.col-right > div:nth-child(1) > div.box-header.box-navbar > h1 > a"
      ).textContent;
      presenceData.smallImageKey = "mdl-logo";
      presenceData.smallImageText = "MDL";
    }
  } else if (document.location.pathname.startsWith("/article/")) {
    presenceData.details = "Reading an article";
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
    presenceData.details = "Looking at user profile";
    presenceData.state = document.querySelector(
      "#content > div > div.container-fluid.profile-container > div > div.col-lg-8.col-md-8 > div.box > div.box-header.box-navbar > div.profile-header > div.hidden-sm-down > h1"
    ).textContent;
    presenceData.smallImageKey = "mdl-logo";
    presenceData.smallImageText = "MDL";
  } else if (document.location.pathname.startsWith("/recommendations")) {
    presenceData.details = "Looking at personailized recommendations";
    presenceData.smallImageKey = "mdl-logo";
  }
  presence.setActivity(presenceData);
});
