const presence = new Presence({
    clientId: "739290632463319141"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    presence.setActivity({
      details: "Viewing the homepage",
      largeImageKey: "mdl-logo",
      smallImageKey: "reading",
      smallImageText: "Browsing",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/episode-calendar")) {
    presence.setActivity({
      details: "Viewing Upcomming Shows",
      largeImageKey: "mdl-logo",
      smallImageKey: "reading",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/search")) {
    let searchThing = decodeURIComponent(
      document.location.search.substring(3)
    ).replace(/\+/g, " ");

    if (searchThing.includes("&"))
      searchThing = searchThing.substring(0, searchThing.indexOf("&"));

    presence.setActivity({
      details: "Searching for a show...",
      state: searchThing,
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (window.location.href.match("/[^-][0-9]{1,5}")) {
    if (document.location.pathname.startsWith("/profile/")) {
      presence.setActivity({
        details: "Looking at user profile",
        state: document.querySelector(
          "#content > div > div.container-fluid.profile-container > div > div.col-lg-8.col-md-8 > div.box > div.box-header.box-navbar > div.profile-header > div.hidden-sm-down > h1"
        ).textContent,
        largeImageKey: "mdl-logo",
        startTimestamp: browsingTimestamp
      });
    } else if (document.location.pathname.startsWith("/people/")) {
      presence.setActivity({
        details: "Looking at Actors",
        state: document.querySelector(
          "#content > div > div.container-fluid > div > div.col-lg-4.col-md-4 > div > div:nth-child(1) > div.box-header.p-b-0.text-center > h1"
        ).textContent,
        largeImageKey: "mdl-logo",
        smallImageKey: "mdl-logo",
        smallImageText: "MDL",
        startTimestamp: browsingTimestamp
      });
    } else {
      presence.setActivity({
        details: "Viewing show page ...",
        state: document.querySelector(
          "div.col-lg-8.col-md-8.col-right > div:nth-child(1) > div.box-header.box-navbar > h1 > a"
        ).textContent,
        largeImageKey: "mdl-logo",
        smallImageKey: "mdl-logo",
        smallImageText: "MDL",
        startTimestamp: browsingTimestamp
      });
    }
  } else if (document.location.pathname.startsWith("/article/")) {
    presence.setActivity({
      details: "Reading an article",
      state: document.querySelector("#article > div.box-header > h1 > a")
        .textContent,
      largeImageKey: "mdl-logo",
      smallImageKey: "reading",
      smallImageText: "Reading and article",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname === "/articles") {
    presence.setActivity({
      details: "Browsing articles",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/trailers")) {
    presence.setActivity({
      details: "Looking at Trailers",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/feeds")) {
    presence.setActivity({
      details: "Browsing through feeds",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/list")) {
    presence.setActivity({
      details: "Looking at user lists",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/contributors")) {
    presence.setActivity({
      details: "Looking at Top Contributors",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/discussions")) {
    presence.setActivity({
      details: "Browsing forums",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/shows/")) {
    presence.setActivity({
      details: "Browsing Shows List",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/reviews/")) {
    presence.setActivity({
      details: "Reading Reviews",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/profile/")) {
    /*
        There are two profile sections due to regex mathcing, some profiles have numbers some dont.
        */

    presence.setActivity({
      details: "Looking at user profile",
      state: document.querySelector(
        "#content > div > div.container-fluid.profile-container > div > div.col-lg-8.col-md-8 > div.box > div.box-header.box-navbar > div.profile-header > div.hidden-sm-down > h1"
      ).textContent,
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "mdl",
      startTimestamp: browsingTimestamp
    });
  } else if (document.location.pathname.startsWith("/recommendations")) {
    presence.setActivity({
      details: "Looking at personailized recommendations",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      startTimestamp: browsingTimestamp
    });
  }
});
