const presence = new Presence({ clientId: "802246778010730548" }),
  SelectorMap: { [index: string]: string } = {
    Red: "div#sbettors1 > span.redtext > strong",
    Blue: "div#sbettors2 > span.bluetext > strong",
    estatus: "div#status > span#betstatus",
    tmode: "span#tournament-note",
    emode: "div#footer-alert",
    betRed: "span#lastbet.dynamic-view > span.redtext",
    betBlue: "span#lastbet.dynamic-view > span.bluetext",
    prize: "span#lastbet.dynamic-view > span.greentext",
    oddsRed: "span#lastbet.dynamic-view > span.redtext:nth-last-child(2)",
    oddsBlue: "span#lastbet.dynamic-view > span.bluetext:nth-last-child(1)",
    betsView: "span#lastbet.dynamic-view"
  };

let fightersCheck: string,
  browsingStamp = Math.floor(Date.now() / 1000);

function getText(selector: string) {
  if (
    document.querySelector(selector) !== null &&
    document.querySelector(selector) !== undefined
  )
    return document.querySelector(selector).textContent;
  else return null;
}

function getModeImageKey(): string[] {
  if (
    getText(SelectorMap["tmode"]) !== null ||
    getText(SelectorMap["emode"]).includes("bracket!") ||
    getText(SelectorMap["emode"]).includes("FINAL")
  ) {
    return ["trofeo", "Tournament Mode"];
  } else if (
    getText(SelectorMap["emode"]).includes("exhibition") ||
    getText(SelectorMap["emode"]).includes("Exhibition")
  ) {
    return ["saltgirl", "Exhibition Mode"];
  } else {
    return ["salero", "Matchmaking Mode"];
  }
}

function getFighters(): string {
  if (
    getText(SelectorMap["Red"]) !== null &&
    getText(SelectorMap["Blue"]) !== null
  )
    return getText(SelectorMap["Red"]) + " VS " + getText(SelectorMap["Blue"]);
  else return "Loading Fighters...";
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "salty"
  };
  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/index"
  ) {
    const mode = getModeImageKey();
    presenceData.smallImageKey = mode[0];
    presenceData.smallImageText = mode[1];

    if (fightersCheck !== getFighters()) {
      presenceData.details = getFighters();
      fightersCheck = getFighters();
    } else {
      presenceData.details = getFighters() + "‎";
      fightersCheck = getFighters() + "‎";
    }

    if (!getText(SelectorMap["estatus"]).includes("OPEN!")) {
      if (!getText(SelectorMap["estatus"]).includes("Payouts")) {
        if (getText(SelectorMap["betsView"]).includes("|")) {
          presenceData.startTimestamp = browsingStamp;
          if (getText(SelectorMap["betRed"]).includes("$"))
            presenceData.state =
              getText(SelectorMap["betRed"]) +
              "(Red) → " +
              getText(SelectorMap["prize"]) +
              " | " +
              getText(SelectorMap["oddsRed"]) +
              ":" +
              getText(SelectorMap["oddsBlue"]);
          else
            presenceData.state =
              getText(SelectorMap["betBlue"]) +
              "(Blue) → " +
              getText(SelectorMap["prize"]) +
              " | " +
              getText(SelectorMap["oddsRed"]) +
              ":" +
              getText(SelectorMap["oddsBlue"]);
        } else {
          presenceData.startTimestamp = browsingStamp;
          if (
            getText(SelectorMap["oddsRed"]) !== null &&
            getText(SelectorMap["oddsBlue"]) !== null
          )
            presenceData.state =
              "Odds: " +
              getText(SelectorMap["oddsRed"]) +
              ":" +
              getText(SelectorMap["oddsBlue"]);
          else presenceData.state = "Loading...";
        }
      } else presenceData.state = getText(SelectorMap["estatus"]);
    } else {
      presenceData.state = getText(SelectorMap["estatus"]);
      browsingStamp = Math.floor(Date.now() / 1000);
    }
  } else if (document.location.pathname == "/authenticate") {
    presenceData.details = "Signing in...";
    delete presenceData.startTimestamp;
  } else if (document.location.pathname == "/bank") {
    presenceData.details = "Checking Bank";
    delete presenceData.startTimestamp;
  } else {
    presenceData.details = null;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
