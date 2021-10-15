const presence = new Presence({
  clientId: "637737627151368202"
});

presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "large",
    details: "Using Jummbox",
    state: "Making a Beep"
  };

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
