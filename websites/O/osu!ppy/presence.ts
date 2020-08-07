var presence = new Presence({
    clientId: "609774216430092298"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  customData = false;

presence.on("UpdateData", async () => {
  customData = false;

  if (document.location.pathname == "/home") {
    presenceData.details = "Viewing the homepage";
  } else if (document.location.pathname.startsWith("/home/download")) {
    presenceData.details = "Downloading the game";
  } else if (document.location.pathname.startsWith("/beatmapsets")) {
    var title = document.querySelector(
        ".beatmapset-header__details-text--title"
      ),
      diff = document.querySelector(".beatmapset-header__diff-name");

    if (title != null && diff != null) {
      customData = true;

      var beatmapData: PresenceData = {
        details: "Looking at the beatmap:",
        state:
          (title as HTMLElement).innerText +
          "[" +
          (diff as HTMLElement).innerText +
          "]",
        largeImageKey: "logo"
      };
      presence.setActivity(beatmapData);
    } else {
      presenceData.details = "Searching for new beatmaps";
    }
  } else if (document.location.pathname.startsWith("/beatmaps/packs")) {
    presenceData.details = "Browsing through beatmap packs";
  } else if (document.location.pathname.startsWith("/beatmaps/artists")) {
    presenceData.details = "Browsing through featured artists";
  } else if (document.location.pathname.startsWith("/store")) {
    presenceData.details = "Browsing through the store";
  } else if (document.location.pathname.startsWith("/rankings")) {
    presenceData.details = "Browsing through the rankings";
  } else if (document.location.pathname.startsWith("/community/forums")) {
    presenceData.details = "Browsing through the forum";
  } else if (document.location.pathname.startsWith("/community/chat")) {
    presenceData.details = "Chatting";
  } else if (document.location.pathname.startsWith("/community/contests")) {
    presenceData.details = "Browsing through the Contests";
  } else if (document.location.pathname.startsWith("/community/livestreams")) {
    presenceData.details = "Browsing through livestreams";
  } else if (document.location.pathname.startsWith("/community/tournaments")) {
    presenceData.details = "Browsing through Tournaments";
  } else if (document.location.pathname.startsWith("/home/search")) {
    presenceData.details = "Is searching something";
  } else if (document.location.pathname.startsWith("/home/account/edit")) {
    presenceData.details = "Changing their account settings";
  } else if (document.location.pathname.startsWith("/help/wiki")) {
    presenceData.details = "Browsing through the wiki";
  } else if (document.location.pathname.startsWith("/home/changelog")) {
    presenceData.details = "Looking at the changelog";
  } else if (document.location.pathname.startsWith("/home/friends")) {
    presenceData.details = "Browsing through the friend list";
  } else if (document.location.pathname.startsWith("/users")) {
    var name: string = (document.querySelector(
      ".profile-info__name .u-ellipsis-overflow"
    ) as HTMLElement).innerText;
    customData = true;
    var profileData: PresenceData = {
      details: "Looking at " + name + "'s Profile",
      state:
        "Rank: " +
        (document.querySelector(".value-display__value") as HTMLElement)
          .innerText +
        " / " +
        (document.querySelector(
          ".value-display--pp .value-display__value"
        ) as HTMLElement).innerText +
        "pp",
      largeImageKey: "logo"
    };
    presence.setActivity(profileData);
  } else {
    presenceData.details = "Seems to be somewhere wrongly";
  }
  if (!customData) {
    presence.setActivity(presenceData);
  }
});

presence.on("iFrameData", function (data) {
  console.log(data);
});
