const presence = new Presence({
    clientId: "631039621656084480"
  }),
  timeNyaned = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    presence.setActivity({
      details: "Nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    });
  } else if (document.location.pathname.startsWith("/index.php")) {
    presence.setActivity({
      details: "Nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    });
  } else if (document.location.pathname === "/credits.php") {
    presence.setActivity({
      details: "Looking at the credits",
      state: "...and probably nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    });
  } else if (document.location.pathname === "/stats.php") {
    presence.setActivity({
      details: "Looking at their stats",
      state: "...and probably nyaning",
      largeImageKey: "nyan",
      startTimestamp: timeNyaned
    });
  }
});
