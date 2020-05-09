var presence = new Presence({
  clientId: "687070418804408445" //The client ID of the Application created at https://discordapp.com/developers/applications
});

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/listen/")) {
    elapsed = Math.floor(Date.now() / 1000);
    //var container = document.querySelector(".channel-list")
    //console.log(document.querySelector("div.mod-active").innerText)
    let presenceData = {
      details: `${document.querySelector("div.mod-active").innerText}`,
      state: `${document.querySelector(".location-info-location").innerText}`,
      largeImageKey: "bigglobe",
      startTimestamp: elapsed
    };

    presence.setActivity(presenceData);
  }
});
