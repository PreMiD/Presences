const presence = new Presence({
  clientId: "908750540555571253"
}),
time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
    largeImageKey: "protonmail",
    startTimestamp: time
  },
  path = document.location.pathname;
if (path === "/") presenceData.details = "Browsing...";
else if (path.includes("/u/0/inbox"))
  presenceData.details = "Checking emails";
else if (path.includes("/u/0/spam"))
  presenceData.details = "Checking spam mails";
else if (path.includes("/u/0/trash")) {
  presenceData.details = "Checking trash mails";
}
if (!presenceData.details) {
  presence.setTrayTitle();
  presence.setActivity();
} else presence.setActivity(presenceData);
});