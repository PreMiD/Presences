const presence = new Presence({
    clientId: "802246778010730548" //The client ID of the Application created at https://discordapp.com/developers/applications
  });

const browsingStamp = Math.floor(Date.now() / 1000);

var estatus: any;
var red: any;
var blue: any;
var bet: any;

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
  bet = document.querySelector(
    "span#lastbet.dynamic-view"
  );

  presenceData.details = red.innerText + " vs " + blue.innerText;

  if(estatus.innerText.includes('locked'))
    presenceData.state = bet.innerText;
  else
    presenceData.state = estatus.innerText;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});