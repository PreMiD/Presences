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
    [, , , , , urlSplit] = document.URL.split("/"),
    decodeURL = decodeURIComponent(urlSplit);

  if (pathnames === "/osutrack/") presenceData.details = "Viewing homepage";
  else if (pathnames === "/osutrack/user/") {
    presenceData.details = "Viewing a user's statistics";
    presenceData.state = "User not found!";
  } else if (
    pathnames === `/osutrack/user/${urlSplit}` ||
    pathnames === `/osutrack/user/${urlSplit}/`
  ) {
    presenceData.details = "Viewing a user's statistics";
    presenceData.state = decodeURL;
    presenceData.smallImageKey = "osu_std_logo";
    presenceData.smallImageText = "osu!standard";
  } else if (pathnames.includes(`/osutrack/user/${urlSplit}/taiko`)) {
    presenceData.details = "Viewing a user's statistics";
    presenceData.state = `${decodeURL} in osu!taiko`;
    presenceData.smallImageKey = "taiko";
    presenceData.smallImageText = "Taiko";
  } else if (pathnames.includes(`/osutrack/user/${urlSplit}/ctb`)) {
    presenceData.details = "Viewing a user's statistics";
    presenceData.state = `${decodeURL} in osu!catch the beat`;
    presenceData.smallImageKey = "ctb";
    presenceData.smallImageText = "Catch The Beat (CTB)";
  } else if (pathnames.includes(`/osutrack/user/${urlSplit}/mania`)) {
    presenceData.details = "Viewing a user's statistics";
    presenceData.state = `${decodeURL} in osu!mania`;
    presenceData.smallImageKey = "mania";
    presenceData.smallImageText = "Mania";
  } else if (pathnames === "/osutrack/bestplays/") {
    presenceData.details = "Viewing at the Best Plays";
    presenceData.state = "osu!standard";
    presenceData.smallImageKey = "osu_std_logo";
    presenceData.smallImageText = "osu!standard";
  } else if (pathnames === "/osutrack/bestplays/taiko/") {
    presenceData.details = "Viewing at the Best Plays";
    presenceData.state = "osu!taiko";
    presenceData.smallImageKey = "taiko";
    presenceData.smallImageText = "osu!taiko";
  } else if (pathnames === "/osutrack/bestplays/ctb/") {
    presenceData.details = "ViewKing at the Best Plays";
    presenceData.state = "osu!catch the beat (cbt)";
    presenceData.smallImageKey = "ctb";
    presenceData.smallImageText = "osu!catch the beat";
  } else if (pathnames === "/osutrack/bestplays/mania/") {
    presenceData.details = "Viewing at the Best Plays";
    presenceData.state = "osu!mania";
    presenceData.smallImageKey = "mania";
    presenceData.smallImageText = "osu!mania";
  } else if (pathnames === "/osutrack/b/") {
    const indexText = document.querySelector("body > h1");

    presenceData.details = `Viewing ${indexText.textContent}`;
  } else if (pathnames === "/osutrack/b/ads/")
    presenceData.details = "Viewing About Ads on osu!track";
  else if (pathnames === "/osutrack/b/discord/")
    presenceData.details = "Viewing about osu!track's Discord Bot";
  else if (pathnames === "/osutrack/b/mailer/")
    presenceData.details = "Viewing abotu osu!track's Mailerbot Refrence";
  else if (pathnames === "/osutrack/b/pp/") {
    presenceData.details = "Viewing at Top 10 PP Plays of osu!";
    presenceData.state = "As of 10/10/2014";
  } else if (
    pathnames === "/osutrack/updater/" ||
    pathnames === "/osutrack/updater/index.php"
  )
    presenceData.details = "Viewing at the IRC Bot's Documentation";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
