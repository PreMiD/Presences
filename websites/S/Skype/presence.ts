const presence = new Presence({
    clientId: "617500416887881748" // CLIENT ID FOR YOUR PRESENCE
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let typing: HTMLElement, user: HTMLElement, bot: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "fror_why"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname === "web.skype.com") {
    user = document.querySelector(
      "body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div"
    );
    typing = document.querySelector(
      "body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > br"
    );
    bot = document.querySelector(
      "body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > button > div > div"
    );
    if (user !== null) {
      if (typing === null) {
        presenceData.details = "Typing in chat:";
        presenceData.state = user.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Reading chat:";
        presenceData.state = user.innerText;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      }
    } else if (bot !== null) {
      if (typing === null) {
        presenceData.details = "Typing in chat:";
        presenceData.state = bot.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Reading chat:";
        presenceData.state = bot.innerText;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "preview.web.skype.com") {
    user = document.querySelector(
      "body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div"
    );
    typing = document.querySelector(
      "body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > span"
    );
    if (user !== null) {
      if (typing !== null) {
        presenceData.details = "Typing in chat:";
        presenceData.state = user.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Reading chat:";
        presenceData.state = user.innerText;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "www.skype.com") {
    presenceData.details = "Skype";
    presenceData.state = "Browsing...";

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
