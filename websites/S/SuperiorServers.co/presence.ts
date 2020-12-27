const presence = new Presence({
    clientId: "792094839414980639"
});

let currentTime = Math.floor(Date.now() / 1000);

let homeURL = new URL(document.location.href);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "main",
    startTimestamp: currentTime
  };
  if (document.location.hostname == "superiorservers.co") {
    presenceData.largeImageKey = "main";
    presenceData.details = "Portal";
    if (document.location.pathname == "/" || !document.location.pathname) {
        presenceData.startTimestamp = currentTime;
    }
    if (document.location.pathname.includes("/staff")){
      let DRPStaff = document.querySelector("#RP_info").textContent;
      DRPStaff = DRPStaff.substr((DRPStaff.indexOf(" of") + 3), DRPStaff.indexOf(" entries")).replace(" entries", "");
      let SWRPStaff = document.querySelector("#SWRP_info").textContent;
      SWRPStaff = SWRPStaff.substr((SWRPStaff.indexOf(" of") + 3), SWRPStaff.indexOf(" entries")).replace(" entries", "");
      let MilRPStaff = document.querySelector("#MilRP_info").textContent;
      MilRPStaff = MilRPStaff.substr((MilRPStaff.indexOf(" of") + 3), MilRPStaff.indexOf(" entries")).replace(" entries", "");
      let AllServersStaff = document.querySelector("#NO_ID_info").textContent;
      AllServersStaff = AllServersStaff.substr((AllServersStaff.indexOf(" of") + 3), AllServersStaff.indexOf(" entries")).replace(" entries", "");
      let totalStaff = (parseInt(DRPStaff) + parseInt(SWRPStaff) + parseInt(MilRPStaff) + parseInt(AllServersStaff)).toString();
      presenceData.details = "Viewing the Staff list";
      presenceData.state = totalStaff + " total members";
      presenceData.startTimestamp = currentTime;
    }
    if (document.location.pathname.includes("/bans")){
      let numBans = document.querySelector("div.dataTables_info").textContent;
      let start, end;
      start = numBans.indexOf("of ") + 3;
      end = numBans.indexOf(" entries");
      numBans = numBans.substr(start, end).replace(" entries", "")
      presenceData.details = "Viewing " + numBans + " bans";
      let currentPage = document.querySelector("#bans_paginate > ul > li.paginate_button.active > a");
      let lastPage = document.querySelector("#bans_paginate > ul > li:nth-child(8) > a");
      presenceData.state = "(" + currentPage.textContent + "/" +  lastPage.textContent + ")";
      presenceData.startTimestamp = currentTime;
    }
    if (document.location.pathname.includes("/credits"))
    {
      presenceData.details = "Viewing the Credits page";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/darkrp")){
        presenceData.state = "(DarkRP)";
      } else if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/rules")){
      presenceData.details = "Reading the server rules";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/darkrp")){
        presenceData.state = "(DarkRP)";
      } else if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/leaderboard/money")){
      presenceData.details = "Viewing money leaderboards";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/darkrp")){
        presenceData.state = "(DarkRP)";
      }
    }
    if (document.location.pathname.includes("/moneyboard")){
      presenceData.details = "Viewing money leaderboards";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      } else if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      }
    }
    if (document.location.pathname.includes("/darkrp/leaderboard/orgs")){
      presenceData.details = "Viewing org leaderboard";
      presenceData.state = "(DarkRP)";
      presenceData.startTimestamp = currentTime;
    }
    if (document.location.pathname.includes("/polls")){
      presenceData.details = "Viewing polls";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/darkrp")){
        presenceData.state = "(DarkRP)";
      } else if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/characters")){
      presenceData.details = "Using character search";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/darkrp")){
        presenceData.state = "(DarkRP)";
      } else if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/gamemasters")){
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/darkrp")){
        presenceData.state = "(DarkRP)";
      } else if (document.location.pathname.includes("/milrp")){
        presenceData.details = "Viewing MilRP GMs";
        let GMs = document.querySelector("#gamemasters_info").textContent;
        GMs = GMs.substr((GMs.indexOf(" of") + 3), GMs.indexOf(" entries")).replace(" entries", "");
        presenceData.state = GMs + " total members";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.details = "Viewing CWRP GMs";
        let GMs = document.querySelector("#gamemasters_info").textContent;
        GMs = GMs.substr((GMs.indexOf(" of") + 3), GMs.indexOf(" entries")).replace(" entries", "");
        presenceData.state = GMs + " total members";
      }
    }
    if (document.location.pathname.includes("/xpboard")){
      presenceData.details = "Viewing XP leaderboards";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/killboard")){
      presenceData.details = "Viewing K/D leaderboards";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/minigameboard")){
      presenceData.details = "Viewing Minigame leaderboards";
      presenceData.startTimestamp = currentTime;
      if (document.location.pathname.includes("/milrp")){
        presenceData.state = "(MilRP)";
      } else if (document.location.pathname.includes("/cwrp")){
        presenceData.state = "(CWRP)";
      }
    }
    if (document.location.pathname.includes("/profile/")){
      presenceData.details = "Viewing " + document.querySelector("#app > div:nth-child(2) > div > div.panel.panel-default > div.panel-body > div > div:nth-child(1) > span").textContent + "'s profile";
      let steamID32;
      let steamID64 = BigInt(document.location.pathname.substr(document.location.pathname.indexOf('/', 2)).replace("/", "").replace("/", ""));
      if ((steamID64 % 2n) == 0n){
        steamID32 = "STEAM_0:0:" + (((steamID64 - 76561197960265728n) / 2n)).toString();
      }
      else {
        steamID32 = "STEAM_0:1:" + (((steamID64 - 76561197960265728n) / 2n)).toString();
      }
      presenceData.state = steamID32;
      presenceData.startTimestamp = currentTime;
    }
  } else if (document.location.hostname == "forum.superiorservers.co") {
    presenceData.details = "Forums";
    if (document.location.pathname == "/" || !document.location.pathname) {
      presenceData.state = "Home";
      presenceData.startTimestamp = currentTime;
    }
    if (document.location.pathname.includes("/topic/")){
      presenceData.state = "Viewing topic: " + document.querySelector("#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span > span").textContent;
      presenceData.startTimestamp = currentTime;
    }
    if (document.location.pathname.includes("/profile/")){
      presenceData.state = "Viewing profile: " + document.querySelector("#elProfileHeader > div.ipsColumns.ipsColumns_collapsePhone > div.ipsColumn.ipsColumn_fluid > div > h1").textContent;
      presenceData.startTimestamp = currentTime;
    }
  }
  presence.setActivity(presenceData);
});
