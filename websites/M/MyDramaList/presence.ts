const presence = new Presence({
    clientId: "739290632463319141"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    const homepagePresence: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "mdl-logo",
      smallImageKey: "reading",
      smallImageText: "Browsing",
      startTimestamp: browsingStamp
    };
    presence.setActivity(homepagePresence);
  } else if (document.location.pathname.startsWith("/episode-calendar")) {
    const calendarData: PresenceData = {
      details: "Viewing Upcomming Shows",
      largeImageKey: "mdl-logo",
      smallImageKey: "reading",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };
    presence.setActivity(calendarData);
  } else if (document.location.pathname.startsWith("/search")) {
    let searchThing = decodeURIComponent(
      document.location.search.substring(3)
    ).replace(/\+/g, " ");

    if (searchThing.includes("&"))
      searchThing = searchThing.substring(0, searchThing.indexOf("&"));

    const presenceData: PresenceData = {
      details: "Searching for a show...",
      state: searchThing,
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (window.location.href.match("/[^-][0-9]{1,5}")) {
    if (document.location.pathname.startsWith("/profile/")) {
      const profileName1 = document.querySelector(
          "#content > div > div.container-fluid.profile-container > div > div.col-lg-8.col-md-8 > div.box > div.box-header.box-navbar > div.profile-header > div.hidden-sm-down > h1"
        ),
        profilePresnceData: PresenceData = {
          details: "Looking at user profile",
          state: profileName1.textContent,
          largeImageKey: "mdl-logo",
          startTimestamp: browsingStamp
        };
      presence.setActivity(profilePresnceData);
    } else if (document.location.pathname.startsWith("/people/")) {
      const actorsName = document.querySelector(
          "#content > div > div.container-fluid > div > div.col-lg-4.col-md-4 > div > div:nth-child(1) > div.box-header.p-b-0.text-center > h1"
        ),
        actorPresenceData: PresenceData = {
          details: "Looking at Actors",
          state: actorsName.textContent,
          largeImageKey: "mdl-logo",
          smallImageKey: "mdl-logo",
          smallImageText: "MDL",
          startTimestamp: browsingStamp
        };

      presence.setActivity(actorPresenceData);
    } else {
      const showName = document.querySelector(
          "div.col-lg-8.col-md-8.col-right > div:nth-child(1) > div.box-header.box-navbar > h1 > a"
        ),
        presenceData: PresenceData = {
          details: "Viewing show page ...",
          state: showName.textContent,
          largeImageKey: "mdl-logo",
          smallImageKey: "mdl-logo",
          smallImageText: "MDL",
          startTimestamp: browsingStamp
        };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/article/")) {
    const articleName = document.querySelector(
        "#article > div.box-header > h1 > a"
      ).textContent,
      presenceData: PresenceData = {
        details: "Reading an article",
        state: articleName,
        largeImageKey: "mdl-logo",
        smallImageKey: "reading",
        smallImageText: "Reading and article",
        startTimestamp: browsingStamp
      };
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/articles") {
    const presenceData: PresenceData = {
      details: "Browsing articles",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/trailers")) {
    const presenceData: PresenceData = {
      details: "Looking at Trailers",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/feeds")) {
    const presenceData: PresenceData = {
      details: "Browsing through feeds",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/list")) {
    const presenceData: PresenceData = {
      details: "Looking at user lists",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/contributors")) {
    const presenceData: PresenceData = {
      details: "Looking at Top Contributors",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/discussions")) {
    const presenceData: PresenceData = {
      details: "Browsing forums",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/shows/")) {
    const presenceData: PresenceData = {
      details: "Browsing Shows List",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/reviews/")) {
    const presenceData: PresenceData = {
      details: "Reading Reviews",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      smallImageText: "MDL",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/profile/")) {
    /*
        There are two profile sections due to regex mathcing, some profiles have numbers some dont.
        */
    const profileName = document.querySelector(
        "#content > div > div.container-fluid.profile-container > div > div.col-lg-8.col-md-8 > div.box > div.box-header.box-navbar > div.profile-header > div.hidden-sm-down > h1"
      ),
      presenceData: PresenceData = {
        details: "Looking at user profile",
        state: profileName.textContent,
        largeImageKey: "mdl-logo",
        smallImageKey: "mdl-logo",
        smallImageText: "mdl",
        startTimestamp: browsingStamp
      };

    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/recommendations")) {
    const presenceData: PresenceData = {
      details: "Looking at personailized recommendations",
      largeImageKey: "mdl-logo",
      smallImageKey: "mdl-logo",
      startTimestamp: browsingStamp
    };

    presence.setActivity(presenceData);
  }
});
