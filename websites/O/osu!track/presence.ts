const presence = new Presence({
    clientId: "861180231909113866"
  }),
  timestampe = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: timestampe
  },
    pathnames = location.pathname,
    urlSplit = document.URL.split("/"),
    decodeURL = decodeURIComponent(urlSplit[5]);

  if (document.location.hostname === "ameobea.me") {
    switch (pathnames) {
      case "/osutrack/":
        presenceData.details = "Viewing homepage";
        break;

      case "/osutrack/user/":
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = "User not found!";
        break;

      case `/osutrack/user/${urlSplit[5]}`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "osu_std_logo";
        presenceData.smallImageText = "osu!standard";
        break;

      case `/osutrack/user/${urlSplit[5]}/`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "osu_std_logo";
        presenceData.smallImageText = "osu!standard";
        break;

      case `/osutrack/user/${urlSplit[5]}/taiko`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "taiko";
        presenceData.smallImageText = "osu!taiko";
        break;

      case `/osutrack/user/${urlSplit[5]}/taiko/`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "taiko";
        presenceData.smallImageText = "osu!taiko";
        break;

      case `/osutrack/user/${urlSplit[5]}/ctb`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "ctb";
        presenceData.smallImageText = "osu!ctb (catch the beat)";
        break;

      case `/osutrack/user/${urlSplit[5]}/ctb/`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "ctb";
        presenceData.smallImageText = "osu!ctb (catch the beat)";
        break;

      case `/osutrack/user/${urlSplit[5]}/mania`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "mania";
        presenceData.smallImageText = "osu!mania";
        break;

      case `/osutrack/user/${urlSplit[5]}/mania/`:
        presenceData.details = "Viewing a user's statistics";
        presenceData.state = decodeURL;
        presenceData.smallImageKey = "mania";
        presenceData.smallImageText = "osu!mania";
        break;

      case "/osutrack/bestplays/":
        presenceData.details = "Viewing at the Best Plays";
        presenceData.state = "osu!standard";
        presenceData.smallImageKey = "osu_std_logo";
        presenceData.smallImageText = "osu!standard";
        break;

      case "/osutrack/bestplays/taiko/":
        presenceData.details = "Viewing at the Best Plays";
        presenceData.state = "osu!taiko";
        presenceData.smallImageKey = "taiko";
        presenceData.smallImageText = "osu!taiko";
        break;

      case "/osutrack/bestplays/ctb/":
        presenceData.details = "ViewKing at the Best Plays";
        presenceData.state = "osu!catch the beat (cbt)";
        presenceData.smallImageKey = "ctb";
        presenceData.smallImageText = "osu!catch the beat";
        break;

      case "/osutrack/bestplays/mania/":
        presenceData.details = "Viewing at the Best Plays";
        presenceData.state = "osu!mania";
        presenceData.smallImageKey = "mania";
        presenceData.smallImageText = "osu!mania";
        break;

      case "/osutrack/b/": {
        const indexText = document.querySelector("body > h1");
        presenceData.details = `Viewing ${indexText.textContent}`;
        break;
      }

      case "/osutrack/b/ads/":
        presenceData.details = "Viewing About Ads on osu!track";
        break;

      case "/osutrack/b/discord/":
        presenceData.details = "Viewing about osu!track's Discord Bot";
        break;

      case "/osutrack/b/mailer/":
        presenceData.details = "Viewing abotu osu!track's Mailerbot Refrence";
        break;

      case "/osutrack/b/pp/":
        presenceData.details = "Viewing at Top 10 PP Plays of osu!";
        break;

      case "/osutrack/updater/":
        presenceData.details = "Viewing at the IRC Bot's Documentation";
        break;

      case "/osutrack/updater/index.php":
        presenceData.details = "Viewing at the IRC Bot's Documentation";
        break;
    }
  }

  if (!presenceData.details) {
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
