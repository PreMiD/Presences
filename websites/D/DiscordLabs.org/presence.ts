const presence = new Presence({
    clientId: "660894911331172372"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let priceEls;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname === "bots.discordlabs.org") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "DiscordLabs Bot List";

    if (document.location.pathname.includes("/partners")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "DiscordLabs Partners";
    } else if (document.location.pathname.includes("/profile/")) {
      priceEls = document.getElementsByClassName("uname");
      for (let i = 0; i < priceEls.length; i++) {
        const profilename = (priceEls[i] as HTMLElement).innerText;
        presenceData.details = "Viewing a profile:";
        presenceData.state = profilename;
      }
    } else if (document.location.pathname.includes("/submit/")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "DiscordLabs Bot Sumbit";
    } else if (document.location.pathname.includes("/submit")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "DiscordLabs Bot Sumbit";
    } else if (document.location.pathname.includes("/search/")) {
      presenceData.details = "Search for:";
      presenceData.state = window.location.href
        .slice(39)
        .replace(/\+|%20/g, " ");
    } else if (document.location.pathname.includes("/bot/")) {
      priceEls = document.getElementsByClassName("botname");
      for (let i = 0; i < priceEls.length; i++) {
        const botname = (priceEls[i] as HTMLElement).innerText;
        presenceData.details = "Viewing a Discord bot:";
        presenceData.state = botname;
      }
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
