const presence = new Presence({
    clientId: "775356824240128021"
  }),
  skinNames = new Map<string, string>()
    .set("Angel", "angel")
    .set("Blue Racer", "blue_racer")
    .set("Bumble Bee", "bumble_bee")
    .set("Candy Cane", "candy_cane")
    .set("Jack-o'-lantern", "jack-o_-lantern")
    .set("Joker", "joker")
    .set("Jungle Leaf", "jungle_leaf")
    .set("O Christmas Tree", "o_christmas_tree")
    .set("Poopy", "poopy")
    .set("Red&Yellow", "red_yellow")
    .set("Robot", "robot")
    .set("Spider Curve", "spider_curve")
    .set("Starfish", "starfish")
    .set("The Mummy", "the_mummy")
    .set("Think Pink", "think_pink")
    .set("Vampire", "vampire")
    .set("VIP Gold", "vip_gold")
    .set("Witchy Cauldron", "witchy_cauldron")
    .set("Zombie Hand", "zombie_hand")
    .set("Ice-Cream", "ice-cream")
    .set("Pineapple", "pineapple")
    .set("Rasta", "rasta");

let lastlobbyName = "",
  lastName = "Unnamed";

const presenceData: PresenceData = {
  largeImageKey: "index",
  startTimestamp: Date.now(),
  details: "Main Menu",
  state: "Just Started Playing"
};

presence.on("UpdateData", async () => {
  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});

function RefreshData() {
  const statePage = getActualGamePage();
  if (statePage === "in_lobby_picking_powers") {
    const [skinSlot] = document.getElementsByClassName(
        "skin-slot skin-slot--0"
      ),
      [groupTitle] = document.getElementsByClassName("group-name__title"),
      userRows = document.getElementsByClassName("c-user c-user--small"),
      skinName = skinSlot
        ? skinSlot.children[0].getAttribute("title")
        : "skin_unknown",
      lobbyName = groupTitle ? groupTitle.textContent : "Unknown lobby";

    presenceData.details = "Picking Powers";
    presenceData.state = `In Lobby, ${lobbyName} (${userRows.length}/6)`;

    if (skinNames.has(skinName)) {
      presenceData.smallImageKey = skinNames.get(skinName);
      presenceData.smallImageText = `Playing as ${skinName}`;
    }

    lastlobbyName = lobbyName;
  } else if (statePage === "in_lobby_ready") {
    const [groupTitle] = document.getElementsByClassName("group-name__title"),
      userRows = document.getElementsByClassName("group-players-list__row"),
      lobbyName = groupTitle ? groupTitle.textContent : "Unknown lobby";
    let playerCount = 0;
    for (let i = 0; i < userRows.length; i++) {
      if (!userRows[i].className.includes("group-players-list__row--empty"))
        playerCount++;
    }

    presenceData.details = "Ready In Lobby";
    presenceData.state = `${lobbyName} (${playerCount}/6)`;
    lastlobbyName = lobbyName;
  } else if (statePage === "in_game") {
    presenceData.details = "Playing";
    presenceData.state = lastlobbyName;
  } else if (statePage === "in_game_finished") {
    presenceData.details = "Checking Match Results";
    presenceData.state = lastlobbyName;
  } else {
    const [nickElement] = document.getElementsByClassName("c-user__name");
    lastName = nickElement ? nickElement.textContent : "Unnamed";
    presenceData.state = lastName;
  }

  if (statePage === "in_menu") presenceData.details = "Main Menu";
  else if (statePage === "browsing_lobbies")
    presenceData.details = "Browsing Lobbies";
  else if (statePage === "in_shop") presenceData.details = "In Shop";
  else if (statePage === "in_leaderboard")
    presenceData.details = "In Leaderboards";
  else if (statePage === "in_locker") presenceData.details = "In Locker";
  else if (statePage === "in_battlepass")
    presenceData.details = "In Battlepass";
  else if (statePage === "in_progress")
    presenceData.details = "Checking XP Progress";
  else if (statePage === "opening_crates")
    presenceData.details = "Opening Crates";
  else if (statePage === "creating_match")
    presenceData.details = "Creating Match";

  presenceData.largeImageKey = "index";
}

function getActualGamePage() {
  if (document.getElementsByClassName("game-overlay")[0]) return "in_game";
  else if (document.getElementsByClassName("post-game-rewards__title")[0])
    return "in_game_finished";
  else if (document.getElementsByClassName("popup-header")[0]) {
    const popupCaption =
      document.getElementsByClassName("popup-header")[0].textContent;
    if (popupCaption === "Room settings") return "creating_match";
    else if (popupCaption === "Crates") return "opening_crates";
    else if (popupCaption === "XP progression") return "in_progress";
    else if (popupCaption === "Battlepass") return "in_battlepass";
    else if (popupCaption === "Locker") return "in_locker";
    else if (popupCaption === "Leaderboard") return "in_leaderboard";
    else if (popupCaption === "Shop") return "in_shop";
  } else if (document.getElementsByClassName("menu side-menu")[0])
    return "in_menu";
  else if (document.getElementsByClassName("lobby")[0])
    return "browsing_lobbies";
  else if (document.getElementsByClassName("module-inventory-top")[0])
    return "in_lobby_picking_powers";
  else if (document.getElementsByClassName("group-ready-state__title")[0])
    return "in_lobby_ready";

  return "in_menu";
}

setInterval(RefreshData, 1000);
