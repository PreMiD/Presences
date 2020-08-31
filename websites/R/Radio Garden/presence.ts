const presence = new Presence({
  clientId: "687070418804408445" //The client ID of the Application created at https://discordapp.com/developers/applications
});

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/listen/")) {
    const elapsed = Math.floor(Date.now() / 1000);
    //var container = document.querySelector(".channel-list")
    //console.log(document.querySelector("div.mod-active").innerText)
    const presenceData: PresenceData = {
      details: `${document.querySelector("div.mod-active").textContent}`,
      state: `${document.querySelector(".location-info-location").textContent}`,
      largeImageKey: "bigglobe",
      startTimestamp: elapsed
    };

    presence.setActivity(presenceData);
  }
});
