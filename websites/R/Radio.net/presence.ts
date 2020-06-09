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
    case "p": {
      //Podcast
      if (path[1] != lastPath || browsingStamp == 0)
        browsingStamp = Math.round(Date.now() / 1000);
      const playerIcon = document.querySelector(
        ".player__animate-icon"
      ) as HTMLElement;
      const name = document.querySelector("h1") as HTMLElement; //Current Radio / Podcast
      const info = document.querySelector("div.player__song") as HTMLElement; //Current Song / Episode
      const status = document.querySelector(
        ".player__info-wrap"
      ) as HTMLElement; //Player Status

      if (playerIcon.style.display != "none") {
        //Playing
        presenceData.details = name.innerText;
        presenceData.state = info.innerText;

        presenceData.smallImageText = (await strings).play;
        presenceData.smallImageKey = "play";

        presenceData.startTimestamp = browsingStamp;
        if (path[0] == "p") {
          const start = (document.querySelector(
            ".player__timing-wrap > span:nth-child(1)"
          ) as HTMLElement).innerText
            .split(":")
            .reverse();
          const end = (document.querySelector(
            ".player__timing-wrap > span:nth-child(3)"
          ) as HTMLElement).innerText
            .split(":")
            .reverse();

          //Create a timestamp when the podcast started playing
          if (start.length > 0) {
            presenceData.startTimestamp -= parseInt(start[0]) * 60;
          }
          if (start.length > 1) {
            presenceData.startTimestamp -= parseInt(start[0]) * 60 * 60;
          }
          if (start.length > 2) {
            presenceData.startTimestamp -= parseInt(start[0]) * 60 * 60 * 24;
          }

          //Add the length of the podcast in seconds to the timestamp
          presenceData.endTimestamp = presenceData.startTimestamp;
          if (end.length > 0) {
            presenceData.endTimestamp += parseInt(start[0]) * 60;
          }
          if (end.length > 1) {
            presenceData.endTimestamp += parseInt(start[0]) * 60 * 60;
          }
          if (end.length > 2) {
            presenceData.endTimestamp += parseInt(start[0]) * 60 * 60 * 24;
          }
        }
      } else {
        //Paused
        browsingStamp = 0;

        presenceData.details = name.innerText;

        presenceData.smallImageText = (await strings).pause;
        presenceData.smallImageKey = "pause";

        if (status.style.display != "none") {
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
        }
      }
      break;
      //Search
    }
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
      //Genre / Topic
    }
    case "genre":
    case "topic": //Country / City
    case "country":
    case "city": //Local Stations / Top 100 Stations
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
