const presence = new Presence({
  clientId: "731659541904621708"
});
presence.on("UpdateData", async () => {
  const data: PresenceData = {
    startTimestamp: Date.now()
  };
  let path = document.location.pathname;
  if (path.startsWith("/fortnite")) {
    data.largeImageKey = "fortnite";
    path = path.substring(9);
    if (path.length === 0) {
      data.details = "Viewing homepage";
      data.state = "Fortnite";
    } else if (path === "/shop") {
      const shopDate = document.querySelector(".shop-date-small");
      data.details = "Viewing item shop";
      data.state = shopDate.textContent;
    } else if (path === "/cosmetics") data.details = "Viewing all cosmetics";
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
      const itemTitle = document.querySelector(".item-title"),
        itemType = document.querySelector(".type-rarity-string");
      data.details = `Viewing ${itemTitle.textContent}`;
      data.state = `${itemType.childNodes[1].textContent} ${itemType.firstChild.textContent}`;
    } else if (path === "/upcoming")
      data.details = "Viewing upcoming cosmetics";
    else if (path === "/sets") data.details = "Viewing item sets";
    else if (path.startsWith("/sets/")) {
      const setName = document.querySelector(".item-title");
      data.details = "Viewing item set";
      data.state = setName.textContent;
    } else data.details = `Viewing ${path.substring(1)}`;
  } else if (path.startsWith("/valorant")) {
    data.largeImageKey = "valorant";
    path = path.substring(9);
    if (path.length === 0) {
      data.details = "Viewing homepage";
      data.state = "Valorant";
    } else if (path === "/all") data.details = "Viewing all skins";
    else if (path === "/weapons") data.details = "Viewing weapons";
    else if (path.startsWith("/weapons/")) {
      const title = document.querySelector(".weapon-detail h1");
      data.details = "Viewing weapon";
      data.state = title.textContent.replace(" Skins", "");
    } else if (path === "/collections") data.details = "Viewing collections";
    else if (path.startsWith("/collections/")) {
      const collectionName = document.querySelector(".item-title");
      data.details = "Viewing collection";
      data.state = collectionName.textContent;
    } else if (
      path.startsWith("/sidearm/") ||
      path.startsWith("/sniper/") ||
      path.startsWith("/knife/") ||
      path.startsWith("/rifle/") ||
      path.startsWith("/heavy/") ||
      path.startsWith("/smg/") ||
      path.startsWith("/shotgun/") ||
      path.startsWith("/sidearm/")
    ) {
      const skinName = document.querySelector(".skin-detail h1");
      data.details = "Viewing skin";
      data.state = skinName.textContent;
    } else data.details = `Viewing ${path.substring(1)}`;
  } else if (path.startsWith("/fallguys")) {
    data.largeImageKey = "fallguys";
    path = path.substring(9);
    if (path.length === 0) {
      data.details = "Viewing homepage";
      data.state = "Fall Guys";
    } else if (path === "/all") data.details = "Viewing all skins";
    else if (path === "/unreleased") data.details = "Viewing unreleased skins";
    else if (path === "/shop") {
      const shopDate = document.querySelector(".shop-date-small");
      data.details = "Viewing item shop";
      data.state = shopDate.textContent;
    } else if (
      path.startsWith("/top/") ||
      path.startsWith("/bottom") ||
      path.startsWith("/pattern") ||
      path.startsWith("/emote") ||
      path.startsWith("/faceplate") ||
      path.startsWith("/colour") ||
      path.startsWith("/celebration")
    ) {
      const skinName = document.querySelector(".skin-name"),
        skinType = document.querySelector(".skin-type-string"),
        skinRarity = document.querySelector(
          ".skin-rarity-string > .rarity-label"
        );
      data.details = `Viewing ${skinName.textContent}`;
      data.state = `${skinRarity.textContent} ${skinType.textContent}`;
    }
  } else {
    data.largeImageKey = "skindb";
    if (path === "/") data.details = "Viewing homepage";
    else data.details = `Viewing ${path.substring(1)}`;
  }
  presence.setActivity(data);
});
