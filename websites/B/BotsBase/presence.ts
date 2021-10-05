const presence = new Presence({
    clientId: "730486476059705354"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let priceEls;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "botsbase"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname === "botsbase.net") {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Home";
    if (document.location.pathname.includes("/bots")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Bots Page";
    } else if (document.location.pathname.includes("/certify")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Certificate Reference Purity";
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Premium Features";
    } else if (document.location.pathname.includes("/404")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "404 Error Page";
    } else if (document.location.pathname.includes("/vote")) {
      priceEls = document.getElementsByClassName("premid vote_name");
      for (let i = 0; i < priceEls.length; i++) {
        const botname = priceEls[i].textContent;
        presenceData.details = "Voting for the Bot";
        presenceData.state = botname;
      }
    } else if (document.location.pathname.includes("/user/")) {
      priceEls = document.getElementsByClassName("premid user");
      for (let i = 0; i < priceEls.length; i++) {
        const profilename = priceEls[i].textContent;
        presenceData.details = "Viewing a profile:";
        presenceData.state = profilename;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/submit/bot")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Add bots page";
    } else if (document.location.pathname.includes("/tag")) {
      priceEls = document.getElementsByClassName(
        "font-semibold text-2xl text-white"
      );
      for (let i = 0; i < priceEls.length; i++) {
        const tag = priceEls[i].textContent;
        presenceData.details = "Viewing a Page:";
        presenceData.state = tag;
      }
    } else if (document.location.pathname.includes("/admin")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Admin Panel";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/bot/")) {
      priceEls = document.getElementsByClassName("premid bot_name");
      for (let i = 0; i < priceEls.length; i++) {
        const botname = priceEls[i].textContent;
        presenceData.details = "Viewing a bot:";
        presenceData.state = botname;
      }
    } else if (document.location.pathname.includes("/profile/edit")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Editing the Profile";
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Search Bot";
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
