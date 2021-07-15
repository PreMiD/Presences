//______________________________________________________________________________________
const presence = new Presence({
  clientId: "477919120789078026"
});
let language = navigator.language;

switch (language) {
  // By ACertainCoder#9011
  //German
  //---------------------------------------
  case "de":
  case "de-CH":
  case "de-AT":
  case "de-LU":
  case "de-LI":
    language = "de";
    break;

  //English / Unknown
  //---------------------------------------
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
//__________________________________________________________________________________________

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const playing = parseInt(document.querySelector("#playstop").textContent);
  if (playing > 0) {
    const station =
      document.getElementsByClassName("channelname")[0].textContent;
    switch (language) {
      case "de":
        presenceData.details = "Spielt gerade";
        break;
      case "en":
        presenceData.details = "Listening to";
        break;
    }
    presenceData.state = station;
    presenceData.smallImageKey = "live";
    presence.setActivity(presenceData);
  } else {
    try {
      const channelstation =
        document.querySelector("#content > h1").textContent;
      switch (language) {
        case "de":
          presenceData.details = "Stöbert durch";
          break;
        case "en":
          presenceData.details = "Browsing through";
          break;
      }
      presenceData.state = channelstation;
      presence.setActivity(presenceData);
    } catch (e) {
      //nothing
    }
    // __________________________________________________________________ Path's
    if (document.location.pathname == "/") {
      // --------------------- Home
      switch (language) {
        case "de":
          presenceData.details = "Stöbert durch";
          presenceData.state = "die Startseite";
          break;
        case "en":
          presenceData.details = "Browsing through";
          presenceData.state = "mainpage";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/voting/") {
      //--------- Voting for Songs
      switch (language) {
        case "de":
          presenceData.details = "Votet für";
          presenceData.state = "neue Lieder";
          break;
        case "en":
          presenceData.details = "Voting for";
          presenceData.state = "new songs";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/the-battle/") {
      //------- Voting for The Battle
      switch (language) {
        case "de":
          presenceData.details = "Votet für";
          presenceData.state = "The Battle";
          break;
        case "en":
          presenceData.details = "Voting for";
          presenceData.state = "the battlee";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/charts/") {
      // ----------- Charts
      switch (language) {
        case "de":
          presenceData.details = "Sucht in Charts...";
          break;
        case "en":
          presenceData.details = "Looking for charts...";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/dance/") {
      // ------------- Dance & DJ's
      switch (language) {
        case "de":
          presenceData.details = "Sucht in Dance & DJ's...";
          break;
        case "en":
          presenceData.details = "Looking for";
          presenceData.state = "Dance & DJ's...";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/hiphop/") {
      // ------------- Hip Hop
      switch (language) {
        case "de":
          presenceData.details = "Sucht in Hip Hop...";
          break;
        case "en":
          presenceData.details = "Looking for Hip Hop...";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/channels/") {
      // ------------- Channellist
      switch (language) {
        case "de":
          presenceData.details = "Durchsucht die";
          presenceData.state = "Channelliste";
          break;
        case "en":
          presenceData.details = "Search in";
          presenceData.state = "Channel list";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/streams/") {
      // --------------- Streams
      switch (language) {
        case "de":
          presenceData.details = "Sucht nach";
          presenceData.state = "Streamlinks";
          break;
        case "en":
          presenceData.details = "Looking for";
          presenceData.state = "stream links";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/datenschutz/") {
      // ------------- Privacy policy
      switch (language) {
        case "de":
          presenceData.details = "Liest den Datenschutz...";
          break;
        case "en":
          presenceData.details = "Reading privacy policy";
          break;
      }
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/impressum/") {
      // ---------------- Imprint
      switch (language) {
        case "de":
          presenceData.details = "Liest das Impressum...";
          break;
        case "en":
          presenceData.details = "Reading imprint...";
          break;
      }
      presence.setActivity(presenceData);
    }
    presence.setActivity(presenceData);
  }
});
