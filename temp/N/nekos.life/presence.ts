var presence = new Presence({
  clientId: "607875991746117643"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: presenceData = {
      details: "Looking at nekos",
      largeImageKey: "lg-nekos"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/lewd") {
    const presenceData: presenceData = {
      details: "Looking at lewd nekos",
      largeImageKey: "lg-nekos"
    };
    presence.setActivity(presenceData);
  }
});
