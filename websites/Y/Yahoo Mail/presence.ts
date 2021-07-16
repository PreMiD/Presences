const presence = new Presence({
    clientId: "844109673618735144"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;
  if (path.includes("/folders/") || path.includes("/search/")) {
    if (path.includes("messages")) {
      data.details = "Viewing an Email";
      data.startTimestamp = elapsed;
    } else {
      data.details = "Viewing Mail";
      data.startTimestamp = elapsed;
    }
  } else if (path.includes("/compose/")) {
    data.details = "Composing a New Email";
    data.startTimestamp = elapsed;
  } else if (path.includes("/settings/")) {
    data.details = "Viewing Settings";
    data.startTimestamp = elapsed;
  } else if (path.includes("/contacts")) {
    data.details = "Viewing Contacts";
    data.startTimestamp = elapsed;
  } else {
    data.details = "Viewing Mail";
    data.startTimestamp = elapsed;
  }
  presence.setActivity(data);
});
