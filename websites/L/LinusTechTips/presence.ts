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

  if (document.location.hostname === "linustechtips.com") {
    if (document.location.pathname === "/") {
      presenceData.details = "Browsing";
      presenceData.state = "Categories";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/forum/")) {
      item = document.querySelector("h1") as HTMLElement;

      presenceData.details = "Browsing Category";
      presenceData.state = item.innerText;

      presenceData.smallImageKey = "search";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/topic/")) {
      item = document.querySelector("h1.ipsType_pageTitle") as HTMLElement;

      presenceData.details = "Viewing Thread";
      presenceData.state = item.innerText;

      presenceData.smallImageKey = "reading";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/profile/")) {
      item = document.querySelector(
        "div.ipsColumns div.ipsColumn_fluid h1"
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
