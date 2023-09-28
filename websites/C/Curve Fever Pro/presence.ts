const presence = new Presence({
		clientId: "775356824240128021",
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
	largeImageKey:
		"https://cdn.rcd.gg/PreMiD/websites/C/Curve%20Fever%20Pro/assets/logo.png",
	startTimestamp: Date.now(),
	details: "Main Menu",
	state: "Just Started Playing",
};

presence.on("UpdateData", async () => {
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});

function RefreshData() {
	const statePage = getActualGamePage();
	switch (statePage) {
		case "in_lobby_picking_powers": {
			const [skinSlot] = document.querySelectorAll(".skin-slot.skin-slot--0"),
				[groupTitle] = document.querySelectorAll(".group-name__title"),
				skinName = skinSlot
					? skinSlot.children[0].getAttribute("title")
					: "skin_unknown",
				lobbyName = groupTitle ? groupTitle.textContent : "Unknown lobby";

			presenceData.details = "Picking Powers";
			presenceData.state = `In Lobby, ${lobbyName} (${
				document.querySelectorAll(".c-user.c-user--small").length
			}/6)`;

			if (skinNames.has(skinName)) {
				presenceData.smallImageKey = skinNames.get(skinName);
				presenceData.smallImageText = `Playing as ${skinName}`;
			}

			lastlobbyName = lobbyName;

			break;
		}
		case "in_lobby_ready": {
			const [groupTitle] = document.querySelectorAll(".group-name__title"),
				userRows = document.querySelectorAll(".group-players-list__row"),
				lobbyName = groupTitle ? groupTitle.textContent : "Unknown lobby";
			let playerCount = 0;
			for (const userRow of userRows) {
				if (!userRow.className.includes("group-players-list__row--empty"))
					playerCount++;
			}

			presenceData.details = "Ready In Lobby";
			presenceData.state = `${lobbyName} (${playerCount}/6)`;
			lastlobbyName = lobbyName;

			break;
		}
		case "in_game": {
			presenceData.details = "Playing";
			presenceData.state = lastlobbyName;

			break;
		}
		case "in_game_finished": {
			presenceData.details = "Checking Match Results";
			presenceData.state = lastlobbyName;

			break;
		}
		default: {
			const [nickElement] = document.querySelectorAll(".c-user__name");
			lastName = nickElement ? nickElement.textContent : "Unnamed";
			presenceData.state = lastName;
		}
	}

	switch (statePage) {
		case "in_menu": {
			presenceData.details = "Main Menu";
			break;
		}
		case "browsing_lobbies": {
			presenceData.details = "Browsing Lobbies";
			break;
		}
		case "in_shop": {
			presenceData.details = "In Shop";
			break;
		}
		case "in_leaderboard": {
			presenceData.details = "In Leaderboards";
			break;
		}
		case "in_locker": {
			presenceData.details = "In Locker";
			break;
		}
		case "in_battlepass": {
			presenceData.details = "In Battlepass";
			break;
		}
		case "in_progress": {
			presenceData.details = "Checking XP Progress";
			break;
		}
		case "opening_crates": {
			presenceData.details = "Opening Crates";
			break;
		}
		case "creating_match":
			{
				presenceData.details = "Creating Match";
				// No default
			}
			break;
	}

	presenceData.largeImageKey = "index";
}

function getActualGamePage() {
	if (document.querySelectorAll(".game-overlay")[0]) return "in_game";
	else if (document.querySelectorAll(".post-game-rewards__title")[0])
		return "in_game_finished";
	else if (document.querySelectorAll(".popup-header")[0]) {
		switch (document.querySelectorAll(".popup-header")[0].textContent) {
			case "Room settings":
				return "creating_match";
			case "Crates":
				return "opening_crates";
			case "XP progression":
				return "in_progress";
			case "Battlepass":
				return "in_battlepass";
			case "Locker":
				return "in_locker";
			case "Leaderboard":
				return "in_leaderboard";
			case "Shop":
				return "in_shop";
			// No default
		}
	} else if (document.querySelectorAll(".menu.side-menu")[0]) return "in_menu";
	else if (document.querySelectorAll(".lobby")[0]) return "browsing_lobbies";
	else if (document.querySelectorAll(".module-inventory-top")[0])
		return "in_lobby_picking_powers";
	else if (document.querySelectorAll(".group-ready-state__title")[0])
		return "in_lobby_ready";

	return "in_menu";
}

setInterval(RefreshData, 1000);
