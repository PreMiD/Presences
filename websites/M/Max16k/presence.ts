const presence = new Presence({
  clientId: "825411812966662154"
}),
  browsing = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    startTimestamp: browsing,
    largeImageKey: "logo"
  },
    page = document.location.pathname;

  if (page === "/") {
    presenceData.details = "Surft";
  } else if (page === "/datenschutzerklaerung/") {
    presenceData.details = "Bei Seite:";
    presenceData.state = "Impressum";
  } else if (page === "/copyright/") {
    presenceData.details = "Bei Seite:";
    presenceData.state = "Copyright";
  } else if (page === "/livechat/") {
    presenceData.details = "Ist im Livechat";
  } else if (page === "/better-discord-theme/") {
    presenceData.details = "Bei Seite:";
    presenceData.state = "Better Discord Theme";
  } else if (page === "/discord-bot/") {
    presenceData.details = "Bei Seite:";
    presenceData.state = "Discord Bot";
  } else if (page === "/datei-speedtest/") {
    presenceData.details = "Bei Seite:";
    presenceData.state = "Datei Speedtest";
  } else if (page === "/forum/") {
    presenceData.details = "Bei Seite:";
    presenceData.state = "Forum";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});