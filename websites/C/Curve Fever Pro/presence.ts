const presence = new Presence({
		clientId: "775356824240128021",
	});
	const enum Assets {  Index = "https://cdn.discordapp.com/app-assets/775356824240128021/775358325666873384.png?size=512",
  Angel = "https://cdn.discordapp.com/app-assets/775356824240128021/776016617620373506.png?size=512",
  BlueRacer = "https://cdn.discordapp.com/app-assets/775356824240128021/776016617708322848.png?size=512",
  CandyCane = "https://cdn.discordapp.com/app-assets/775356824240128021/776016617934290965.png?size=512",
  BumbleBee = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618056712192.png?size=512",
  Joker = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618219110421.png?size=512",
  JackoLantern = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618278486057.png?size=512",
  Poopy = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618395926559.png?size=512",
  JungleLeaf = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618404446228.png?size=512",
  OChristmasTree = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618508648498.png?size=512",
  Robot = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618627137536.png?size=512",
  Vampire = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618760699945.png?size=512",
  RedYellow = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618806312990.png?size=512",
  TheMummy = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618915627028.png?size=512",
  ThinkPink = "https://cdn.discordapp.com/app-assets/775356824240128021/776016618991517716.png?size=512",
  WitchyCauldron = "https://cdn.discordapp.com/app-assets/775356824240128021/776016619046043649.png?size=512",
  VipGold = "https://cdn.discordapp.com/app-assets/775356824240128021/776016619058626600.png?size=512",
  ZombieHand = "https://cdn.discordapp.com/app-assets/775356824240128021/776016619293507634.png?size=512",
  SpiderCurve = "https://cdn.discordapp.com/app-assets/775356824240128021/776016619314479124.png?size=512",
  Starfish = "https://cdn.discordapp.com/app-assets/775356824240128021/776016619331256360.png?size=512",
  IceCream = "https://cdn.discordapp.com/app-assets/775356824240128021/776020539898593280.png?size=512",
  Rasta = "https://cdn.discordapp.com/app-assets/775356824240128021/776045905451155476.png?size=512",
  Pineapple = "https://cdn.discordapp.com/app-assets/775356824240128021/776045905643044924.png?size=512",
	Logo =
	"https://cdn.rcd.gg/PreMiD/websites/C/Curve%20Fever%20Pro/assets/logo.png",
}
const	skinNames = new Map<string, string>()
		.set("Angel", Assets.Angel)
		.set("Blue Racer", Assets.BlueRacer)
		.set("Bumble Bee", Assets.BumbleBee)
		.set("Candy Cane", Assets.CandyCane)
		.set("Jack-o'-lantern", Assets.JackoLantern)
		.set("Joker", Assets.Joker)
		.set("Jungle Leaf", Assets.JungleLeaf)
		.set("O Christmas Tree", Assets.OChristmasTree)
		.set("Poopy", Assets.Poopy)
		.set("Red&Yellow", Assets.RedYellow)
		.set("Robot", Assets.Robot)
		.set("Spider Curve", Assets.SpiderCurve)
		.set("Starfish", Assets.Starfish)
		.set("The Mummy", Assets.TheMummy)
		.set("Think Pink", Assets.ThinkPink)
		.set("Vampire", Assets.Vampire)
		.set("VIP Gold", Assets.VipGold)
		.set("Witchy Cauldron", Assets.WitchyCauldron)
		.set("Zombie Hand", Assets.ZombieHand)
		.set("Ice-Cream", Assets.IceCream)
		.set("Pineapple", Assets.Pineapple)
		.set("Rasta", Assets.Rasta);

let lastlobbyName = "",
	lastName = "Unnamed";

const presenceData: PresenceData = {
	largeImageKey: Assets.Logo,
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

	presenceData.largeImageKey = Assets.Index;
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
