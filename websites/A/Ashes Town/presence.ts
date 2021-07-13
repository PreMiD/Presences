const presence = new Presence({
    clientId: "863691882289692683"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "large_image",
    startTimestamp: browsingStamp
  },
    appGame = document.getElementsByClassName("app-game")["app-game"].hidden;

  if (document.location.pathname === "/" && appGame === true) {
    // Ashes Town Homepage
    presenceData.details = "Viewing At Home Page";
    presenceData.smallImageKey = "home-solid_green";
  } else if (document.location.pathname === "/help") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Help";
    presenceData.smallImageKey = "question-circle-solid_green";
  } else if (document.location.pathname === "/about") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "About";
    presenceData.smallImageKey = "info-circle-solid_green";
  } else if (document.location.pathname === "/contributors") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Contributors";
    presenceData.smallImageKey = "info-circle-solid_green";
  } else if (document.location.pathname === "/character") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Characters";
    presenceData.smallImageKey = "horse-head-solid_green";
  } else if (document.location.pathname === "/account") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Account";
    presenceData.smallImageKey = "user-solid_green";
  }

  if (document.location.pathname === "/" && appGame === false) {
    // Ashes Town in Game
    presenceData.details = "Plays on the server";
    presenceData.smallImageKey = "play-circle-solid_green";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
