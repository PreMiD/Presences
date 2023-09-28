const presence = new Presence({
		clientId: "632983924414349333",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	script = document.createElement("script"),
	eventId = "PreMiD_GranBlueFantasy";

interface GameStatus {
	boss: {
		param: {
			hp: string;
			hpmax: string;
			alive: 1 | 0;
		}[];
	};
}

let gameStatus: GameStatus;

// Decreasing latency may greatly impact on gameplay/performance
script.id = eventId;
script.appendChild(
	document.createTextNode(`
  let isRunning = false;
  setInterval(() => {
    if (isRunning) return;
    isRunning = true;
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) return;
          else seen.add(value);
        }
        return value;
      };
    };
    const gGameStatus = JSON.stringify(window.stage?.gGameStatus, getCircularReplacer());
    const pmdEvent = new CustomEvent("${eventId}", {
      detail: {
        gGameStatus
      }
    });
    window.dispatchEvent(pmdEvent);
    isRunning = false;
  }, 4500);
`)
);
document.head.appendChild(script);

addEventListener(eventId, (data: CustomEvent) => {
	if (!data.detail.gGameStatus) return (gameStatus = null);
	else gameStatus = JSON.parse(data.detail.gGameStatus);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/Granblue%20Fantasy/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ href } = document.location,
		[health, djeeta] = await Promise.all([
			presence.getSetting<number>("health"),
			presence.getSetting<boolean>("djeeta"),
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
		if (health === 0) {
			presenceData.state = `At ${
				document.querySelectorAll(".btn-enemy-gauge.prt-enemy-percent.alive")[0]
					.textContent
			}`;
		} else if (health === 1) {
			const boss = gameStatus.boss.param.find(x => x.alive),
				hp = parseInt(boss.hp);
			presenceData.state = `${hp.toLocaleString()} [${(
				(hp * 100) /
				parseInt(boss.hpmax)
			).toFixed(2)}%]`;
		}
		presenceData.details = document.querySelectorAll(".name")[0].textContent;
		if (djeeta) {
			const charaAlive =
				document.querySelector<HTMLImageElement>(".img-chara-command");
			if (!charaAlive.src.includes("3999999999"))
				presenceData.largeImageKey = charaAlive.src;
		}
	} else if (href.includes("/#party/index/0/npc/0"))
		presenceData.details = "Viewing party";
	else if (href.includes("/#enhancement")) {
		presenceData.details = "Upgrading : ";
		if (href.includes("npc")) presenceData.state = "Characters";
		else if (href.includes("weapon")) presenceData.state = "Weapons";
		else if (href.includes("summon")) presenceData.state = "Summons";
	} else if (href.includes("/#evolution")) {
		presenceData.details = "Uncapping :";

		if (href.includes("npc")) presenceData.state = "Characters";
		else if (href.includes("weapon")) presenceData.state = "Weapons";
		else if (href.includes("summon")) presenceData.state = "Summons";
	} else if (href.includes("/#coopraid")) {
		presenceData.details = "Co-op :";

		if (href.includes("offer"))
			presenceData.state = "Searching a raid coop room";
		else if (href.includes("room")) presenceData.state = "In a coop room";
	} else if (href.includes("/#lobby/room")) {
		presenceData.details = "Co-op :";
		presenceData.state = "In a raid coop room";
	} else if (href.includes("/#casino")) {
		presenceData.details = "Casino :";
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
			presenceData.state = " In the casino cage";
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
		presenceData.details = "Shop :";
		presenceData.state = "Main menu";

		if (href.includes("exchange/points")) presenceData.state = "Pendants shop";
		else if (href.includes("exchange/moon"))
			presenceData.state = "Trading moons";
		else if (href.includes("exchange/trajectory"))
			presenceData.state = "Journey drops";
		else if (href.includes("exchange/ceiling"))
			presenceData.state = "Trading ceruleans stones";
		else if (href.includes("skin/top")) presenceData.state = "Outfit shop";
		else if (href.includes("skycompass/points"))
			presenceData.state = "SkyCompass points exchange";
		else if (href.includes("lupi/0")) presenceData.state = "Crystal shop";
		else if (href.includes("exchange/list"))
			presenceData.state = "Treasure trading";
	} else if (href.includes("/#archaic")) {
		presenceData.details = "Shop :";
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
	} else if (href.includes("#arcarum2/enhancement")) {
		presenceData.details = " Shop :";
		presenceData.state = "Crafting Arcarum summons";
	} else if (href.includes("/#item")) presenceData.details = "Viewing supplies";
	else if (href.includes("/#present")) presenceData.details = "Viewing Crate";
	else if (href.includes("/#list")) presenceData.details = "Viewing inventory";
	else if (href.includes("/#container")) presenceData.details = "Viewing stash";
	else if (href.includes("/#friend"))
		presenceData.details = "Viewing friends list";
	else if (href.includes("/#event")) presenceData.details = "Event Menu";
	else if (href.includes("/#setting"))
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

	presence.setActivity(presenceData);
});
