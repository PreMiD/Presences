const presence = new Presence({
    clientId: "857289302948970506" //The client ID of the Application created at https://discordapp.com/developers/applications
})

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey:
      "birdflop",
    details: "Browsing Hosting",
  };
  if (window.location.href.includes("www.birdflop.com")) {
    presenceData.details = "Browsing Hosting"
  }else if(window.location.href.includes("client.birdflop.com")) {
    if (window.location.pathname.toLowerCase().includes("/order")) {
      presenceData.details = "Browsing Hosting"
      presenceData.state = "Looking at plans";
    }
  }else if (window.location.href.includes("panel.birdflop.com")) {
      if (window.location.pathname.toLowerCase() === "/") {
        presenceData.details = "Viewing server list";
      }else if (window.location.pathname.toLowerCase().includes("/server")) {
        presenceData.details = `Looking at ${document.title}`;
      }else if (window.location.pathname.toLowerCase().includes("/phpmyadmin")){
        presenceData.details = "Edition SQL databases"
      }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});