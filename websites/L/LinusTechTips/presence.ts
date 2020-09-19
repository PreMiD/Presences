const presence = new Presence({
    clientId: "754742129221173278"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let item;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "linustechtips"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname == "linustechtips.com") {
    if (document.location.pathname == "/main/") {
      presenceData.details = "Browsing";
      presenceData.state = "Categories";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/main/forum/")) {
      item = document.querySelector(
        "body > main > div > div > div > div > header > h1"
      ) as HTMLElement;

      presenceData.details = "Browsing Category";
      presenceData.state = item.innerText;

      presenceData.smallImageKey = "search";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/main/topic/")) {
      item = document.querySelector(
        "body > main > div > div > div > div > div.ipsPhotoPanel > div > h1"
      ) as HTMLElement;

      presenceData.details = "Viewing Thread";
      presenceData.state = item.innerText;

      presenceData.smallImageKey = "reading";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/main/profile/")) {
      item = document.querySelector(
        "body > main > div > div > div > div > header > div > div.ipsColumns > div.ipsColumn_fluid > div > h1"
      ) as HTMLElement;

      presenceData.details = "Viewing Profile";
      presenceData.state = item.innerText;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
});
