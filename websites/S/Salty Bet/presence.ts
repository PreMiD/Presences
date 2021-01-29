const presence = new Presence({ clientId: "802246778010730548" }),
  SelectorMap: { [index: string]: string } = {
    Red: 'div#sbettors1 > span.redtext > strong',
    Blue: 'div#sbettors2 > span.bluetext > strong',
    estatus: 'div#status > span#betstatus',
    tmode: 'span#tournament-note',
    emode: 'div#footer-alert',
    betRed: 'span#lastbet.dynamic-view > span.redtext',
    betBlue: 'span#lastbet.dynamic-view > span.bluetext',
    prize: 'span#lastbet.dynamic-view > span.greentext',
    oddsRed: 'span#lastbet.dynamic-view > span.redtext:nth-last-child(2)',
    oddsBlue: 'span#lastbet.dynamic-view > span.bluetext:nth-last-child(1)',
    betsView: 'span#lastbet.dynamic-view'
  };

let browsingStamp = Math.floor(Date.now() / 1000);

function getText(selector: string) {
  if (document.querySelector(selector) !== null && document.querySelector(selector) !== undefined)
    return document.querySelector(selector).textContent;
  else
    return null;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "salty"
  };

  if (document.location.pathname == "/" || document.location.pathname ==  "/index") {
    if (getText(SelectorMap['tmode']) !== null || getText(SelectorMap['emode']).includes("bracket!") || getText(SelectorMap['emode']).includes("FINAL")) {
      presenceData.smallImageKey = "trofeo";
      presenceData.smallImageText = "Tournament Mode";
    } else if (getText(SelectorMap['emode']).includes("exhibition") || getText(SelectorMap['emode']).includes("Exhibition")) {
      presenceData.smallImageKey = "saltgirl";
      presenceData.smallImageText = "Exhibition Mode";
    } else {
      presenceData.smallImageKey = "salero";
      presenceData.smallImageText = "Matchmaking Mode";
    }

    if(getText(SelectorMap['Red']) !== null && getText(SelectorMap['Blue']) !== null)
      presenceData.details = getText(SelectorMap['Red']) + " VS " + getText(SelectorMap['Blue']);
    else
      presenceData.details = "Loading Fighters...";

    if (!getText(SelectorMap['estatus']).includes("OPEN!")) {
      browsingStamp = Math.floor(Date.now() / 1000);
      if (!getText(SelectorMap['estatus']).includes("Payouts")) {
        if ((getText(SelectorMap['betsView'])).includes("|")) {
          presenceData.startTimestamp = browsingStamp;
          if (getText(SelectorMap['betRed']).includes('$'))
            presenceData.state = getText(SelectorMap['betRed']) + "(Red) → " + getText(SelectorMap['prize']) + " | " + getText(SelectorMap['oddsRed']) + ":" + getText(SelectorMap['oddsBlue']);
          else
            presenceData.state = getText(SelectorMap['betBlue']) + "(Blue) → " + getText(SelectorMap['prize']) + " | " + getText(SelectorMap['oddsRed']) + ":" + getText(SelectorMap['oddsBlue']);
        } else {
          presenceData.startTimestamp = browsingStamp;
          if(getText(SelectorMap['oddsRed']) !== null && getText(SelectorMap['oddsBlue']) !== null)
            presenceData.state = "Odds: " + getText(SelectorMap['oddsRed']) + ":" + getText(SelectorMap['oddsBlue']);
          else
            presenceData.state = "Loading...";
        }
      } else
        presenceData.state = getText(SelectorMap['estatus']);
    } else
      presenceData.state = getText(SelectorMap['estatus']);
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