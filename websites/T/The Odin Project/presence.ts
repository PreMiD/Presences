const presence = new Presence({
    clientId: "977283785076932639",
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "odin",
    startTimestamp: browsingTimestamp,
    details: "Viewing home page",
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/paths"))
    presenceData.details = `${document.title}`;
  else if (document.location.pathname.includes("/lessons"))
    presenceData.details = `${document.title}`;

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
