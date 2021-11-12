const presence = new Presence({
  clientId: "907692817604833281"
}),
time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
    largeImageKey: "coinmarketcap",
    startTimestamp: time
  },
  path = document.location.pathname;
if (path === "/") presenceData.details = "Browsing...";
else if (path.includes("/currencies"))
  presenceData.details = "Looking at Currencies";
else if (path.includes("/currencies/bitcoin"))
  presenceData.details = "Looking at Bitcoin";
else if (path.includes("/portfolio-tracker/")) {
  presenceData.details = "Looking at portfolio";
} else if (path.includes("/rankings/exchanges/"))
  presenceData.details = "Looking at exchanges";
if (!presenceData.details) {
  presence.setTrayTitle();
  presence.setActivity();
} else presence.setActivity(presenceData);
});