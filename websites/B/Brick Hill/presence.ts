const presence = new Presence({
    clientId: "797879854343127040",
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "brick-hill",
  };

  // Main Presence
  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/dashboard"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Dashboard";
  } else if (document.location.pathname.includes("/login/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Login";
  } else if (document.location.pathname.includes("/register/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Register";
  } else if (document.location.pathname.includes("/play/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/play/") {
      const gameName = document.querySelector(
        "body > div.main-holder.grid > div:nth-child(2) > div:nth-child(1) > div.top.blue"
      );
      presenceData.details = "Viewing Game:";
      presenceData.state = gameName.textContent;
    } else {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Games";
    }
  } else if (document.location.pathname.includes("/clans/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Clans";
  } else if (document.location.pathname.includes("/clan/")) {
    presenceData.startTimestamp = browsingStamp;
    const clanName = document.querySelector(
      "body > div.main-holder.grid > div:nth-child(2) > div.card > div.top > span"
    );
    presenceData.details = "Viewing Clan:";
    presenceData.state = clanName.textContent;
  } else if (document.location.pathname.includes("/search/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Search";
  } else if (document.location.pathname.includes("/user/")) {
    presenceData.startTimestamp = browsingStamp;
    const userName = document.querySelector(
      "body > div.main-holder.grid > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > span.ellipsis"
    );
    presenceData.details = "Viewing User:";
    presenceData.state = userName.textContent;
  } else if (document.location.pathname == "/forum/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Forum";
  } else if (document.location.pathname.includes("/membership/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Membership";
  } else if (document.location.pathname.includes("/customize/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Avatar";
  } else if (document.location.pathname.includes("/client/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Download";
  } else if (document.location.pathname.includes("/trades/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Trades";
  } else if (document.location.pathname.includes("/promocodes/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Promocodces";
  } else if (document.location.pathname.includes("/currency/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Currency";
  } else if (document.location.pathname.includes("/settings/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Page:";
    presenceData.state = "Settings";
  } else if (document.location.pathname.includes("/thread/")) {
    presenceData.startTimestamp = browsingStamp;
    const title = document.querySelector(".top");
    presenceData.details = "Viewing Thread:";
    presenceData.state = title.textContent;
  } else if (document.location.pathname.includes("/shop/")) {
    if (document.location.pathname == "/shop/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Page:";
      presenceData.state = "Shop";
    } else {
      presenceData.startTimestamp = browsingStamp;
      const itemName = document.querySelector(".medium-text");
      presenceData.details = "Viewing Item:";
      presenceData.state = itemName.textContent;
    }
  }

  // Blog Presence
  if (document.location.origin.includes("blog.brick-hill.com")) {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Page:";
      presenceData.state = "Blog";
    } else if (document.location.pathname.includes("/author/")) {
      presenceData.startTimestamp = browsingStamp;
      const authorName = document.querySelector("body > div > section > h1");
      presenceData.details = "Viewing Blog Author:";
      presenceData.state = authorName.textContent;
    } else if (document.location.pathname.includes("/page/")) {
      presenceData.startTimestamp = browsingStamp;
      const pageName = document.querySelector("#content > div > nav > span");
      presenceData.details = "Viewing Page:";
      presenceData.state = "Blog (" + pageName.textContent + ")";
    }
  }

  // API Presence
  if (document.location.origin.includes("api.brick-hill.com")) {
    if (document.location.pathname.includes("/docs")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Page:";
      presenceData.state = "API Docs";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
