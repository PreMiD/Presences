var presence = new Presence({
  clientId: "617622829978091530"
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const homepagePresence: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(homepagePresence);
  } else if (document.location.pathname.startsWith("/minecraft-names")) {
    const presenceData: PresenceData = {
      details: "Viewing Upcoming Names",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/minecraft-skins")) {
    if (document.location.pathname.endsWith("/top")) {
      const presenceData: PresenceData = {
        details: "Viewing Top Skins",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("/new")) {
      const presenceData: PresenceData = {
        details: "Viewing New Skins",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("/random")) {
      const presenceData: PresenceData = {
        details: "Viewing Random Skins",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/minecraft-skins/tag")) {
      if (document.location.pathname.endsWith("/minecraft-skins/tag")) {
        const presenceData: PresenceData = {
          details: "Viewing Tagged Skins",
          largeImageKey: "namemc-logo",
          startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
      } else {
        var tag = document.location.pathname.split("/")[3];
        const presenceData: PresenceData = {
          details: "Viewing Skins with " + tag + " Tag",
          largeImageKey: "namemc-logo",
          startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
      }
    } else {
      const presenceData: PresenceData = {
        details: "Viewing Trending Skins",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/capes")) {
    const presenceData: PresenceData = {
      details: "Viewing Capes",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/minecraft-servers")) {
    const presenceData: PresenceData = {
      details: "Viewing Servers",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/claim-your-profile")) {
    const presenceData: PresenceData = {
      details: "Viewing How To Claim Profile",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/my-profile")) {
    if (document.location.pathname.endsWith("/info")) {
      const presenceData: PresenceData = {
        details: "Editing Profile Info",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("/skins")) {
      const presenceData: PresenceData = {
        details: "Viewing Profile Skins",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("/friends")) {
      const presenceData: PresenceData = {
        details: "Viewing Profile Friends",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("/emoji")) {
      const presenceData: PresenceData = {
        details: "Viewing Profile Emojis",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("/abandon")) {
      const presenceData: PresenceData = {
        details: "Viewing Profile Abandon Page",
        largeImageKey: "namemc-logo",
        startTimestamp: browsingStamp
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/profile")) {
    var userlink = document.location.pathname.split("/")[2];
    var username = userlink.split(".")[0];
    const presenceData: PresenceData = {
      details: "Viewing a Profile",
      state: username,
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/privacy")) {
    const presenceData: PresenceData = {
      details: "Viewing Privacy Policy",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/skin")) {
    const presenceData: PresenceData = {
      details: "Viewing a Skin",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/cape")) {
    var title = document.querySelector(".default-skin main.container h1");
    var cape = (title as HTMLElement).innerHTML.split("<")[0];
    const presenceData: PresenceData = {
      details: "Viewing a Cape",
      state: cape + " Cape",
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/server")) {
    var server = document.location.pathname.split("/")[2];
    const presenceData: PresenceData = {
      details: "Viewing a Server",
      state: server,
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/search")) {
    var searchURL = new URL(document.location.href);
    var searchuser = searchURL.searchParams.get("q");
    const presenceData: PresenceData = {
      details: "Searching for a Profile",
      state: searchuser,
      largeImageKey: "namemc-logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  }
});
