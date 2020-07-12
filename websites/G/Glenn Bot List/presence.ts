const presence = new Presence({
  clientId: "731136399797125150"
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});

// Const thing
const browsingStamp = Math.floor(Date.now() / 1000);
const path = document.location;
const title = document.querySelector("head > title").textContent.replace("| Glenn Bot List", " ").replace("- Glenn Bot List API", " ") ?? "Glenn Bot List!"

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  // Presence
  if (path.hostname == "glennbotlist.xyz" || path.hostname.includes("docs.")) {
    if (path.hostname.includes("docs.")) {
      if (path.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Documentation";
        presenceData.state = "Viewing";
      } else if (title.includes("Reference")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reference";
        presenceData.state = "Viewing...";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = title;
        presenceData.state = "Viewing...";
      } 
    } else if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Some Bots...";
    } else if (path.pathname.includes("tag")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Some Bots...";
    } else if (title.includes("New Bot")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Adding New Bot";
      presenceData.state = "Filling up the form";
    } else if (title.includes("Apply for Partner")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Apply for Partner";
      presenceData.state = "Filling up the form";
    } else if (title.includes("Apply for Staff")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Apply for Staff";
      presenceData.state = "Filling up the form";
    } else if (title.includes("Apply for Certification")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Apply for Certification";
      presenceData.state = "Filling up the form";
    } else if (path.pathname.includes("me")) {
      if (path.pathname.includes("stats")) {
        const user = document.querySelector("body > main > div.justify-content-center.mt-5 > div > h4").textContent ?? "UnknowUser#0000"
        const karma = document.querySelector("body > main > div.justify-content-center.mt-5 > div > ul > li:nth-child(3) > span").textContent.replace("Total Karma", " Total Karma") ?? "0 Total Karma"
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = user + "'s Profile";
        presenceData.state = karma + " Karma";
      } else if (path.pathname.includes("edit")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Profile";
        presenceData.state = "Editing Bio...";
      } else {
        const user = document.querySelector("body > main > div.justify-content-center.mt-5 > div > h4").textContent ?? "UnknowUser#0000"
        const karma = document.querySelector("body > main > div.justify-content-center.mt-5 > div > ul > li:nth-child(3) > span").textContent.replace("Total Karma", " Total Karma")
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = user + "'s Profile";
        presenceData.state = karma + " Karma";
      }
    } else if (path.href.includes("/u/")) {
      const user = document.querySelector("body > main > div.justify-content-center.mt-5 > div > h4").textContent ?? "UnknowUser#0000"
      const krama = document.querySelector("body > main > div.justify-content-center.mt-5 > div > ul > li:nth-child(3) > span").textContent.replace("Total Karma", " Total Karma") ?? "0 Total Karma"
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = user + "'s Profile";
      presenceData.state = krama + " Karma";
    } else if (path.pathname.includes("bot")) {
      if (path.pathname.includes("edit")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = title;
        presenceData.state = "Editing...";
      } else if (path.pathname.includes("token")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = title;
        presenceData.state = "Viewing...";
      } else if (path.pathname.includes("delete")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = title;
        presenceData.state = "Confirming...";
      } else {
      const vote = document.querySelector("body > main > div > div:nth-child(1) > div.col-md-3.text-center.bot-page-card.bot-page-card-small.shadow-2 > div:nth-child(7) > span:nth-child(2)");
      const decs = document.querySelector("body > main > div > div:nth-child(1) > div.col-md-6.text-center.bot-page-card.bot-page-card-large.shadow-2 > div > div:nth-child(1) > div > div:nth-child(1) > p");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title;
      presenceData.state = vote.textContent + " Vote | " + decs.textContent;
      }
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title;
      presenceData.state = "Viewing..."
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
    //console.log(presenceData);
  }
});
