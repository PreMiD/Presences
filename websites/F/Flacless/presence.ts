const presence = new Presence({
  clientId: "765137283661692948"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "flacless"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Starting Flacless";
  } else if (document.location.pathname.includes("/search")) {
    let title = document.title.split(" | ")[0].replace('on Flacless', '').trim();
    presenceData.details = "Searching";
    presenceData.state = title;
  } else if (document.location.pathname.includes("/track")) {
    let title = document.title.split(" by ")[0].trim();
    let artist = document.querySelector("meta[property='article:tag']").getAttribute('content');
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
