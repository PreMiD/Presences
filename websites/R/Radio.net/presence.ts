const presence = new Presence({
    clientId: "634124614544392193"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching",
    browsing: "presence.activity.browsing"
  });

let lastPath = "", //Last played radio station or podcast
  browsingTimestamp = 0; //Timestamp when started listening to a radio station

presence.on("UpdateData", async () => {
  //Current path
  const path = window.location.pathname.split("/").slice(1),
    //Presence data
    presenceData: PresenceData = {
      details: "Radio.net",
      largeImageKey: "logo_big"
    },
    //Document title
    { title } = document,
    //Document header
    header = document.querySelector("h1") as HTMLElement;

  switch (path[0]) {
    //Radio
    //Podcast
    case "s":
    case "p": {
      if (path[1] !== lastPath || browsingTimestamp === 0) {
        browsingTimestamp = Math.round(Date.now() / 1000);
        [, lastPath] = path;
      }

      const status = document.querySelector(
        ".player__info-wrap"
      ) as HTMLElement;

      if (
        (document.querySelector(".player__animate-icon") as HTMLElement).style
          .display !== "none"
      ) {
        //Playing
        presenceData.details = header.textContent;
        presenceData.state = (
          document.querySelector("div.player__song") as HTMLElement
        ).textContent;

        presenceData.smallImageText = (await strings).play;
        presenceData.smallImageKey = "play";

        presenceData.startTimestamp = browsingTimestamp;

        //Get the podcast play position
        if (path[0] === "p") {
          presenceData.endTimestamp = browsingTimestamp;

          //Get the start / current position
          const [start, end] = (
            document.querySelector(".player__timing-wrap") as HTMLElement
          ).textContent
            .split("|")
            .map((e) => e.split(":").reverse());

          //Add the amount of time the podcast has been playing
          if (start.length > 0)
            presenceData.startTimestamp += parseInt(start[0]);

          if (start.length > 1)
            presenceData.startTimestamp += parseInt(start[1]) * 60;

          if (start.length > 2)
            presenceData.startTimestamp += parseInt(start[2]) * 60 * 24;

          //Add the length of the podcast
          if (end.length > 0) presenceData.endTimestamp += parseInt(end[0]);

          if (end.length > 1)
            presenceData.endTimestamp += parseInt(end[1]) * 60;

          if (end.length > 2)
            presenceData.endTimestamp += parseInt(end[2]) * 60 * 24;
        }
      } else {
        //Paused
        browsingTimestamp = 0;

        presenceData.details = header.textContent;

        presenceData.smallImageText = (await strings).pause;
        presenceData.smallImageKey = "pause";

        if (status.style.display !== "none") {
          //Player status is being displayed (example: BUFFERING)
          const adlength = status.textContent.match(/\d+/g)
            ? parseInt(status.textContent.match(/\d+/g)[0])
            : 0;

          if (adlength > 0) {
            presenceData.state = "Currently watching an ad";

            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            presenceData.endTimestamp = presenceData.startTimestamp + adlength;
          } else presenceData.state = status.textContent;
        } else {
          //Player is inactive (no status is being displayed)
          presenceData.state = (
            document.querySelector(".z7kxsz-11") as HTMLElement
          ).textContent;
        }
      }
      break;
    }
    //Search
    case "search": {
      browsingTimestamp = 0;
      const [results] = header.textContent.match(/\d+/g);

      presenceData.details = new URLSearchParams(window.location.search).get(
        "q"
      );
      presenceData.state = `${results} results`;

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).search;
      break;
    }
    //Genre
    //Topic
    //Country
    //City
    //Local Stations
    //Top 100 Stations
    case "genre":
    case "topic":
    case "country":
    case "city":
    case "local-stations":
    case "top-stations": {
      browsingTimestamp = 0;

      presenceData.details = header.textContent;

      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = (await strings).browsing;
      break;
    }
    //My Profile
    //Recently Played
    //My Favorites
    //Terms and Conditions
    //Privacy Policy
    //Imprint
    //Contact
    case "profile":
    case "recents":
    case "favorites":
    case "terms-and-conditions":
    case "privacy-policy":
    case "imprint":
    case "contact": {
      browsingTimestamp = 0;

      presenceData.details = title;
      break;
    }
    //iPhone App
    //iPad App
    //Android App
    //Windows App
    //Blackberry App
    case "iphone":
    case "ipad":
    case "android":
    case "windowsphone":
    case "blackberry": {
      browsingTimestamp = 0;

      presenceData.details = title;
      break;
    }
    //Unknown
    default: {
      presence.setActivity();
      return;
    }
  }

  presence.setActivity(presenceData);
});
