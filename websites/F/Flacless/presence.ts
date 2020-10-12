var presence = new Presence({
  clientId: "765137283661692948"
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {
    largeImageKey: "flacless"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Starting Flacless";
  } else if (document.location.pathname.includes("/search")) {
    var title = document.title.split(" | ")[0].replace('on Flacless', '').trim();
    presenceData.details = "Searching";
    presenceData.state = title;
  } else if (document.location.pathname.includes("/track")) {
    var title = document.title.split(" by ")[0].trim();
    var artist = document.querySelector("meta[property='article:tag']").getAttribute('content')
    presenceData.details = title;
    presenceData.state = 'by ' + artist;
  }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});