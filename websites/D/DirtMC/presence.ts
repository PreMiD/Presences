const presence = new Presence({
    clientId: "631995227132919819" // CLIENT ID FOR YOUR PRESENCE
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "dirtmc"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname === "dirtmc.net") {
    if (document.location.pathname === "/") {
      presenceData.details = "Viewing home page";

      presence.setActivity(presenceData);
    } else if (document.location.pathname === "/rules/") {
      presenceData.details = "Reading the rules";

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.location.pathname === "/how-to-play/") {
      presenceData.details = "Viewing how to play";

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (
      document.querySelector("#site-main > article > header > h1") !== null
    ) {
      title = document.querySelector("#site-main > article > header > h1");
      presenceData.details = "Reading thread:";
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;

      presenceData.smallImageKey = "reading";
      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "buy.dirtmc.net") {
    title = document.querySelector("head > title");
    presenceData.details = "Store, viewing:";
    presenceData.state = title.innerText.replace("DirtMC | ", "");

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
