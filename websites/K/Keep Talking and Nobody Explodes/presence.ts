const presence = new Presence({
    clientId: "681116862930747520"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
  });

let browsingStamp = 0; //Last started activity

presence.on("UpdateData", async () => {
  const host = window.location.hostname.replace("www.", ""),
    path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {
      details: "Keep Talking and Nobody Explodes",
      largeImageKey: "logo_big"
    };

  switch (host) {
    //Keep Talking Game
    case "keeptalkinggame.com":
      switch (path[0]) {
        //Frequently Asked Questions
        case "faq":
          browsingStamp = 0;

          presenceData.details = "Frequently Asked Questions";
          break;
        //Commercial Licensing
        case "commercial-license":
          browsingStamp = 0;

          presenceData.details = "Commercial Licensing";
          break;
        //Non-Commercial Use
        case "non-commercial-use":
          browsingStamp = 0;

          presenceData.details = "Non-Commercial Use";
          break;
        //Community
        case "community":
          browsingStamp = 0;

          presenceData.details = "Community";
          break;
        //Press Kit
        case "presskit":
          browsingStamp = 0;

          presenceData.details = "Press Kit";
          break;
        //Contact Us
        case "contact-us":
          browsingStamp = 0;

          presenceData.details = "Contact Us";
          break;
        //Privacy Policy
        case "privacy-policy":
          browsingStamp = 0;

          presenceData.details = "Privacy Policy";
          break;
        //Unknown
        default:
          presence.setTrayTitle();
          presence.setActivity();
          return;
      }
      break;

    //Bombmanual
    case "bombmanual.com":
      switch (path[0]) {
        //Bomb Defusal Manual
        case "print": //Currently not working for the pdf version
        case "web":
          browsingStamp ??= Math.floor(Date.now() / 1000);
          presenceData.startTimestamp = browsingStamp;

          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).reading;

          presenceData.details = "Bomb Defusal Manual";
          break;
        //How to Play
        case "how-to-play-pc.html":
        case "how-to-play-mobile.html":
        case "how-to-play-switch.html":
        case "how-to-play-xbox.html":
        case "how-to-play-playstation.html":
        case "how-to-play-vr.html":
        case "how-to-play-psvr.html":
        case "how-to-play-gear-vr.html":
        case "how-to-play-oculus-go.html":
        case "how-to-play-oculus-quest.html":
        case "how-to-play-daydream.html": {
          browsingStamp = 0;
          let platform: string;

          presenceData.details = "How to Play";
          switch (path[0].replace("how-to-play-", "").replace(".html", "")) {
            case "pc":
              platform = "PC/Mac/Linux";
              break;
            case "mobile":
              platform = "iOS/Android";
              break;
            case "switch":
              platform = "Nintendo Switch™";
              break;
            case "xbox":
              platform = "Xbox One";
              break;
            case "playstation":
              platform = "PlayStation®4";
              break;
            case "vr":
              platform = "Oculus Rift/HTC Vive";
              break;
            case "psvr":
              platform = "PlayStation®VR";
              break;
            case "gear-vr":
              platform = "Samsung Gear VR";
              break;
            case "oculus-go":
              platform = "Oculus Go";
              break;
            case "oculus-quest":
              platform = "Oculus Quest";
              break;
            case "daydream":
              platform = "Daydream";
              break;
            default:
              break;
          }
          if (platform) presenceData.state = `on ${platform}`;
          break;
        }
        //Other Languages
        case "other-languages.html":
          browsingStamp = 0;

          presenceData.details = "Other Languages";
          break;
        //Unknown
        case "index.html":
          presence.setTrayTitle();
          presence.setActivity();
          return;
        default:
          presence.setTrayTitle();
          presence.setActivity();
          return;
      }
      break;
  }

  presence.setActivity(presenceData);
});
