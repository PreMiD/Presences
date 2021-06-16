const presence = new Presence({
  clientId: "655050505726197781"
}), browsingStamp = Math.floor(Date.now() / 1000), page = window.location.pathname, page2 = document.title, Check1 = document.querySelector("#root > div > div > div.page-wrapper.inside-panel > div > div:nth-child(1) > div > div > div.moduleTitle.txt-light > h4"),
check2 = document.querySelector("#root > div > div > div.page-wrapper.inside-panel > div > div:nth-child(1) > div > div.pt-25.moduleS > div.moduleTitle.txt-light > h4"),
check3 = document.querySelector("#root > div > div > div.page-wrapper.inside-panel > div > div:nth-child(1) > div > div.moduleTitle.txt-light > h4");

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "probot",
    startTimestamp: browsingStamp
  };

    if (page.includes("/server")) {
      if (check3) {
        if (check3.textContent.includes("Reaction Roles")) {
          presenceData.details = "Managing:";
          presenceData.state = "Reaction Roles Settings";
      }
    } else {
      if (page2.includes("settings")) {
      presenceData.details = "Managing the settings of";
      const title = document.querySelector("#root > div > div > div.sidebar_root > div.sidebar_main > div > div.dramex2 > div > ul > li:nth-child(1) > div > div.dropdown.mt-5 > a");
      presenceData.state = "server: " + title.textContent; 
    } else if (page2.includes("embed")) {
      presenceData.details = "Managing:";
      presenceData.state = "Embeds";
    } else if (Check1.textContent.includes("Utility")) {
      presenceData.details = "Managing:";
      presenceData.state = "Utility Settings"; 
    } else if (check2.textContent.includes("Mod")) {
      presenceData.details = "Managing:";
      presenceData.state = "Moderation Settings";
    } else if (check2.textContent.includes("Automod")) {
      presenceData.details = "Managing:";
      presenceData.state = "Automod Settings";
    } else if (check2.textContent.includes("Welcomer")) {
      presenceData.details = "Managing:";
      presenceData.state = "Welcomer Settings"; 
    } else if (check2.textContent.includes("Auto Responder")) {
      presenceData.details = "Managing:";
      presenceData.state = "Auto Responder Settings";
    } else if (check2.textContent.includes("Leveling System")) {
      presenceData.details = "Managing:";
      presenceData.state = "Leveling Settings";
    } else if (check2.textContent.includes("Logs")) {
      presenceData.details = "Managing:";
      presenceData.state = "Logging Settings";
    } else if (check2.textContent.includes("Colors")) {
      presenceData.details = "Managing:";
      presenceData.state = "Color Settings";
    } else if (check2.textContent.includes("Auto Roles")) {
      presenceData.details = "Managing:";
      presenceData.state = "Auto Roles Settings";
    } else if (Check1.textContent.includes("Music")) {
      presenceData.details = "Managing:";
      presenceData.state = "Music Settings";
    } else {
      presenceData.details = "Viewing:";
      presenceData.state = "Server Overview";
    }
  }
    } else if (page.includes("/commands")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Commands";
    } else if (page.includes("/premium")) {
      presenceData.details = "Viewing Premium";
    } else if (page.includes("/bg")) {
      presenceData.details = "Managing the";
      presenceData.state = "profile backgrounds";
    } else if (page.includes("/id")) {
      presenceData.details = "Managing the";
      presenceData.state = "ID backgrounds";
    } else if (page.includes("/badges")) {
      presenceData.details = "Managing the";
      presenceData.state = "profile badges";
    } else if (page.includes("/xp")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Top 100 by XP";
    } else if (page.includes("/credits")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Richest 100 Billionaires";
    } else if (page.includes("/transactions")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Credits Transactions";
    }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
