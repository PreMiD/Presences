const presence = new Presence({
    clientId: "642393312392904705"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };
let customData = false;

presence.on("UpdateData", async () => {
  customData = false;

  if (document.location.pathname === "/home")
    presenceData.details = "Viewing the homepage";
  else if (document.location.pathname.startsWith("/beatmaps/rank_request"))
    presenceData.details = "Requesting a beatmaps";
  else if (document.location.pathname.startsWith("/beatmaps")) {
    const title = document.querySelector(".map-title"),
      act = document.querySelector(".map-artist");

    if (title !== null && act !== null) {
      customData = true;

      const beatmapData: PresenceData = {
        details: "Looking at the beatmap:",
        state: `${(act as HTMLElement).innerText} - ${
          (title as HTMLElement).innerText
        }`,
        largeImageKey: "logo"
      };
      presence.setActivity(beatmapData);
    } else presenceData.details = "Searching for new beatmaps";
  } else if (document.location.pathname.startsWith("/s/")) {
    const title = document.querySelector(".map-title"),
      act = document.querySelector(".map-artist");

    if (title !== null && act !== null) {
      customData = true;

      const beatmapData: PresenceData = {
        details: "Looking at the beatmap:",
        state: `${(act as HTMLElement).innerText} - ${
          (title as HTMLElement).innerText
        }`,
        largeImageKey: "logo"
      };
      presence.setActivity(beatmapData);
    } else presenceData.details = "Searching for new beatmaps";
  } else if (document.location.pathname.startsWith("/b/")) {
    const title = document.querySelector(".map-title"),
      act = document.querySelector(".map-artist");

    if (title !== null && act !== null) {
      customData = true;

      const beatmapData: PresenceData = {
        details: "Looking at the beatmap:",
        state: `${(act as HTMLElement).innerText} - ${
          (title as HTMLElement).innerText
        }`,
        largeImageKey: "logo"
      };
      presence.setActivity(beatmapData);
    } else presenceData.details = "Searching for new beatmaps";
  } else if (document.location.pathname.startsWith("/leaderboard/osu")) {
    presenceData.details = "Browsing rankings";
    presenceData.state = "osu!";
  } else if (document.location.pathname.startsWith("/leaderboard/taiko")) {
    presenceData.details = "Browsing rankings";
    presenceData.state = "osu!taiko";
  } else if (document.location.pathname.startsWith("/leaderboard/ctb")) {
    presenceData.details = "Browsing rankings";
    presenceData.state = "osu!catch";
  } else if (document.location.pathname.startsWith("/leaderboard/mania")) {
    presenceData.details = "Browsing rankings";
    presenceData.state = "osu!mania";
  } else if (document.location.pathname.startsWith("/community/clans"))
    presenceData.details = "Browsing clans";
  else if (document.location.pathname.startsWith("/clan/")) {
    presenceData.details = "Browsing clans";
    presenceData.state = `${
      (document.querySelector(".clan-abbr") as HTMLElement).innerHTML +
      (document.querySelector(".clan-title") as HTMLElement).innerHTML
    }| ${
      (document.querySelector("div.clan-text-info-block > b") as HTMLElement)
        .innerHTML
    }`;
  } else if (document.location.pathname.startsWith("/community/plays"))
    presenceData.details = "Browsing Top plays";
  else if (document.location.pathname.startsWith("/community/livestreams"))
    presenceData.details = "Browsing livestreams";
  else if (document.location.pathname.startsWith("/community/matches"))
    presenceData.details = "Browsing Tournaments";
  else if (document.location.pathname.startsWith("/about"))
    presenceData.details = "Browsing About";
  else if (document.location.pathname.startsWith("/docs/")) {
    const doc = document.querySelector(".ban-stroke1"),
      title = document.querySelector(".ban-stroke2");

    if (doc !== null && title !== null) {
      customData = true;

      const beatmapData: PresenceData = {
        details: `Browsing ${(doc as HTMLElement).innerText}`,
        state: (title as HTMLElement).innerText,
        largeImageKey: "logo"
      };
      presence.setActivity(beatmapData);
    } else presenceData.details = "Browsing Documentation";
  } else if (document.location.pathname.startsWith("/user/notifications"))
    presenceData.details = "Browsing Notifications";
  else if (document.location.pathname.startsWith("/support"))
    presenceData.details = "Support Gatari!";
  else if (document.location.pathname.startsWith("/settings/general")) {
    presenceData.details = "Browsing account setting";
    presenceData.state = "General";
  } else if (document.location.pathname.startsWith("/settings/userpage")) {
    presenceData.details = "Browsing account setting";
    presenceData.state = "Userpage";
  } else if (document.location.pathname.startsWith("/settings/appearance")) {
    presenceData.details = "Browsing account setting";
    presenceData.state = "Appearance";
  } else if (document.location.pathname.startsWith("/settings/password")) {
    presenceData.details = "Browsing account setting";
    presenceData.state = "Password";
  } else if (document.location.pathname.startsWith("/settings/accounts")) {
    presenceData.details = "Browsing account setting";
    presenceData.state = "Accounts";
  } else if (document.location.pathname.startsWith("/user/register"))
    presenceData.details = "Registering account";
  else if (document.location.pathname.startsWith("/recover"))
    presenceData.details = "Recovering account";
  else if (document.location.pathname.startsWith("/friends"))
    presenceData.details = "Browsing friend list";
  else if (document.location.pathname.startsWith("/team"))
    presenceData.details = "Look at Garati Team";
  else if (document.location.pathname.startsWith("/u")) {
    const name: string = (document.querySelector(".user-name") as HTMLElement)
      .innerText;
    customData = true;
    const profileData: PresenceData = {
      details: `Looking at ${name}'s Profile`,
      state: `Performance: ${
        (document.querySelector("#chart1 > div > span") as HTMLElement)
          .innerText
      }`,
      largeImageKey: "logo"
    };
    presence.setActivity(profileData);
  }

  if (!customData) presence.setActivity(presenceData);
});

if (document.location.hostname === "sig.gatari.pw")
  presenceData.details = "Ready to generator a Signature";
