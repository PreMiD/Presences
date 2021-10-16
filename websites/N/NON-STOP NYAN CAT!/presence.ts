const presence = new Presence({
    clientId: "631039621656084480"
  }),
  timeNyaned = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    const presenceData: PresenceData = {
      details: "Nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/index.php")) {
    const presenceData: PresenceData = {
      details: "Nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/credits.php") {
    const presenceData: PresenceData = {
      details: "Looking at the credits",
      state: "...and probably nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/stats.php") {
    const presenceData: PresenceData = {
      details: "Looking at their stats",
      state: "...and probably nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
  }
});
