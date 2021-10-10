const presence = new Presence({
    clientId: "895742751944089600"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let gameName: HTMLElement,
  storeName: HTMLElement,
  gamePrice: HTMLElement,
  userName: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/home") {
    presenceData.details = "Viewing Stadia Home";
    userName = document.querySelector("span.VY8blf.fSorq");
    presenceData.smallImageText = userName.innerText;
  } else if (document.location.pathname.includes("/player")) {
    gameName = document.querySelector("div.HDKZKb.LiQ6Hb");
    presenceData.details = gameName.innerText;
  } else if (document.location.pathname.includes("/store/details")) {
    storeName = document.querySelector("div.UG7HXc");
    gamePrice = document.querySelector("span.rdAlw");
    presenceData.details = `Viewing ${storeName.innerText}`;
    presenceData.state = `${gamePrice.innerText} on the Stadia Store`;
  } else if (document.location.pathname.includes("/store"))
    presenceData.details = "Viewing Stadia Store";
  else if (document.location.pathname.includes("/pro"))
    presenceData.details = "Viewing Stadia Pro";
  else presenceData.details = "Can't read page";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
