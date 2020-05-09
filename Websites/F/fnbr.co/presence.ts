var presence = new Presence({
  clientId: "632047673754648586"
});

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "logo"
  };
  var path = document.location.pathname;

  if (path == "/") {
    data.details = "Viewing homepage";
  } else if (path.startsWith("/manage/edit")) {
    var editData = document.querySelector(".card-body h2 .cosmetic-name");
    data.details = "Editing item";
    data.state = editData.textContent;
  } else if (path.startsWith("/manage/sets")) {
    data.details = "Editing item sets";
  } else if (
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
    var itemTitle = document.querySelector(".col-md-10.col-s12.item-full h3");
    var itemInfo = document.querySelector(".col-md-10.col-s12.item-full h4");
    data.details = "Viewing " + itemTitle.firstChild.textContent;
    data.state = itemInfo.textContent;
  } else if (path.startsWith("/upcoming")) {
    data.details = "Viewing upcoming items";
  } else if (path.startsWith("/list")) {
    data.details = "Viewing cosmetics list";
  } else if (path.startsWith("/sets/")) {
    var setName = document.querySelector(".col-md-12 h2");
    var setInfo = document.querySelector(".col-md-12 p");
    data.details = "Viewing " + setName.textContent;
    data.state = setInfo.textContent;
  } else if (path.startsWith("/sets")) {
    data.details = "Viewing item sets";
  } else if (path.startsWith("/png")) {
    data.details = "Viewing cosmetics png";
  } else if (path.startsWith("/icons")) {
    data.details = "Viewing cosmetics icons";
  } else if (path.startsWith("/reminders")) {
    data.details = "Viewing item reminders";
  } else if (path.startsWith("/history")) {
    data.details = "Viewing shop history";
  } else if (path.startsWith("/shop/")) {
    var shopHistoryData = document.querySelector(".col-md-12 h2 .you");
    data.details = "Viewing item shop";
    data.state = shopHistoryData.textContent;
  } else if (path.startsWith("/shop")) {
    var shopData = document.querySelector(".col-m.col-12.primary h2 .you");
    data.details = "Viewing item shop";
    data.state = shopData.textContent;
  } else if (path.startsWith("/modes")) {
    data.details = "Viewing ltm's";
  } else if (path.startsWith("/news")) {
    data.details = "Viewing news";
  } else if (path.startsWith("/random")) {
    data.details = "Randomising items";
  } else if (path.startsWith("/api")) {
    data.details = "Viewing api documentation";
  } else if (path.startsWith("/account")) {
    data.details = "Viewing account data";
  } else {
    data.details = "Browsing";
  }

  data.startTimestamp = Date.now();
  presence.setActivity(data);
});
