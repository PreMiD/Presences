const presence = new Presence({
  clientId: "802246778010730548" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
  URLMap: { [index: string]: string } = {
    Red: 'div#sbettors1 > span.redtext > strong',
    Blue: 'div#sbettors2 > span.bluetext > strong',
    estatus: '#betstatus',
    betview: 'span#lastbet.dynamic-view',
    betRed: 'span#lastbet.dynamic-view > span.redtext',
    betBlue: 'span#lastbet.dynamic-view > span.bluetext',
    prize: 'span#lastbet.dynamic-view > span.greentext',
    oddsRed: 'span#lastbet.dynamic-view > span.redtext:nth-last-child(2)',
    oddsBlue: 'span#lastbet.dynamic-view > span.bluetext:nth-last-child(1)'

  }, browsingStamp = Math.floor(Date.now() / 1000);

function getText(selector: string) {
  return document.querySelector(selector).textContent;
}

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "salty",
    smallImageKey: "salero"
  };

  presenceData.startTimestamp = browsingStamp;

  presenceData.details = getText(URLMap['Red']) + " vs " + getText(URLMap['Blue']);

  if (!getText(URLMap['estatus']).includes("OPEN!")) {
    if(!getText(URLMap['estatus']).includes("Payouts")) {
      if ((getText(URLMap['betRed']) + getText(URLMap['betBlue'])).includes("$")) {
        if (getText(URLMap['betRed']).includes('$'))
          presenceData.state = getText(URLMap['betRed']) + "(Red) → " + getText(URLMap['prize']) + " | " + getText(URLMap['oddsRed']) + ":" + getText(URLMap['oddsBlue']);
        else
          presenceData.state = getText(URLMap['betBlue']) + "(Blue) → " + getText(URLMap['prize']) + " | " + getText(URLMap['oddsRed']) + ":" + getText(URLMap['oddsBlue']);
      } else
        presenceData.state = "Odds: " + getText(URLMap['oddsRed']) + ":" + getText(URLMap['oddsBlue']);
    } else
      presenceData.state = getText(URLMap['estatus']);
  } else
    presenceData.state = getText(URLMap['estatus']);

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});