var presence = new Presence({
  clientId: "607875991746117643",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.pathname == "/") {
    let presenceData: presenceData = {
      details: "Looking at nekos",
      largeImageKey: "lg-nekos"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname == "/lewd") {
    let presenceData: presenceData = {
      details: "Looking at lewd nekos",
      largeImageKey: "lg-nekos"
    };
    presence.setActivity(presenceData);
  }
});
