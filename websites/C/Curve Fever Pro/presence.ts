const presence = new Presence({
    clientId: "775356824240128021"
  }),
  skinNames = new Map<string, string>();
skinNames.set("Angel", "angel");
skinNames.set("Blue Racer", "blue_racer");
skinNames.set("Bumble Bee", "bumble_bee");
skinNames.set("Candy Cane", "candy_cane");
skinNames.set("Jack-o'-lantern", "jack-o_-lantern");
skinNames.set("Joker", "joker");
skinNames.set("Jungle Leaf", "jungle_leaf");
skinNames.set("O Christmas Tree", "o_christmas_tree");
skinNames.set("Poopy", "poopy");
skinNames.set("Red&Yellow", "red_yellow");
skinNames.set("Robot", "robot");
skinNames.set("Spider Curve", "spider_curve");
skinNames.set("Starfish", "starfish");
skinNames.set("The Mummy", "the_mummy");
skinNames.set("Think Pink", "think_pink");
skinNames.set("Vampire", "vampire");
skinNames.set("VIP Gold", "vip_gold");
skinNames.set("Witchy Cauldron", "witchy_cauldron");
skinNames.set("Zombie Hand", "zombie_hand");
skinNames.set("Ice-Cream", "ice-cream");
skinNames.set("Pineapple", "pineapple");
skinNames.set("Rasta", "rasta");

let lastlobbyName = "",
  lastName = "Unnamed";

const data: PresenceData = {
  largeImageKey: "index",
  startTimestamp: Date.now(),
  details: "Main Menu",
  state: "Just Started Playing"
};

presence.on("UpdateData", async () => {
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});

function RefreshData() {
  const state_Page = getActualGamePage();
  if (state_Page == "in_lobby_picking_powers") {
    const skinSlot = document.getElementsByClassName(
        "skin-slot skin-slot--0"
      )[0],
      groupTitle = document.getElementsByClassName("group-name__title")[0],
      userRows = document.getElementsByClassName("c-user c-user--small"),
      skinName = skinSlot
        ? skinSlot.children[0].getAttribute("title")
        : "skin_unknown",
      lobbyName = groupTitle ? groupTitle.textContent : "Unknown lobby";

    data.details = "Picking Powers";
    data.state = "In Lobby, " + lobbyName + " (" + userRows.length + "/6)";

    if (skinNames.has(skinName)) {
      data.smallImageKey = skinNames.get(skinName);
      data.smallImageText = "Playing as " + skinName;
    }

    lastlobbyName = lobbyName;
  } else if (state_Page == "in_lobby_ready") {
    const groupTitle = document.getElementsByClassName("group-name__title")[0],
      userRows = document.getElementsByClassName("group-players-list__row"),
      lobbyName = groupTitle ? groupTitle.textContent : "Unknown lobby";
    let playerCount = 0;
    for (let i = 0; i < userRows.length; i++)
      if (!userRows[i].className.includes("group-players-list__row--empty"))
        playerCount++;

    data.details = "Ready In Lobby";
    data.state = lobbyName + " (" + playerCount + "/6)";
    lastlobbyName = lobbyName;
  } else if (state_Page == "in_game") {
    data.details = "Playing";
    data.state = lastlobbyName;
  } else if (state_Page == "in_game_finished") {
    data.details = "Checking Match Results";
    data.state = lastlobbyName;
  } else {
    const nickElement = document.getElementsByClassName("c-user__name")[0];
    lastName = nickElement ? nickElement.textContent : "Unnamed";
    data.state = lastName;
  }

  if (state_Page == "in_menu") data.details = "Main Menu";
  else if (state_Page == "browsing_lobbies") data.details = "Browsing Lobbies";
  else if (state_Page == "in_shop") data.details = "In Shop";
  else if (state_Page == "in_leaderboard") data.details = "In Leaderboards";
  else if (state_Page == "in_locker") data.details = "In Locker";
  else if (state_Page == "in_battlepass") data.details = "In Battlepass";
  else if (state_Page == "in_progress") data.details = "Checking XP Progress";
  else if (state_Page == "opening_crates") data.details = "Opening Crates";
  else if (state_Page == "creating_match") data.details = "Creating Match";

  data.largeImageKey = "index";
}

function getActualGamePage() {
  if (document.getElementsByClassName("game-overlay")[0]) {
    return "in_game";
  } else if (document.getElementsByClassName("post-game-rewards__title")[0]) {
    return "in_game_finished";
  } else if (document.getElementsByClassName("popup-header")[0]) {
    const popup_Caption =
      document.getElementsByClassName("popup-header")[0].textContent;
    if (popup_Caption == "Room settings") return "creating_match";
    else if (popup_Caption == "Crates") return "opening_crates";
    else if (popup_Caption == "XP progression") return "in_progress";
    else if (popup_Caption == "Battlepass") return "in_battlepass";
    else if (popup_Caption == "Locker") return "in_locker";
    else if (popup_Caption == "Leaderboard") return "in_leaderboard";
    else if (popup_Caption == "Shop") return "in_shop";
  } else if (document.getElementsByClassName("menu side-menu")[0]) {
    return "in_menu";
  } else if (document.getElementsByClassName("lobby")[0]) {
    return "browsing_lobbies";
  } else if (document.getElementsByClassName("module-inventory-top")[0]) {
    return "in_lobby_picking_powers";
  } else if (document.getElementsByClassName("group-ready-state__title")[0]) {
    return "in_lobby_ready";
  }
  return "in_menu";
}

setInterval(RefreshData, 1000);
