const presence = new Presence({
		clientId: "632983924414349333",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	script = document.createElement("script"),
	eventId = "PreMiD_GranBlueFantasy";

enum Elements {
	Plain,
	Fire,
	Water,
	Earth,
	Wind,
	Light,
	Dark,
}

const ElementIcons = {
		// Plain element isn't really a thing for characters, but it's here for the sake of completion
		[Elements.Plain]:
			"https://cdn.rcd.gg/PreMiD/websites/G/Granblue%20Fantasy/assets/logo.png",
		[Elements.Fire]:
			"https://gbf.wiki/images/thumb/0/05/Icon_Element_Fire.png/20px-Icon_Element_Fire.png",
		[Elements.Water]:
			"https://gbf.wiki/images/thumb/8/80/Icon_Element_Water.png/20px-Icon_Element_Water.png",
		[Elements.Earth]:
			"https://gbf.wiki/images/thumb/9/94/Icon_Element_Earth.png/36px-Icon_Element_Earth.png",
		[Elements.Wind]:
			"https://gbf.wiki/images/thumb/6/62/Icon_Element_Wind.png/20px-Icon_Element_Wind.png",
		[Elements.Light]:
			"https://gbf.wiki/images/thumb/1/19/Icon_Element_Light.png/20px-Icon_Element_Light.png",
		[Elements.Dark]:
			"https://gbf.wiki/images/thumb/a/a5/Icon_Element_Dark.png/20px-Icon_Element_Dark.png",
	},
	ElementsNames = {
		[Elements.Plain]: "Plain",
		[Elements.Fire]: "Fire",
		[Elements.Water]: "Water",
		[Elements.Earth]: "Earth",
		[Elements.Wind]: "Wind",
		[Elements.Light]: "Light",
		[Elements.Dark]: "Dark",
	};

interface GameStatus {
	turn: number;
	battle: {
		count: number;
		total: number;
	};
	boss: {
		param: {
			hp: string;
			hpmax: string;
			alive: 1 | 0;
			name: {
				ja: string;
				en: string;
			};
		}[];
	};
	player: {
		param: {
			attr: Elements;
			alive: 1 | 0;
			leader: 1 | 0;
			name: string;
			hp: number;
			hpmax: number;
			pid: string;
		}[];
	};
	dungeonInfo: {
		name: string;
		floorNo: number;
		stageId: number;
	};
	areaInfo: {
		name: string;
	};
}
interface UserData {
	baseUri: string;
	imgUri: string;
	rank: number;
	id: number;
}

let gameStatus: GameStatus, userData: UserData;

script.id = eventId;
script.appendChild(
	document.createTextNode(`
  	let isRunning = false;
  	setInterval(() => {
		if (isRunning) return;
		isRunning = true;
		try {
			const gGameStatus = JSON.stringify({
				turn: window.stage?.gGameStatus.turn,
				battle: window.stage?.pJsnData.battle,
				boss: window.stage?.gGameStatus.boss,
				player: window.stage?.pJsnData.player,
				dungeonInfo: {
					name: window.Game?.view?.dungeonInfo?.name,
					floorNo: window.Game?.view?.stageInfo?.serial_floor_no,
					stageId: window.Game?.view?.stageInfo?.stage_id,
				},
				areaInfo: window.Game?.view?.areaInfo,
			});
			const userData = JSON.stringify({
				rank: window.Game?.userRank,
				id: window.Game?.userId,
				baseUri: window.Game?.baseUri,
				imgUri: window.Game?.imgUri,
			});
			const pmdEvent = new CustomEvent("${eventId}", {
				detail: {
					gGameStatus,
					userData
				}
			});
			window.dispatchEvent(pmdEvent);
			isRunning = false;
		} catch (error) {
			window.dispatchEvent(new CustomEvent("${eventId}", {
				detail: {
					gGameStatus: null,
					userData: null,
					error: error.message,
					stack: error.stack
				}
			}));
			isRunning = false;
		}
  	}, 3000);
`)
);
document.head.appendChild(script);

addEventListener(eventId, (data: CustomEvent) => {
	if (data.detail.error) return;

	if (!data.detail.gGameStatus) gameStatus = null;
	else gameStatus = JSON.parse(data.detail.gGameStatus);

	if (!data.detail.userData) return;
	userData = JSON.parse(data.detail.userData);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/Granblue%20Fantasy/assets/logo.png",
			startTimestamp: browsingTimestamp,
			largeImageText: "Granblue Fantasy",
		},
		{ href } = document.location,
		[health, turn, djeeta, profile, button] = await Promise.all([
			presence.getSetting<number>("health"),
			presence.getSetting<number>("turn"),
			presence.getSetting<boolean>("djeeta"),
			presence.getSetting<boolean>("profile"),
			presence.getSetting<boolean>("button"),
		]);

	if (href.includes("/#mypage")) presenceData.details = "Home page";
	else if (href.includes("/#quest")) {
		presenceData.details = "Selecting a quest";
		if (href.includes("extra"))
			presenceData.state = "Treasure Quests / Event Quest";
		else if (href.includes("assist")) presenceData.state = "Joining a raid";
		else if (href.includes("supporter"))
			presenceData.state = "Choosing a summon";
		else if (href.includes("fate"))
			presenceData.state = "Choosing a fate quest";
		else if (href.includes("scene")) presenceData.state = "In a story scene";
	} else if (href.includes("/#result"))
		presenceData.details = "In a Quest result screen";
	else if (href.includes("/#raid") || href.includes("/#raid_multi")) {
		const boss = gameStatus?.boss?.param.find(x => x.alive);
		if (boss) {
			if (boss.name.ja !== boss.name.en)
				presenceData.details = `${boss.name.en} (${boss.name.ja})`;
			else presenceData.details = boss.name.en;

			if (gameStatus.battle?.total && gameStatus.battle?.total > 1)
				presenceData.details += ` (Wave ${gameStatus.battle.count}/${gameStatus.battle.total})`;
		} else {
			presenceData.details =
				document.querySelectorAll(".name")[0]?.textContent ||
				"Starting battle...";
		}

		if (health === 0) {
			presenceData.state = `At ${
				document.querySelectorAll(".btn-enemy-gauge.prt-enemy-percent.alive")[0]
					.textContent
			}`;
		} else if (health === 1 && boss) {
			const hp = parseInt(boss.hp);
			presenceData.state = `${hp.toLocaleString()} [${(
				(hp * 100) /
				parseInt(boss.hpmax)
			).toFixed(2)}%]`;
		}

		if (turn && gameStatus?.turn)
			presenceData.state += ` | Turn ${gameStatus.turn}`;

		if (djeeta && gameStatus?.player) {
			const charaAlive = gameStatus.player.param.find(x => x.leader);
			if (charaAlive) {
				presenceData.smallImageKey = ElementIcons[charaAlive.attr];
				presenceData.smallImageText = ElementsNames[charaAlive.attr];
				presenceData.largeImageKey = `${userData.imgUri}/sp/assets/leader/raid_normal/${charaAlive.pid}.jpg`;
				presenceData.largeImageText = `${charaAlive.name} | ${
					charaAlive.hp
				} [${((charaAlive.hp * 100) / charaAlive.hpmax).toFixed(2)}%]`;
			}
		}
	} else if (href.includes("/#party/index/0/npc/0"))
		presenceData.details = "Viewing party";
	else if (href.includes("/#enhancement")) {
		presenceData.details = "Upgrading:";
		if (href.includes("npc")) presenceData.state = "Characters";
		else if (href.includes("weapon")) presenceData.state = "Weapons";
		else if (href.includes("summon")) presenceData.state = "Summons";
	} else if (href.includes("/#evolution")) {
		presenceData.details = "Uncapping:";

		if (href.includes("npc")) presenceData.state = "Characters";
		else if (href.includes("weapon")) presenceData.state = "Weapons";
		else if (href.includes("summon")) presenceData.state = "Summons";
	} else if (href.includes("/#coopraid")) {
		presenceData.details = "Co-op:";

		if (href.includes("offer"))
			presenceData.state = "Searching a raid coop room";
		else if (href.includes("room")) presenceData.state = "In a coop room";
	} else if (href.includes("/#lobby/room")) {
		presenceData.details = "Co-op :";
		presenceData.state = "In a raid coop room";
	} else if (href.includes("/#casino")) {
		presenceData.details = "Casino:";
		presenceData.state = "Main menu";
		if (href.includes("list/poker")) presenceData.state = "Choosing poker bet";
		else if (href.includes("game/poker")) presenceData.state = "Playing poker";
		else if (href.includes("#casino/list/slot"))
			presenceData.state = "Choosing slots bet";
		else if (href.includes("game/slot")) presenceData.state = "Playing slots";
		else if (href.includes("list/bingo"))
			presenceData.state = "Choosing bingo bet";
		else if (href.includes("game/bingo")) presenceData.state = "Playing bingo";
		else if (href.includes("exchange"))
			presenceData.state = "In the casino cage";
		else if (href.includes("rule/casino"))
			presenceData.state = "Viewing casino rules";
	} else if (href.includes("/#gacha"))
		presenceData.details = "In the Draw menu";
	else if (href.includes("/#profile"))
		presenceData.details = "Viewing profile page";
	else if (href.includes("/#archive")) presenceData.details = "Viewing journal";
	else if (href.includes("/#title")) presenceData.details = "Viewing trophies";
	else if (href.includes("/#guild")) presenceData.details = "Viewing crew";
	else if (href.includes("/#shop")) {
		presenceData.details = "Shop:";
		presenceData.state = "Main menu";

		if (href.includes("exchange/points")) presenceData.state = "Pendants shop";
		else if (href.includes("exchange/fp")) presenceData.state = "Trading FP";
		else if (href.includes("exchange/login_point"))
			presenceData.state = "Trading Daily Points";
		else if (href.includes("exchange/special_ticket"))
			presenceData.state = "Redeeming Siero's Special Pick Ticket";
		else if (href.includes("exchange/moon"))
			presenceData.state = "Trading moons";
		else if (href.includes("exchange/trajectory"))
			presenceData.state = "Journey drops";
		else if (href.includes("exchange/ceiling"))
			presenceData.state = "Trading ceruleans stones";
		else if (href.includes("exchange/job_equipment"))
			presenceData.state = "Crafting Class-specific equipments";
		else if (href.includes("skin/top")) presenceData.state = "Outfit shop";
		else if (href.includes("skycompass/points"))
			presenceData.state = "SkyCompass points exchange";
		else if (href.includes("lupi/0")) presenceData.state = "Crystal shop";
		else if (href.includes("exchange/list"))
			presenceData.state = "Treasure trading";
		else if (href.includes("passport"))
			presenceData.state = "View Premium Pass";
	} else if (href.includes("/#archaic")) {
		presenceData.details = "Shop:";
		presenceData.state = "Weapons Crafting";
		if (href.includes("job"))
			presenceData.state = "Crafting Class Champion weapons";
		else if (href.includes("numbers"))
			presenceData.state = "Crafting Revenant weapons";
		else if (href.includes("seraphic"))
			presenceData.state = "Crafting Seraphic weapons";
		else if (href.includes("xeno/list"))
			presenceData.state = "Crafting Xeno weapons";
		else if (href.includes("bahamut"))
			presenceData.state = "Crafting Bahamut weapons";
		else if (href.includes("omega"))
			presenceData.state = "Crafting Ultima weapons";
		else if (href.includes("draconic"))
			presenceData.state = "Restoring Draconic weapons";
		else if (href.includes("revans"))
			presenceData.state = "Rebuilding Revans weapons";
	} else if (href.includes("#arcarum2")) {
		presenceData.details = "In Arcarum: The World Beyond";
		if (href.includes("enhancement")) {
			presenceData.details = " Shop:";
			presenceData.state = "Crafting Arcarum summons";
		} else if (href.includes("stage") && gameStatus?.dungeonInfo)
			presenceData.state = `${gameStatus.dungeonInfo.name} ${gameStatus.dungeonInfo.floorNo}-${gameStatus.dungeonInfo.stageId}`;
		else if (href.includes("supporter"))
			presenceData.state = "Starting a battle";
		else if (href.includes("skip"))
			presenceData.state = "Undergoing a Fast Expedition";
	} else if (href.includes("/#replicard")) {
		presenceData.details = "In Replicard Sandbox";
		if (gameStatus?.areaInfo) presenceData.state = gameStatus.areaInfo.name;
	} else if (href.includes("/#item")) presenceData.details = "Viewing supplies";
	else if (href.includes("/#present")) presenceData.details = "Viewing Crate";
	else if (href.includes("/#list")) presenceData.details = "Viewing inventory";
	else if (href.includes("/#container")) presenceData.details = "Viewing stash";
	else if (href.includes("/#friend"))
		presenceData.details = "Viewing friends list";
	else if (href.includes("/#event")) {
		presenceData.details = "In event menu";
		presenceData.state =
			document.querySelector("#prt-head-current")?.textContent;
	} else if (href.includes("/#setting"))
		presenceData.details = "Changing settings";
	else if (href.includes("/#teaser"))
		presenceData.details = "Viewing event preview";
	else if (href.includes("/#sell"))
		presenceData.details = "Selling weapons/summons";
	else if (href.includes("/#decompose"))
		presenceData.details = "Reducing weapons/summons";
	else if (href.includes("/#recycle"))
		presenceData.details = "Reserve weapons/summons";
	else if (href.includes("/#help")) presenceData.details = "Viewing help";
	else if (href.includes("/#sidestory"))
		presenceData.details = "Viewing side stories";
	else if (href.includes("/#trial_battle"))
		presenceData.details = "Viewing trial battles";
	else if (href.includes("/#campaign/panel"))
		presenceData.details = "Viewing pinboard missions";
	else if (href.includes("/#beginnercomic"))
		presenceData.details = "Reading This is Granblue Fantasy";
	else if (href.includes("/#news")) presenceData.details = "Viewing the news";
	else if (href.includes("/#comic"))
		presenceData.details = "Reading Grand Blues";
	else if (href.includes("#frontier/alchemy"))
		presenceData.details = "In Alchemy Lab";

	if (userData) {
		if (profile && presenceData.largeImageText === "Granblue Fantasy")
			presenceData.largeImageText = `UID: ${userData.id} | Rank ${userData.rank}`;

		if (button) {
			presenceData.buttons = [
				{
					label: "Profile",
					url: `${userData.baseUri}/#profile/${userData.id}`,
				},
			];
		}
	}

	presence.setActivity(presenceData);
});
