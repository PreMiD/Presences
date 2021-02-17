var presence = new Presence({
  clientId: "811572600294735902"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;
var search: any;
let details: string,
state: string;


presence.on("UpdateData", async () => {
  console.log("test")
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  page = window.location.pathname,
  host = document.location.hostname;
  console.log(document.location.hostname)

    presenceData.startTimestamp = browsingStamp;
    if (host == "www.marktplaats.nl") {
      console.log("mp");
      
    if (page.includes("/sell/")) {
      title = document.querySelector("head > title")
      presenceData.details = "Viewing my ads";

    } else if (page == "/") {
      presenceData.details = "Viewing the homepage";
    }
  } else if (host == "help.marktplaats.nl") {
    console.log("help"); 
    
    if (page == "/s/") {
      presenceData.startTimestamp = browsingStamp;
      title = document.querySelector("head > title");
      presenceData.details = "Helpdesk searching for:";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
