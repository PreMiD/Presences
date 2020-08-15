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
    case "s": //Radio
    case "p": //Podcast
      if (path[1] != lastPath || browsingStamp == 0) {
        browsingStamp = Math.round(Date.now() / 1000);
        lastPath = path[1];
      }

      //Player State
      const playerIcon = document.querySelector(
        ".player__animate-icon"
      ) as HTMLElement;
      //Current Radio / Podcast
      const name = document.querySelector(
        "h1"
      ) as HTMLElement;
      //Current Song / Episode
      const info = document.querySelector(
        "div.player__song"
      ) as HTMLElement;
      //Player Status
      const status = document.querySelector(
        ".player__info-wrap"
      ) as HTMLElement;

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
          ) as HTMLElement).textContent
            .split("|")
            .map((e) => e.split(":").reverse());

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
    case "search": //Search
      browsingStamp = 0;
      const results = document.querySelector("h1").innerText.match(/\d+/g)[0];

      presenceData.details = new URLSearchParams(window.location.search).get("q");
      presenceData.state = `${results} results`;

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).search;
      break;
    case "genre": //Genre
    case "topic": //Topic
    case "country": //Country
    case "city": //City
    case "local-stations": //Local Stations
    case "top-stations": //Top 100 Stations
      browsingStamp = 0;

      presenceData.details = document.querySelector("h1").innerText;

      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = (await strings).browsing;
      break;
    case "profile": //My Profile
    case "recents": //Recently Played
    case "favorites": //My Favorites
    case "terms-and-conditions": //Terms and Conditions
    case "privacy-policy": //Privacy Policy
    case "imprint": //Imprint
    case "contact": //Contact
      browsingStamp = 0;

      presenceData.details = document.title;
      break;
    case "iphone": //iPhone App
    case "ipad": //iPad App
    case "android": //Android App
    case "windowsphone": //Windows App
    case "blackberry": //Blackberry App
      browsingStamp = 0;

      presenceData.details = document.title;
      break;
    default: //Unknown
      presence.setTrayTitle();
      presence.setActivity();
      return;
  }

  presence.setActivity(presenceData);
});
