const presence = new Presence({
  clientId: "802246778010730548" //The client ID of the Application created at https://discordapp.com/developers/applications
});

const browsingStamp = Math.floor(Date.now() / 1000);

var estatus: any;
var red: any;
var blue: any;
var betBlue: any;
var betRed: any;
var betView: any;
var oddsBlue: any;
var oddsRed: any;
var prize: any;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "salty",
    smallImageKey: "salero"
  };

  presenceData.startTimestamp = browsingStamp;

  red = document.querySelector(
    "div#sbettors1 > span.redtext > strong"
  );
  blue = document.querySelector(
    "div#sbettors2 > span.bluetext > strong"
  );
  estatus = document.querySelector(
    "#betstatus"
  );
  betView = document.querySelector(
    "span#lastbet.dynamic-view"
  );
  betRed = document.querySelector(
    "span#lastbet.dynamic-view > span.redtext"
  );
  betBlue = document.querySelector(
    "span#lastbet.dynamic-view > span.bluetext"
  );
  prize = document.querySelector(
    "span#lastbet.dynamic-view > span.greentext"
  );
  oddsRed = document.querySelector(
    "span#lastbet.dynamic-view > span.redtext:nth-last-child(2)"
  );
  oddsBlue = document.querySelector(
    "span#lastbet.dynamic-view > span.bluetext:nth-last-child(1)"
  );

  presenceData.details = red.innerText + " vs " + blue.innerText;

  if(betView.innerText.length > 1) {
    if((betRed.innerText+betBlue.innerText).includes("$")) {
      if (betRed.innerText.includes('$'))
        presenceData.state = betRed.innerText + "(Red) → " + prize.innerText + " | " + oddsRed.innerText + ":" + oddsBlue.innerText;
      else
        presenceData.state = betBlue.innerText + "(Blue) → " + prize.innerText + " | " + oddsRed.innerText + ":" + oddsBlue.innerText;
    }
    else
      presenceData.state = "O: " + oddsRed.innerText + ":" + oddsBlue.innerText;
  }
  else
    presenceData.state = estatus.innerText;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});