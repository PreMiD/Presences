const presence = new Presence({
  clientId: "863866805184626708"
}),
browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, search: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "manacube"
  };

  presenceData.startTimestamp = browsingStamp;
  if(document.location.hostname === "manacube.com") {
    presenceData.details = "Forums";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  }
  if(document.location.pathname.includes("/threads/")) {
    title = document.querySelector(
      "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
    );
    if(title != null) {
      title = document.querySelector(
        "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
      );
      presenceData.state = title.innerText;
      presenceData.details = "Forums, Viewing Thread:";

      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Forums, Browsing..";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/forums/")) {
    title = document.querySelector(
      "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
    );
    if (title != null) {
      title = document.querySelector(
        "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
      );
      presenceData.state = title.innerText;
      presenceData.details = "Forums, Viewing Category:";

      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Forums, Browsing...";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/whats-new/") && document.location.pathname.includes("/profile-posts/")) {
    presenceData.details = "Forums, Viewing the list of";
    presenceData.state = "Latest Profile Posts";
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
    console.log(presenceData);
  } else if(document.location.pathname.includes("/whats-new/") && document.location.pathname.includes("/posts/")) {
    presenceData.details = "Forums, Viewing the list of";
    presenceData.state = "Latest Posts";
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search/")) {
    search = document.querySelector(
      "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1 > a > em"
    );
    if(search != null) {
      presenceData.details = "Forums, Searching For:";
      presenceData.state = search.innerText;

      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/members/")) {
   user = document.querySelector(
    "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-pageContent > div.block > div.block-container > div.block-body > div.memberHeader > div.memberHeader-main > div.memberHeader-content > h1 > span > span"
   );
   presenceData.details = "Forums, Viewing User:";
   presenceData.state = user.innerText;

   delete presenceData.smallImageKey;
   presence.setActivity(presenceData);

  } else if (document.location.pathname.includes("/account/")) {
    presenceData.details = "Forums, Account Settings";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData)
  } else if (document.location.pathname.includes("/support/")) {
    title = document.querySelector(
      "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
    )
    presenceData.details = "Support, Browsing";
    presenceData.state = title.innerText;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } 
  else if (document.location.pathname.includes("/watched/")) {
    if(document.location.pathname.includes("/threads/")) {
      presenceData.details = "Forums, Viewing Their";
      presenceData.state = "Watched Threads";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Forums, Viewing Their";
      presenceData.state = "Watched Forums";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/conversations/")) {
    if(document.querySelector(
      "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
    ) != null ) {
      title = document.querySelector(
        "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-header > div.p-title > h1"
      );
      presenceData.details = "Forums, Reading a DM";
      presenceData.state = title.innerText + "...";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Forums, Browsing";
      presenceData.state = "Through DMs";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/stats/")) {
    if(document.location.pathname.includes("/player/")) {
      user = document.querySelector(
        "div.p-pageWrapper > div.p-body > div.p-body-inner > div.p-body-main > div.p-body-content > div.p-body-pageContent > div.section--player > div.air > div.section-playerName > div.text > div.top > h3"
      );
      presenceData.details = "Stats, Viewing User:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData)
    } else if(document.location.pathname.includes("/leaderboards/")) {
      presenceData.details = "Stats, Browsing";
      presenceData.state = "Server Seaderboards";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Stats, Browsing";
      presenceData.state = "Server Stats"

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/staff/")) {
    presenceData.details = "Forums, Browsing";
    presenceData.state = "Staff Page";

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } 
  if (document.location.hostname === "store.manacube.com") {
    if(document.location.pathname.includes("/category/ranks")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Ranks";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/keys")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Keys";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/cubits")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Cubits";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/skyblock")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Skyblock Black Market";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/survival")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Survival Black Market";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/factions")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Factions Black Market";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/1151309")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Olympus Black Market";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/1053998")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Parkour Black Market";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/1053997")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Creative Black Market";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/kits")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Kits";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/553670")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Skyblock Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/553671")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Creative Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/553673")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Parkour Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/kitpvp-titles")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "KitPvP Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/553672")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Factions Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/750480")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Survival Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/1003651")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Island Titles";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/patrons")) {
      presenceData.details = "Store, Browsing";
      presenceData.state = "Patrons";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/checkout")) {
      presenceData.details = "Store, Checking out";
      presenceData.state = "Viewing basket";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Store, Browsing...";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  }
  if (document.location.hostname === "bans.manacube.com") {
    if(document.location.pathname.includes("/bans")) {
      presenceData.details = "Bans, Browsing";
      presenceData.state = "Viewing List of bans";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/mutes")) {
      presenceData.details = "Bans, Browsing";
      presenceData.state = "Viewing List of mutes";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/kicks")) {
      presenceData.details = "Bans, Browsing";
      presenceData.state = "Viewing List of kicks";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/user")) {
      user = document.querySelector(
        "div.pagewrapper > div.container > div.row > div.col-md-2 > div.user-info > h3"
      )
      presenceData.details = "Bans, Viewing";
      presenceData.state = "Viewing" + user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Bans, Browsing...";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  }
})