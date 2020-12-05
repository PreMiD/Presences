const presence = new Presence({
  clientId: "730486476059705354"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "botsbase",
  };

  if (document.location.hostname == "botsbase.net") {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Home";
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/bots")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Bots Page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/certify")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Certificate Reference Purity";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Premium Features";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/404")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "404 Error Page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/vote")) {
      const priceEls = document.getElementsByClassName("premid vote_name");
      for (var i = 0; i < priceEls.length; i++) {
        const botname = priceEls[i].textContent;
        presenceData.details = "Voting for the Bot";
        presenceData.state = botname;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/user/")) {
      const priceEls = document.getElementsByClassName("premid user");
      for (var i = 0; i < priceEls.length; i++) {
        const profilename = priceEls[i].textContent;
        presenceData.details = "Viewing a profile:";
        presenceData.state = profilename;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/submit/bot")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Add bots page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/tag")) {
      const priceEls = document.getElementsByClassName("font-semibold text-2xl text-white");
      for (var i = 0; i < priceEls.length; i++) {
        const tag = priceEls[i].textContent;
        presenceData.details = "Viewing a Page:";
        presenceData.state = tag;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/admin")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Admin Panel";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/bot/")) {
      const priceEls = document.getElementsByClassName("premid bot_name");
      for (var i = 0; i < priceEls.length; i++) {
        const botname = priceEls[i].textContent;
        presenceData.details = "Viewing a bot:";
        presenceData.state = botname;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/profile/edit")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Editing the Profile";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Search";
      presenceData.startTimestamp = browsingStamp;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
