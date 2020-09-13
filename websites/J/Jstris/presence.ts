const presence = new Presence({
  clientId: "754149249335296010"
}),
browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "bigdefault"
  };
  
  if (document.location.hostname == "jstris.jezevec10.com") {
      const pathname = document.location.pathname;
      switch (pathname) {

          case "/":
              presenceData.startTimestamp = browsingStamp;
              const queryString = document.location.search.substring(1)
              if (queryString) {
                var queryObj = parseQuery(document.location.search.substring(1));
                switch (queryObj.play) {
                  case "1":
                  const LinesMode = {"2":"20 Lines", "1": "40 Lines", "3": "100 Lines", "4": "1000 Lines"};
                  presenceData.details = "Sprint"

                  presenceData.state = LinesMode[queryObj.mode];
                    break;
                  case "2":
  
                    break;
                  case "3":
                    presenceData.details = "Cheese Race"
                    break;
                  default:
                  
                    break;
                }
              }
              else {
                presenceData.details = "Live"
              }
              break;

          default:
              //Idle
              presenceData.startTimestamp = browsingStamp;
              presenceData.details = "Idling";
              break;
      }
      if (pathname.startsWith("/song")) {
          presenceData.startTimestamp = browsingStamp;
          presenceData.details = document.querySelector(".song-title").innerHTML;
          presenceData.state = document.querySelector(".song-artist").innerHTML;
          if (document.querySelector(".player-active")) {
              presenceData.smallImageKey = "play";
          }
      }
  }

  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  } else {
      presence.setActivity(presenceData);
  }
});

function parseQuery(search : string) {
  return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
}