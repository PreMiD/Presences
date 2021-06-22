const presence = new Presence({
  clientId: "632047673754648586"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;

  if (path === "/") data.details = "Viewing homepage";
  else if (path === "/manage") data.details = "Adding item";
  else if (path.startsWith("/manage/edit/")) {
    const editData = document.querySelector(".card-body h2 .cosmetic-name");
    data.details = "Editing item";
    data.state = editData.textContent;
  } else if (path === "/manage/sets") data.details = "Editing item sets";
  else if (path === "/manage/shop") data.details = "Editing shop";
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
    const itemTitle = document.querySelector(".col-md-10.col-s12.item-full h3"),
      itemInfo = document.querySelector(".col-md-10.col-s12.item-full h4");
    data.details = `Viewing ${itemTitle.firstChild.textContent}`;
    data.state = itemInfo.textContent;
  } else if (path === "/upcoming") data.details = "Viewing upcoming items";
  else if (path === "/list") data.details = "Viewing cosmetics list";
  else if (path.startsWith("/sets/")) {
    const setName = document.querySelector(".col-md-12 h2"),
      setInfo = document.querySelector(".col-md-12 p");
    data.details = `Viewing ${setName.textContent}`;
    data.state = setInfo.textContent;
  } else if (path === "/sets") data.details = "Viewing item sets";
  else if (path === "/png") data.details = "Viewing cosmetics png";
  else if (path === "/icons") data.details = "Viewing cosmetics icons";
  else if (path === "/reminders") data.details = "Viewing item reminders";
  else if (path === "/history") data.details = "Viewing shop history";
  else if (path.startsWith("/shop/")) {
    const shopHistoryData = document.querySelector(".col-md-12 h2 .you");
    data.details = "Viewing item shop";
    data.state = shopHistoryData.textContent;
  } else if (path === "/shop") {
    const shopData = document.querySelector(".col-m.col-12.primary h2 .you");
    data.details = "Viewing item shop";
    data.state = shopData.textContent;
  } else if (path === "/modes") data.details = "Viewing ltm's";
  else if (path === "/news") data.details = "Viewing news";
  else if (path === "/random") data.details = "Randomising items";
  else if (path === "/api/docs") data.details = "Viewing api documentation";
  else if (path === "/account") data.details = "Viewing account data";
  else data.details = `Viewing ${path.substring(1)}`;

  data.startTimestamp = Date.now();
  presence.setActivity(data);
});
