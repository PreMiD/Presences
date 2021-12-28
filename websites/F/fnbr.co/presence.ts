const presence = new Presence({
  clientId: "632047673754648586"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;

  if (path === "/") presenceData.details = "Viewing homepage";
  else if (path === "/manage") presenceData.details = "Adding item";
  else if (path.startsWith("/manage/edit/")) {
    presenceData.details = "Editing item";
    presenceData.state = document.querySelector(
      ".card-body h2 .cosmetic-name"
    ).textContent;
  } else if (path === "/manage/sets")
    presenceData.details = "Editing item sets";
  else if (path === "/manage/shop") presenceData.details = "Editing shop";
  else if (
    path.startsWith("/backpack") ||
    path.startsWith("/banner") ||
    path.startsWith("/bundle") ||
    path.startsWith("/emoji") ||
    path.startsWith("/emote") ||
    path.startsWith("/glider") ||
    path.startsWith("/loading") ||
    path.startsWith("/music") ||
    path.startsWith("/outfit") ||
    path.startsWith("/pet") ||
    path.startsWith("/pickaxe") ||
    path.startsWith("/skydive") ||
    path.startsWith("/spray") ||
    path.startsWith("/toy") ||
    path.startsWith("/umbrella") ||
    path.startsWith("/wrap")
  ) {
    presenceData.details = `Viewing ${
      document.querySelector(".col-md-10.col-s12.item-full h3").firstChild
        .textContent
    }`;
    presenceData.state = document.querySelector(
      ".col-md-10.col-s12.item-full h4"
    ).textContent;
  } else if (path === "/upcoming")
    presenceData.details = "Viewing upcoming items";
  else if (path === "/list") presenceData.details = "Viewing cosmetics list";
  else if (path.startsWith("/sets/")) {
    presenceData.details = `Viewing ${
      document.querySelector(".col-md-12 h2").textContent
    }`;
    presenceData.state = document.querySelector(".col-md-12 p").textContent;
  } else if (path === "/sets") presenceData.details = "Viewing item sets";
  else if (path === "/png") presenceData.details = "Viewing cosmetics png";
  else if (path === "/icons") presenceData.details = "Viewing cosmetics icons";
  else if (path === "/reminders")
    presenceData.details = "Viewing item reminders";
  else if (path === "/history") presenceData.details = "Viewing shop history";
  else if (path.startsWith("/shop/")) {
    presenceData.details = "Viewing item shop";
    presenceData.state =
      document.querySelector(".col-md-12 h2 .you").textContent;
  } else if (path === "/shop") {
    presenceData.details = "Viewing item shop";
    presenceData.state = document.querySelector(
      ".col-m.col-12.primary h2 .you"
    ).textContent;
  } else if (path === "/modes") presenceData.details = "Viewing ltm's";
  else if (path === "/news") presenceData.details = "Viewing news";
  else if (path === "/random") presenceData.details = "Randomising items";
  else if (path === "/api/docs")
    presenceData.details = "Viewing api documentation";
  else if (path === "/account") presenceData.details = "Viewing account data";
  else presenceData.details = `Viewing ${path.substring(1)}`;

  presenceData.startTimestamp = Date.now();
  presence.setActivity(presenceData);
});
