const presence = new Presence({
  clientId: "612793327510749210"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.href.match("https://kahoot.it")) {
    switch(document.location.pathname) {
      case "/":
       presenceData.state = 'Browsing the homepage',
      case "/test":
        presenceData.startTimestamp = "test",
    }
  }
  
});
