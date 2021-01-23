const presence = new Presence({
  clientId: "802246778010730548" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
  URLMap: { [index: string]: string } = {
    Red: 'getText("div#sbettors1 > span.redtext > strong")',
    Blue: 'getText("div#sbettors2 > span.bluetext > strong")',
    estatus: 'getText("#betstatus")',
    betview: 'getText("span#lastbet.dynamic-view")',
    betRed: 'getText("span#lastbet.dynamic-view > span.redtext")',
    betBlue: 'getText("span#lastbet.dynamic-view > span.bluetext")',
    prize: 'getText("span#lastbet.dynamic-view > span.greentext")',
    oddsRed: 'getText("span#lastbet.dynamic-view > span.redtext:nth-last-child(2)")',
    oddsBlue: 'getText("span#lastbet.dynamic-view > span.bluetext:nth-last-child(1)")'

  }, browsingStamp = Math.floor(Date.now() / 1000);

function getText(selector: string) {
  return document.querySelector(selector).textContent;
}

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "salty",
    smallImageKey: "salero"
  },
    red = eval(URLMap['Red']),
    blue = eval(URLMap['Blue']),
    estatus = eval(URLMap['estatus']),
    betView = eval(URLMap['betview']),
    betRed = eval(URLMap['betRed']),
    betBlue = eval(URLMap['betBlue']),
    prize = eval(URLMap['prize']),
    oddsBlue = eval(URLMap['oddsBlue']),
    oddsRed = eval(URLMap['oddsRed']);

  presenceData.startTimestamp = browsingStamp;

  presenceData.details = red + " vs " + blue;

  if (betView.length > 1) {
    if(!estatus.includes("Payouts")) {
      if ((betRed + betBlue).includes("$")) {
        if (betRed.includes('$'))
          presenceData.state = betRed + "(Red) → " + prize + " | " + oddsRed + ":" + oddsBlue;
        else
          presenceData.state = betBlue + "(Blue) → " + prize + " | " + oddsRed + ":" + oddsBlue;
      } else
        presenceData.state = "Odds: " + oddsRed + ":" + oddsBlue;
    } else
      presenceData.state = estatus;
  } else
    presenceData.state = estatus;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});