const presence = new Presence({
    clientId: "661150919584514067"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname === "usercord.org") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Usercord Home Page";

    if (document.location.pathname.includes("/leaderboard")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "UserCord Leaderboard";
    } else if (document.location.pathname.includes("/search/")) {
      presenceData.details = "Searching for user:";
      presenceData.state = window.location.href
        .slice(31)
        .replace(/\+|%20/g, " ");
    } else if (document.location.pathname.includes("/member")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "UserCord Member List";
    } else if (document.location.pathname.includes("/edit")) {
      presenceData.details = "Editing Info For:";
      presenceData.state = "Own Profile";
    } else if (document.location.pathname.includes("/login")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "UserCord Login Page";
    } else if (document.location.pathname.includes("/reports")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "UserCord Reports Page";
    } else if (document.location.pathname.includes("/pro/")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "UserCord Pro Users";
    } else if (document.location.pathname.includes("/discord")) {
      presenceData.details = "Joining Discord..";
      presenceData.state = "Name: DiscordLabs";
    } else if (document.location.pathname.includes("/u/")) {
      const priceEls = document.getElementsByClassName("usertitle");
      for (let i = 0; i < priceEls.length; i++) {
        const profilename = priceEls[i].textContent;
        presenceData.details = "Viewing a profile:";
        presenceData.state = profilename;
      }
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
