const presence = new Presence({
    clientId: "634124614544392193"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching",
    browsing: "presence.activity.browsing"
  });

var lastPath = ""; //Last played radio station or podcast
var browsingStamp = 0; //Timestamp when started listening to a radio station

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1);
  const presenceData: PresenceData = {
    details: "Radio.net",
    largeImageKey: "logo_big"
  };

  switch (path[0]) {
    //Radio
    case "s":
    //Podcast
    case "p": {
      if (path[1] != lastPath || browsingStamp == 0) {
        browsingStamp = Math.round(Date.now() / 1000);
        lastPath = path[1];
      }
      const playerIcon = document.querySelector(
        ".player__animate-icon"
      ) as HTMLElement;
      const name = document.querySelector("h1") as HTMLElement; //Current Radio / Podcast
      const info = document.querySelector("div.player__song") as HTMLElement; //Current Song / Episode
      const status = document.querySelector(".player__info-wrap") as HTMLElement; //Player Status

      if (playerIcon.style.display != "none") {
        //Playing
        presenceData.details = name.innerText;
        presenceData.state = info.innerText;

        presenceData.smallImageText = (await strings).play;
        presenceData.smallImageKey = "play";

        presenceData.startTimestamp = browsingStamp;

        //Get the podcast play position
        if (path[0] == "p") {
          presenceData.endTimestamp = browsingStamp;

          //Get the start / current position
          const [start, end] = (document.querySelector(
              ".player__timing-wrap"
          ) as HTMLElement).textContent.split("|").map(e => e.split(":").reverse());

          //Add the amount of time the podcast has been playing
          if (start.length > 0) {
            presenceData.startTimestamp += parseInt(start[0]);
          }
          if (start.length > 1) {
            presenceData.startTimestamp += parseInt(start[1]) * 60;
          }
          if (start.length > 2) {
            presenceData.startTimestamp += parseInt(start[2]) * 60 * 24;
          }

          //Add the length of the podcast
          if (end.length > 0) {
            presenceData.endTimestamp += parseInt(end[0]);
          }
          if (end.length > 1) {
            presenceData.endTimestamp += parseInt(end[1]) * 60;
          }
          if (end.length > 2) {
            presenceData.endTimestamp += parseInt(end[2]) * 60 * 24;
          }
        }
      } else {
        //Paused
        browsingStamp = 0;

        presenceData.details = name.innerText;

        presenceData.smallImageText = (await strings).pause;
        presenceData.smallImageKey = "pause";

        if (status.style.display != "none") {
          //Player status is being displayed (example: BUFFERING)
          const adlength = status.innerText.match(/\d+/g)
            ? parseInt(status.innerText.match(/\d+/g)[0])
            : 0;

          if (adlength > 0) {
            presenceData.state = "Currently watching an ad";

            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            presenceData.endTimestamp = presenceData.startTimestamp + adlength;
          } else {
            presenceData.state = status.innerText;
          }
        } else {
          //Player is inactive (no status is being displayed)
          const tags = (document.querySelector(".z7kxsz-11") as HTMLElement).textContent;
          presenceData.state = tags;
        }
      }
      break;
    }
    //Search
    case "search": {
      browsingStamp = 0;
      const results = document.querySelector("h1").innerText.match(/\d+/g)[0];

      presenceData.details = new URLSearchParams(window.location.search).get(
        "q"
      );
      presenceData.state = `${results} results`;

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).search;
      break;
    }
    //Genre / Topic
    case "genre":
    //Country / City
    case "topic":
    case "country":
    //Local Stations / Top 100 Stations
    case "city":
    case "local-stations":
    case "top-stations":
      browsingStamp = 0;

      presenceData.details = document.querySelector("h1").innerText;

      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = (await strings).browsing;
      break;
    //My Profile / Recently Played / My Favorites
    case "profile":
    case "recents":
    case "favorites":
    //Terms and Conditions / Privacy Policy / Imprint / Contact
    case "terms-and-conditions":
    case "privacy-policy":
    case "imprint":
    case "contact":
      browsingStamp = 0;

      presenceData.details = document.title;
      break;
    //Smartphone Apps
    case "iphone":
    case "ipad":
    case "android":
    case "windowsphone":
    case "blackberry":
      browsingStamp = 0;

      presenceData.details = document.title;
      break;
    //Unknown
    default:
      presence.setTrayTitle();
      presence.setActivity();
      return;
  }
  
  presence.setActivity(presenceData);
});
