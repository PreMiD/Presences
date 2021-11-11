const presence = new Presence({
    clientId: "660519861742731264"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  });

let { language } = navigator, //Browser language
  lastRadio = "",
  browsingTimestamp = 0; //Timestamp when started listening to a radio station

switch (language) {
  //German
  case "de":
  case "de-CH":
  case "de-AT":
  case "de-LU":
  case "de-LI":
    language = "de";
    break;
  //French
  case "fr":
  case "fr-BE":
  case "fr-CA":
  case "fr-CH":
  case "fr-LU":
    language = "fr";
    break;
  //English / Unknown
  case "en":
  case "en-US":
  case "en-EG":
  case "en-AU":
  case "en-GB":
  case "en-CA":
  case "en-NZ":
  case "en-IE":
  case "en-ZA":
  case "en-JM":
  case "en-BZ":
  case "en-TT":
  default:
    language = "en";
    break;
}

presence.on("UpdateData", async () => {
  const host = window.location.hostname.replace("www.", ""),
    path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {
      details: "RadioMe",
      largeImageKey: "logo_big"
    };

  switch (path[0]) {
    //Search
    case "search":
      browsingTimestamp = 0;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).search;
      switch (language) {
        case "de":
          presenceData.details = `Sucht nach "${new URLSearchParams(
            window.location.search
          ).get("term")}"`;
          presenceData.state = `auf ${host}`;
          break;
        case "fr":
          presenceData.details = `Recherche "${new URLSearchParams(
            window.location.search
          ).get("term")}"`;
          presenceData.state = `sur ${host}`;
          break;
        case "en":
          presenceData.details = `Searching for "${new URLSearchParams(
            window.location.search
          ).get("term")}"`;
          presenceData.state = `on ${host}`;
          break;
      }
      break;

    //Radio / Region
    default:
      if (path[0]) {
        if (document.getElementById("station-website")) {
          //Radio
          if (
            document.getElementsByClassName("song-name")[0].textContent.length >
            0
          ) {
            //Player active
            if (
              document.getElementsByClassName(
                "playbutton-global playbutton-global-playing"
              ).length > 0
            ) {
              //Radio is playing
              if (
                !browsingTimestamp ||
                lastRadio !==
                  document.getElementsByClassName("song-name")[0].textContent
              )
                browsingTimestamp = Math.floor(Date.now() / 1000);
              presenceData.startTimestamp = browsingTimestamp;
              lastRadio =
                document.getElementsByClassName("song-name")[0].textContent;

              presenceData.smallImageKey = "play";
              presenceData.smallImageText = (await strings).play;

              presenceData.details =
                document.getElementsByClassName("song-name")[0].textContent;
            } else {
              //Radio is stopped
              browsingTimestamp = 0;

              presenceData.smallImageKey = "pause";
              presenceData.smallImageText = (await strings).pause;

              presenceData.details =
                document.getElementsByClassName("song-name")[0].textContent;
            }
          } else {
            //Player inactive
            browsingTimestamp = 0;

            presenceData.details = document.querySelector("h1").textContent;
            switch (language) {
              case "de":
                presenceData.state = `${
                  document.getElementById("bar-ratingValue").textContent
                } von 5 Sternen (${
                  document.getElementById("bar-ratingCount").textContent
                } Bewertungen)`;
                break;
              case "fr":
                presenceData.state = `${
                  document.getElementById("bar-ratingValue").textContent
                } sur 5 étoiles (${
                  document.getElementById("bar-ratingCount").textContent
                } notes)`;
                break;
              case "en":
                presenceData.state = `${
                  document.getElementById("bar-ratingValue").textContent
                } of 5 stars (${
                  document.getElementById("bar-ratingCount").textContent
                } Ratings)`;
                break;
            }
          }
        } else {
          //Region
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          switch (language) {
            case "de":
              presenceData.details = document.querySelector("h1").textContent;
              presenceData.state = `auf ${host}`;
              break;
            case "fr":
              presenceData.details = document.querySelector("h1").textContent;
              presenceData.state = `sur ${host}`;
              break;
            case "en":
              presenceData.details = document.querySelector("h1").textContent;
              presenceData.state = `on ${host}`;
              break;
          }
        }
      } else if (
        document.getElementsByClassName("song-name")[0].textContent.length > 0
      ) {
        //Player is active
        if (
          document.getElementsByClassName(
            "playbutton-global playbutton-global-playing"
          ).length > 0
        ) {
          //Radio is playing
          if (
            !browsingTimestamp ||
            lastRadio !==
              document.getElementsByClassName("song-name")[0].textContent
          )
            browsingTimestamp = Math.floor(Date.now() / 1000);
          presenceData.startTimestamp = browsingTimestamp;
          lastRadio =
            document.getElementsByClassName("song-name")[0].textContent;

          presenceData.smallImageKey = "play";
          presenceData.smallImageText = (await strings).play;

          presenceData.details =
            document.getElementsByClassName("song-name")[0].textContent;
        } else {
          //Radio is stopped
          browsingTimestamp = 0;

          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = (await strings).pause;

          presenceData.details =
            document.getElementsByClassName("song-name")[0].textContent;
        }
      }
      break;
  }

  presence.setActivity(presenceData);
});
