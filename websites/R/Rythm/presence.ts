const presence = new Presence({
    clientId: "683285340571566091"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching",
    reading: "presence.activity.reading",
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const host = window.location.hostname.replace("www.", ""),
    path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {
      details: "Rythm",
      largeImageKey: "logo_big"
    };

  switch (host) {
    //Homepage
    case "rythmbot.co":
      switch (path[0]) {
        //Features & Commands
        case "features":
          presenceData.details = "Features & Commands";
          if (document.location.hash == "#list") {
            presenceData.smallImageKey = "reading";
            presenceData.smallImageText = (await strings).browsing;

            presenceData.state = "Browsing Commands";
          }
          break;
        //Rythm FAQ
        case "faq":
          presenceData.details = "Frequently Asked Questions";
          if (
            (document.getElementById("search") as HTMLInputElement).value
              .length > 0
          ) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = (await strings).search;

            presenceData.state = `Searching for "${
              (document.getElementById("search") as HTMLInputElement).value
            }"`;
          } else {
            presenceData.smallImageKey = "reading";
            presenceData.smallImageText = (await strings).reading;
          }
          break;
        //Troubleshooting Guide
        case "troubleshooting":
          presenceData.details = "Troubleshooting";
          if (
            (document.getElementById("search") as HTMLInputElement).value
              .length > 0
          ) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = (await strings).search;

            presenceData.state = `Searching for "${
              (document.getElementById("search") as HTMLInputElement).value
            }"`;
          } else {
            presenceData.smallImageKey = "reading";
            presenceData.smallImageText = (await strings).reading;
          }
          break;
        //Contact Us
        case "contact":
          presenceData.details = "Contact Us";
          break;
        //Terms of Service
        case "tos":
          presenceData.details = "Terms of Service";
          break;
        //Community Reviews
        case "reviews":
          presenceData.details = "Community Reviews";
          break;
        //Add to Discord
        case "invite":
        case "rythm":
        case "rythm2":
        case "rythmcanary": //Support Server
        case "support":
          presence.setTrayTitle();
          presence.setActivity();
          return;
        //Unknown
        default:
          presence.setTrayTitle();
          presence.setActivity();
          return;
      }
      break;

    //Web Dashboard
    case "web.rythmbot.co":
      //! The web dashboard is currently non functional - This part will be added once it's possible to use it again
      presenceData.details = "Web Dashboard";
      break;
  }

  presence.setActivity(presenceData);
});
