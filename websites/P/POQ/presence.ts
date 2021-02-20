const presence = new Presence({
  clientId: "752138871709499462"
});

const browsingStamp = Math.floor(Date.now() / 1000);
function cal(str: string) {

  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "poq1",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname == "www.poq.gg") {
    console.log("Online");
    if (document.location.pathname.startsWith("/games")) {
      presenceData.details = "Browsing through";
      presenceData.state = `Games`;
    }
    if (document.location.pathname.startsWith("/fortnite")) {
      presenceData.details = "Looking at";
      presenceData.state = "Fortnite tournaments";
    }
    if (document.location.pathname.startsWith("/rocket-league")) {
      presenceData.details = "Looking at";
      presenceData.state = "Rocket League tournaments";
    }
    if (document.location.pathname.startsWith("/marbles-on-stream")) {
      presenceData.details = "Looking at";
      presenceData.state = "Marbles on Stream tournaments"
    }
    if (document.location.pathname.startsWith("/call-of-duty-warzone")) {
      presenceData.details = "Looking at";
      presenceData.state = `Call of Duty: Warzone tournaments`
      
    }
    else if (document.location.href.indexOf('?' + `game` + '=') != -1) {
      presenceData.details = "Looking at";
      var gm = document.location.pathname.replace(/^.*[\\\/]/, '');
      gm = gm.replace(/-/g, ' ');
      gm = cal(gm);
      presenceData.state = `${gm} tournaments`
      
    }
    
  }
  const showPrize: boolean = await presence.getSetting("prize");

  if (document.location.hostname === "prizes.poq.gg") {
    presenceData.details = "Browsing through the";
    presenceData.state = "Prize Store";
    presenceData.smallImageKey = `prize`;
    presenceData.smallImageText = `prizes.poq.gg`
    if (document.location.pathname.startsWith("/product/")) {
      if (showPrize) {
        presenceData.details = `Browsing a product:`;
        var pl = document.title.split('–');
        console.log(pl[0]);
        presenceData.state = `${pl[0]}`;
      }
    }
  }
  if (document.location.hostname === 'creators.poq.gg') {
    presenceData.details = "Browsing the";
    presenceData.state = "POQ Creator Program";
    presenceData.smallImageKey = `verified`;
    presenceData.smallImageText = `creators.poq.gg`
  }

  presence.setActivity(presenceData);
});
