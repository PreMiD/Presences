var presence = new Presence({
    clientId: "657402289132273668",
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
  });
presence.on("UpdateData", async () => {
  var presenceData = {
    largeImageKey: "memerator",
  };
  if (document.location.pathname == "/") {
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("following")) {
    user = document.querySelector("#fix > span");
    fol = document.querySelector(
      "body > div.container > div > div > div > p:nth-child(2)"
    );
    presenceData.details = "Viewing who " + user.innerText + " is following";
    presenceData.state = fol.innerText;
  } else if (document.location.pathname.includes("followers")) {
    user = document.querySelector("#fix > span");
    fol = document.querySelector(
      "body > div.container > div > div > div > p:nth-child(2)"
    );
    presenceData.details = "Viewing " + user.innerText + "'s followers";
    presenceData.state = fol.innerText;
  } else if (document.location.pathname.includes("/profile/")) {
    user = document.querySelector("#fix > span");
    presenceData.details = "Viewing Profile";
    presenceData.state = user.innerText;
  } else if (document.location.pathname == "/ratings") {
    presenceData.details = "Viewing memes they've rated";
  } else if (document.location.pathname.includes("/ratings")) {
    presenceData.details = "Viewing ratings for a meme";
  } else if (document.location.pathname.includes("/meme/recents")) {
    presenceData.details = "Viewing recent memes";
  } else if (document.location.pathname.includes("/meme/reports")) {
    presenceData.details = "Viewing memes they've reported";
  } else if (document.location.pathname.includes("/meme/submit")) {
    presenceData.details = "Submitting a meme";
  } else if (document.location.pathname.includes("/meme/following")) {
    presenceData.details = "Viewing memes from following";
  } else if (document.location.pathname.includes("/meme/topmemers")) {
    presenceData.details = "Viewing the top memers";
  } else if (document.location.pathname.includes("/meme/top")) {
    presenceData.details = "Viewing the top memes";
  } else if (document.location.pathname.includes("/report")) {
    presenceData.details = "Reporting a meme!";
  } else if (document.location.pathname.includes("/transfer")) {
    presenceData.details = "Transferring a meme!";
  } else if (document.location.pathname.includes("/meme")) {
    user = document.querySelector("#memeid");
    author = document.querySelector(
      "body > div.container > div > div > div.col > p:nth-child(2) > a"
    );
    presenceData.details = "Viewing Meme " + user.innerText;
    presenceData.state = " by " + author.innerText;
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.details = "Managing their settings";
  } else if (document.location.pathname.includes("/notification")) {
    presenceData.details = "Viewing their notifications";
  } else if (document.location.pathname.includes("/login")) {
    presenceData.details = "Logging in...";
  } else if (document.location.pathname.includes("/register")) {
    presenceData.details = "Registering!";
  } else if (document.location.pathname.includes("/stats")) {
    presenceData.details = "Viewing Site Stats";
  } else if (document.location.pathname.includes("/unrated")) {
    presenceData.details = "Viewing Unrated Memes";
  } else if (document.location.pathname.includes("/transfers")) {
    presenceData.details = "Viewing Meme Transfers";
  } else if (document.location.pathname.includes("/staff")) {
    presenceData.details = "Viewing Staff Members";
  } else if (document.location.pathname.includes("/support")) {
    presenceData.details = "Viewing Support Pages";
  } else if (document.location.pathname.includes("/search")) {
    user = document.querySelector(
      "body > div.container > div > div > div > div > div.bootstrap-table.bootstrap4 > div.fixed-table-toolbar > div > input"
    );
    presenceData.details = "Searching for users";
    if (user != null && user.value != "" && user.value != null) {
      presenceData.state = '"' + user.value + '"';
    }
  } else if (document.location.pathname.includes("/api")) {
    presenceData.details = "Viewing the API";
  } else if (document.location.pathname.includes("/pro")) {
    presenceData.details = "Viewing the Pro Page";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
