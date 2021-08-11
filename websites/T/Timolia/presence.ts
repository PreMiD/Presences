const presence = new Presence({
    clientId: "872421983554502717"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "large_image",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === "www.timolia.de") {
    if (document.location.pathname === "/") {
      const player = document.querySelector("#liveplayercount").textContent;
      presenceData.details = "Viewing home page";
      presenceData.smallImageKey = "minecraft";
      presenceData.smallImageText = `${player} online players`;
    } else if (document.location.pathname.startsWith("/stats")) {
      const stats = document.querySelector("#playername").textContent;
      presenceData.details = "Viewing stats from:";
      presenceData.state = stats;
    } else if (document.location.pathname.includes("/games"))
      presenceData.details = "Viewing gamemodes";
    else if (document.location.pathname.includes("/account"))
      presenceData.details = "Viewing account settings";
  } else if (document.location.hostname === "howto.timolia.de") {
    presenceData.details = "HowTo - Reading:";
    presenceData.state = document.querySelector(
      "body > div.md-container > main > div > div.md-content > article > h1"
    ).textContent;
  } else if (document.location.hostname === "shop.timolia.de") {
    presenceData.details = "Shop - Viewing store page";
    if (document.location.pathname.startsWith("/checkout")) {
      presenceData.details = "Shop - Viewing shopping cart:";
      presenceData.state = document.querySelector(
        "body > div.sections-wrapper > section > div > div > div.jumbotron > div > div.packages > form > table > tbody > tr > td.col-md-6"
      ).textContent;
    }
  } else if (document.location.hostname === "forum.timolia.de") {
    presenceData.details = "Viewing forum start page";
    if (document.location.pathname.startsWith("/members")) {
      const user = document.querySelector(
        "#content > div.pageWidth > div > div > div.mainProfileColumn > div > div > h1 > span"
      ).textContent;
      presenceData.details = "Viewing forum profile of:";
      presenceData.state = user;
    } else if (document.location.pathname.startsWith("/threads")) {
      const thread = document.querySelector(
        "#content > div.pageWidth > div > div.titleBar > h1"
      ).textContent;
      presenceData.details = "Viewing thread:";
      presenceData.state = thread;
    } else if (document.location.pathname.startsWith("/forums")) {
      const forum = document.querySelector(
        "#content > div.pageWidth > div > div.titleBar > h1"
      ).textContent;
      presenceData.details = "Viewing forum:";
      presenceData.state = forum;
    }
  } else if (document.location.hostname.includes("wi.timolia.de"))
    presenceData.details = "Viewing Webinterface";
  else if (document.location.hostname.includes("gitlab.timolia.de")) {
    presenceData.details = "Viewing GitLab Server";
    presenceData.smallImageKey = "gitlab";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
