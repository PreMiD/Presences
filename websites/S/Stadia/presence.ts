const presence = new Presence({
  clientId: "713114770584109150"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let gameName: HTMLElement;
let storeName: HTMLElement;
let gamePrice: HTMLElement;
let userName: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "small"
  };

  if (document.location.pathname == "/home") {
    presenceData.details = "Viewing Stadia Home";
    userName = document.querySelector("span.VY8blf.fSorq");
    presenceData.smallImageText = userName.innerText;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/player")) {
    gameName = document.querySelector("div.HDKZKb.LiQ6Hb");
    presenceData.details = gameName.innerText;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/store/details")) {
    storeName = document.querySelector("div.UG7HXc");
    gamePrice = document.querySelector("span.rdAlw");
    presenceData.details = "Viewing " + storeName.innerText;
    presenceData.state = gamePrice.innerText + " on the Stadia Store";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/store")) {
    presenceData.details = "Viewing Stadia Store";
    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
